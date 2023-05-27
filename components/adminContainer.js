import React, { useState } from "react";
import styles from "../styles/Admin.module.css";
import { Textarea } from "@mantine/core";
import { Button, Select, Dialog } from "@mantine/core";
import NewQuestion from "./newQuestion";
import AllQuestions from "./allQuestions";
import AdminHome from "./adminHome";

export default function AdminContainer({ categoryData, setAdmin }) {
  const [page, setPage] = useState("home");

  const heading = page === "new" ? "Add question?" : "All questions";
  const subheading = page === "new" ? "All questions" : "Add question?";

  let currentPage = <AdminHome setPage={setPage} />;

  const switchPage = () => {
    if (page === "new") setPage("all");
    else setPage("new");
  };

  switch(page) {
    case 'new': 
    currentPage = <NewQuestion categoryData={categoryData} setPage={setPage} />;
      break;
    case 'edit':
      break;
    case 'all':
      currentPage = <AllQuestions />
      break;
    case 'home':
      currentPage = <AdminHome setPage={setPage} setAdmin={setAdmin} />
      break;
    default:
      currentPage = <AdminHome setPage={setPage} setAdmin={setAdmin}/>;
      break;
  }

  return (
    <div className={styles.AdminContainer}>
      {currentPage}
    </div>
  );
}
