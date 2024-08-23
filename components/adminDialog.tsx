import { Button, Dialog, PasswordInput, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/Header.module.css";
import { PageName } from "../pages";

interface AdminDialogProps {
  chooseCategory: (value: PageName) => void;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function AdminDialog({
  chooseCategory,
  showDialog,
  setShowDialog,
}: AdminDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkCredentials = () => {
    if (!username) setUsernameError("Username cannot be blank.");
    if (!password) setPasswordError("Password cannot be blank.");
    return !!(username && password);
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
          return chooseCategory(PageName.admin);
        } else {
          setUsername("");
          setPassword("");
          setUsernameError("Incorrect credentials");
          setPasswordError("Incorrect credentials");
        }
      } catch (e) {
        setUsername("");
        setPassword("");
        console.error(e);
      }
    }
  };

  return (
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
  );
}
