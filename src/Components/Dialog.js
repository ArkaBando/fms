import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
    marginTop: theme.spacing(2),
    minWidth: 220,
    minHeight: 80,
    justifyContent: "center",
    padding: theme.spacing(2),
    justifyItems: "center",
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [folderName, setFolderName] = React.useState(null);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFolderNameChange = (e) => {
    if (e.target.value && e.target.value != "") {
      setFolderName(e.target.value);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <span onClick={handleClickOpen}> {props.children}</span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent class={classes.form}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name :"
            type="text"
            fullWidth
            onChange={handleFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ marginRight: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              props.handleFolderAdd(folderName);
              setFolderName(null);
              setOpen(false);
            }}
            variant="contained"
            justify="center"
            color="primary"
          >
            Create Folder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
