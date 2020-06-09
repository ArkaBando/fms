import React, { Component, createContext } from "react";
import { auth , generateUserDocument} from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: {isLoaded:false}
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      let user = await generateUserDocument(userAuth);
      debugger;
      if(!user){
        user = {};
      }
      user.isLoaded = true;
      this.setState({ user });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;