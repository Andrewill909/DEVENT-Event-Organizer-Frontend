import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

import useInput from "../../hooks/use-input";


axios.defaults.withCredentials = true;

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) =>
  value.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
const isPassword = (value) =>
  value.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).*$/);

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const {
    value: enteredFullName,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);

  const {
    value: enteredGender,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangeHandler,
    reset: resetGender,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isNotEmpty && isEmail);

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isNotEmpty);

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const {
    value: enteredConfirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value.match(enteredPassword));

  const [isLogin, setIsLogin] = useState(true);

  let formIsValid = false;
  let url = "";

  if (isLogin) {
    if (emailIsValid && passwordIsValid) {
      formIsValid = true;
    }
    url = "http://159.223.89.189:5000/auth/login";
  } else if (!isLogin) {
    if (
      fullNameIsValid &&
      genderIsValid &&
      emailIsValid &&
      phoneIsValid &&
      addressIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    }
    url = "http://159.223.89.189:5000/auth/register";
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const googleLoginHandler = () => {
    url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=675925397986-05t201uf5l37t5aqfbjqs8jf3f412bkj.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdevent-dev.herokuapp.com%2Fauth%2Fgoogle%2Fcallback";
    window.location.href = url;

    axios.get(url).then((response) => {
      console.log(response.client_id);
    }) 
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      if (!formIsValid) {
        console.log("form not valid");
        return;
      }

      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.token);
          authCtx.login(response.data.token);
          history.replace("/");
          console.log("Login success");
        })
        .catch((err) => {
          alert(err.msg);
        });
      setIsLoading(false);
      console.log("Submitted");
      console.log(enteredEmail, enteredPassword);
      resetEmail();
      resetPassword();
    } else {
      if (!formIsValid) {
        console.log("form not valid");
        return;
      }
      axios
        .post(url, {
          fullName: enteredFullName,
          gender: enteredGender,
          email: enteredEmail,
          phone: enteredPhone,
          address: enteredAddress,
          password: enteredPassword,
          "confirm-password": enteredConfirmPassword,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          alert(err.msg);
        });

      setIsLoading(false);
      console.log("Submitted");
      console.log(
        enteredFullName,
        enteredGender,
        enteredEmail,
        enteredPhone,
        enteredAddress,
        enteredPassword,
        enteredConfirmPassword
      );
      resetFullName();
      resetGender();
      resetEmail();
      resetPhone();
      resetAddress();
      resetPassword();
      resetConfirmPassword();
    }
  };

  return (
    <div>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="fullName">Fullname</label>
              <input
                type="text"
                id="fullName"
                value={enteredFullName}
                onChange={fullNameChangeHandler}
                onBlur={fullNameBlurHandler}
              />
              {fullNameHasError && (
                <p className={classes["error-text"]}>Fill name!</p>
              )}
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="gender">Gender</label>
              <div className={classes.radio}>
                <input
                  type="radio"
                  id="genderMale"
                  value="male"
                  checked={enteredGender === "male"}
                  onChange={genderChangeHandler}
                />
                <label>Male</label>
              </div>
              <div className={classes.radio}>
                <input
                  type="radio"
                  id="genderFemale"
                  value="female"
                  checked={enteredGender === "female"}
                  onChange={genderChangeHandler}
                />
                <label>Female</label>
              </div>
              {genderHasError && (
                <p className={classes["error-text"]}>Choose gender!</p>
              )}
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              required
            />
            {emailHasError && (
              <p className={classes["error-text"]}>Fill valid email!</p>
            )}
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={enteredPhone}
                onChange={phoneChangeHandler}
                onBlur={phoneBlurHandler}
                required
              />
              {phoneHasError && (
                <p className={classes["error-text"]}>Fill phone!</p>
              )}
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={enteredAddress}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                required
              />
              {addressHasError && (
                <p className={classes["error-text"]}>Fill address!</p>
              )}
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              minLength="5"
              required
            />
            {passwordHasError && (
              <p className={classes["error-text"]}>
                Password min length = 5, must contain lower case, upper case,
                and special symbol.
              </p>
            )}
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={enteredConfirmPassword}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                required
              />
              {confirmPasswordHasError && (
                <p className={classes["error-text"]}>Fill same password!</p>
              )}
            </div>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button disabled={!formIsValid}>
                {isLogin ? "Login" : "Create Account"}
              </button>
            )}
            {isLoading && <p>Loading...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </section>

      <section className={classes.auth}>
        <div className={classes.actions}>
          <img
            className={classes["google-icon"]}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google-logo"
          />
          <button
            type="button"
            className={classes.toggle}
            onClick={googleLoginHandler}
          >
            Login with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
