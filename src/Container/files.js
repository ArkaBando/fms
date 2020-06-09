import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "@reach/router";
import FormDialog from "../Components/Dialog";
import { setFileSettings, setFiles } from "../reducer/fileReducer";
import { connect } from "react-redux";
import { UserContext } from "../providers/UserProvider";
import uuid from "react-uuid";
import { generateFileStructure, db } from "../firebase";

const backStack = [];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  folder: {
    height: 100,
    width: 100,
    marginTop: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

function FileContainer(props) {
  const [spacing, setSpacing] = React.useState(2);
  const [folders, setFolders] = React.useState([]);
  const [folderSetting, setFolderSettings] = React.useState({});
  const [currentPageName, setCurrentPageName] = React.useState("Home");
  const [prevSettings, setPrevSettings] = React.useState({});

  const classes = useStyles();
  const user = useContext(UserContext);
  const { displayName, email } = user;

  const handleFolderAdd = (folderName) => {
    if (folderName && folderName != null && folderName != "") {
      let file = {};
      file["parentFolderId"] = props.folderSettings.file.parentFolderId;
      file["id"] = uuid();
      file["name"] = folderName;
      file["type"] = "folder";
      file["url"] = "";

      folders.push(file);
      generateFileStructure(file);
      props.setFiles(folders);
    }
  };

  const fetchAllFiles = async (parentFolderId = null) => {
    try {
      let querySnapshot = await db
        .collection("files")
        .where("parentFolderId", "==", parentFolderId)
        .get();

      const data = querySnapshot.docs.map((doc) => doc.data());
      if (data != null && data) {
        setFolders(data);
        props.setFiles(data.sort((t1, t2) => t1.time - t2.time));
      }
      return data;
    } catch (e) {
      console.error("Error fetching files", e);
    }
  };

  useEffect(() => {
    let folderList = fetchAllFiles(folderSetting.parentFolderId || email);
    if (folderList && folderList != null) {
      setFolders(folderList);
    }
    setCurrentPageName("Home");
  }, []);

  const setCurrentFolderSettings = (setting) => {
    let parentId = setting.parentFolderId;
    let currentId = setting.currentFolderId;
    let currentPage = currentPageName;

    setPrevSettings({
      parentFolderId: parentId,
      currentFolderId: currentId,
      currentPage: currentPageName,
    });

    backStack.push({
      parentFolderId: parentId,
      currentFolderId: currentId,
      currentPage: currentPageName,
    });

    setFolderSettings({
      parentFolderId: setting.id,
      currentFolderId: setting.id,
    });

    props.setFileSettings({
      parentFolderId: setting.id,
      currentFolderId: setting.id,
    });

    setCurrentPageName(setting.name);
    fetchAllFiles(setting.id);
  };

  useEffect(() => {
    if (
      props.folderSettings &&
      props.folderSettings.parentFolderId &&
      props.folderSettings.parentFolderId != null
    ) {
      setFolderSettings({
        parentFolderId: props.folderSettings.parentFolderId,
        currentFolderId: props.folderSettings.currentFolderId,
      });
    } else {
      setFolderSettings({
        parentFolderId: email,
      });
    }
    setFolders(props.folderSettings.file.files);
  }, [props.folderSettings]);

  useEffect(() => {
    if (
      props.folderSettings.file.files &&
      props.folderSettings.file.files != null
    ) {
      setFolders(props.folderSettings.file.files);
    } else {
      setFolders([]);
    }
  }, [props.folderSettings.file.files]);

  const goToPrevPage = () => {
    let prevSetting = backStack.pop();

    if (
      !prevSetting ||
      (!prevSetting.parentFolderId && !prevSetting.currentFolderId)
    ) {
      return;
    }

    setFolderSettings({
      parentFolderId: prevSetting.parentFolderId,
      currentFolderId: prevSetting.currentFolderId,
    });

    props.setFileSettings({
      parentFolderId: prevSetting.parentFolderId,
      currentFolderId: prevSetting.currentFolderId,
    });

    setCurrentPageName(prevSetting.currentPage);
    fetchAllFiles(prevSetting.parentFolderId);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Typography
        onClick={(e) => goToPrevPage()}
        display="block"
        variant="h6"
        className={classes.header}
      >
        {currentPageName}
      </Typography>

      <Grid item xs={16}>
        <Grid container justify="left" spacing={spacing}>
          {folders &&
            folders.length > 0 &&
            folders.map((value) => (
              <Grid
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                key={value.id}
                item
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentFolderSettings(value);
                }}
              >
                <img src="/folder.png" className={classes.folder} />
                <label>{value.name}</label>
                {/* <Paper className={classes.paper} /> */}
              </Grid>
            ))}
          <Grid
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            key={-1}
            item
          >
            <FormDialog handleFolderAdd={handleFolderAdd}>
              <img
                src="/addfolder.jpg"
                title={"New Folder"}
                className={classes.folder}
              />
            </FormDialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    folderSettings: state.folderSettings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFileSettings: (mode) => dispatch(setFileSettings(mode)),
    setFiles: (mode) => dispatch(setFiles(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileContainer);
