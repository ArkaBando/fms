import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "45ch",
    },
    width: "100%",
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    if (password && rePassword && password != rePassword)
      return setError(
        "Error Signing up Password and Confirm password must be same"
      );
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (!expression.test(String(email).toLowerCase())){
      return setError("Error Signing up Invalid Email Address");
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setRePassword("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name == "userRePassword") {
      setRePassword(value);
    }
  };

  return (
    
      <div className="mt-8">
        <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          {error !== null && (
            <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <form className={classes.root} noValidate autoComplete="off">
            {/* <label htmlFor="displayName" className="block">
            Display Name:
          </label> */}
            {/* <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          /> */}
            <TextField
              required
              id="standard-required"
              label="User Name"
              type="text"
              className="my-1 p-1 w-full "
              name="displayName"
              defaultValue={displayName}
              placeholder="E.g: Andy Baker"
              id="displayName"
              onChange={(event) => onChangeHandler(event)}
            />
            {/* 
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          /> */}
            <TextField
              required
              id="standard-required"
              label="Email"
              defaultValue="E.g: Andy@gmail.com"
              type="email"
              name="userEmail"
              defaultValue={email}
              onChange={(event) => onChangeHandler(event)}
            />
            {/* <label htmlFor="userPassword" className="block">
            Password:
          </label>
          
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          /> */}
            <TextField
              id="standard-password-input"
              label="Password :"
              type="password"
              autoComplete="current-password"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />

            <TextField
              id="standard-password-input"
              label="Confirm Password :"
              type="password"
              autoComplete="current-password"
              name="userRePassword"
              value={rePassword}
              placeholder="Reenter Your Password"
              id="userRePassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <button
              className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign up
            </button>
          </form>
          <p className="text-center my-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
   
  );
};
export default SignUp;
