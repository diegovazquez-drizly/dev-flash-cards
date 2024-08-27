import { Button, Drawer } from "@mantine/core";
import { useState } from "react";
import { AdminIcon, HomeIcon, TriviaIcon } from "../icons";
import { PageName } from "../pages";
import styles from "../styles/Header.module.css";
import AdminDialog from "./adminDialog";

const ICON_SIZE = 30;

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
      setPage(PageName.admin);
      return chooseCategory(PageName.admin);
    } else {
      setShowDialog(true);
    }
    toggle();
  };

  const handleHome = () => {
    setPage(PageName.home);
    toggle();
  };

  const handleTrivia = () => {
    setPage(PageName.trivia);
    toggle();
  };
  return (
    <>
      <Drawer opened={opened} onClose={toggle}>
        <div className={styles.HeaderContainer}>
          <Button className={styles.MenuButton} onClick={handleHome}>
            <HomeIcon height={ICON_SIZE} width={ICON_SIZE} />
            <span className={styles.MenuButtonText}>Home</span>
          </Button>
          <Button className={styles.MenuButton} onClick={handleTrivia}>
            <TriviaIcon height={ICON_SIZE} width={ICON_SIZE} />
            <span className={styles.MenuButtonText}>Trivia</span>
          </Button>
          <Button className={styles.MenuButton} onClick={handleAdmin}>
            <AdminIcon height={ICON_SIZE} width={ICON_SIZE} />
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
