import { useEffect, useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./UserProfile.module.css";

import axios from "axios";

const UserProfile = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://159.223.89.189:5000/auth/me", {
        headers: {
          Authorization: authCtx.token,
        },
      })
      .then((response) => setSelectedUser(response.data))
      .catch((error) => console.log(error));
  }, [setSelectedUser]);

  console.log(selectedUser);

  return (
    <section className={classes.profile}>
      <h1>User Profile</h1>
      <h4>Name: {selectedUser.fullName}</h4>
      <h4>Email: {selectedUser.email}</h4>
    </section>
  );
};

export default UserProfile;
