import React, { useState } from "react";
import HomeIcon from "../icons/home";
import { Button, Dialog, TextInput, PasswordInput } from "@mantine/core";
import styles from "../styles/Header.module.css";

export default function Header({ chooseCategory, setPage }) {
  const [showDialog, setShowDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkCredentials = () => {
    if (!username) setUsernameError("Username cannot be blank.");
    if (!password) setPasswordError("Password cannot be blank.");
    return !!(username && password);
  };

  const checkAuthToken = () => {
    const authToken = document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("authToken="));
    return !!authToken;
  };

  const loginUser = async () => {
    if (checkCredentials()) {
      const body = JSON.stringify({
        username,
        password,
      });
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          body,
        });
        const data = await res.json();
        if (data.authToken) {
          document.cookie = `authToken=${data.authToken}; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
          return chooseCategory("admin");
        } else {
          setUsername("");
          setPassword("");
          setUsernameError("Incorrect credentials");
          setPasswordError("Incorrect credentials");
        }
      } catch (e) {
        // show error and clear cred
        setUsername("");
        setPassword("");
        console.error(e);
      }
    }
  };

  const handleAdmin = () => {
    if (checkAuthToken()) {
      setPage("admin");
      return chooseCategory("admin");
    } else {
      setShowDialog(true);
    }
  };

  const handleTrivia = () => {
    setPage("trivia");
  };

  return (
    <div className={styles.HeaderContainer}>
      <Button className={styles.HomeButton} onClick={() => setPage("home")}>
        <HomeIcon />
      </Button>
      <Button className={styles.AdminButton} onClick={handleTrivia}>
        Trivia
      </Button>
      <Button className={styles.AdminButton} onClick={handleAdmin}>
        Admin
      </Button>
      <Dialog
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
      >
        <TextInput
          label="User name"
          placeholder="User name"
          onChange={(e) => setUsername(e.currentTarget.value)}
          error={usernameError}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={passwordError}
        />
        <Button className={styles.SubmitAuth} onClick={loginUser}>
          Submit
        </Button>
        <Button variant="default" onClick={() => setShowDialog(false)}>
          {" "}
          Cancel
        </Button>
      </Dialog>
    </div>
  );
}
