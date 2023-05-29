import React from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Admin.module.css";

export default function AdminHome({ setAdminPage, setPage }) {
  return (
    <div className={styles.AdminHomeOptionsContainer}>
      <h2>Admin Options</h2>
      <Button
        className={styles.AdminHomeButtons}
        onClick={() => setAdminPage("new")}
      >
        Add question
      </Button>
      <Button
        className={styles.AdminHomeButtons}
        onClick={() => setAdminPage("edit")}
      >
        Edit question
      </Button>
      <Button
        className={styles.AdminHomeButtons}
        onClick={() => setAdminPage("all")}
      >
        All questions
      </Button>
      <Button
        className={styles.AdminHomeButtons}
        onClick={() => {
          setPage("home");
        }}
      >
        Home
      </Button>
    </div>
  );
}
