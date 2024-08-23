import { Button, Drawer } from "@mantine/core";
import { useState } from "react";
import { AdminIcon, HomeIcon, TriviaIcon } from "../icons";
import { PageName } from "../pages";
import styles from "../styles/Header.module.css";
import AdminDialog from "./adminDialog";

export default function MenuDrawer({
  chooseCategory,
  setPage,
  toggle,
  opened,
}) {
  const [showDialog, setShowDialog] = useState(false);

  const checkAuthToken = () => {
    const authToken = document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("authToken="));
    return !!authToken;
  };

  const handleAdmin = () => {
    if (checkAuthToken()) {
      setPage("admin");
      return chooseCategory(PageName.admin);
    } else {
      setShowDialog(true);
    }
  };

  const handleTrivia = () => {
    setPage("trivia");
  };
  return (
    <>
      <Drawer opened={opened} onClose={toggle}>
        <div className={styles.HeaderContainer}>
          <Button className={styles.MenuButton} onClick={() => setPage("home")}>
            <HomeIcon height={20} width={20} />
            <span className={styles.MenuButtonText}>Home</span>
          </Button>
          <Button className={styles.MenuButton} onClick={handleTrivia}>
            <TriviaIcon height={20} width={20} />
            <span className={styles.MenuButtonText}>Trivia</span>
          </Button>
          <Button className={styles.MenuButton} onClick={handleAdmin}>
            <AdminIcon height={20} width={20} />
            <span className={styles.MenuButtonText}>Admin</span>
          </Button>
        </div>
      </Drawer>
      <AdminDialog
        chooseCategory={chooseCategory}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
