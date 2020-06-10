import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../providers/UserProvider";
import Loader from "react-loader-spinner";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MenuAppBar from "./MenuAppBar";
import store from "../store";
import FileContainer from "../Container/files";
import {syncHistoryWithStore} from 'react-router-redux';
//import {BrowserRouter as Router, Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

function Application() {
  const user = useContext(UserContext);
  const browserHistory = createBrowserHistory();
 // const history = syncHistoryWithStore(browserHistory, store);

  const getView = function () {
    return (
      <Provider store={store}>
        <CssBaseline />

        {/* <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
          /> */}
        {user.isLoaded && user.email ? (
          
          <Container>
            <MenuAppBar />
            <Router history={browserHistory}>
            <ProfilePage path="profile"/>
            <FileContainer path="*" />
            </Router>
          </Container>
         
        ) : user.isLoaded ? (
          <Container maxWidth="md">
            <Router history={browserHistory}>
              <SignUp path="signUp" />
              <SignIn path="*" />
              <PasswordReset path="passwordReset" />
            </Router>
          </Container>
        ) : (
          <Loader
            style={{ margin: "300px 800px auto" }}
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
      </Provider>
    );
  };

  return getView();
}
export default Application;
