import React from 'react';
import { Button, Select, Dialog } from "@mantine/core";
import styles from "../styles/Admin.module.css";

export default function AdminHome({setPage, setAdmin}) {
  return (
    <div className={styles.AdminHomeOptionsContainer}>
    <h2>Admin Options</h2>
      <Button className={styles.AdminHomeButtons} onClick={() => setPage('new')}>Add question</Button>
      <Button className={styles.AdminHomeButtons} onClick={() => setPage('edit')}>Edit question</Button>
      <Button className={styles.AdminHomeButtons} onClick={() => setPage('all')}>All questions</Button>
      <Button className={styles.AdminHomeButtons} onClick={() => {setAdmin(false)}}>Home</Button>
    </div>
  )
}
