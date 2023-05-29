import React, { useState } from "react";
import styles from "../styles/Admin.module.css";
import NewQuestion from "./newQuestion";
import AllQuestions from "./allQuestions";
import AdminHome from "./adminHome";

export default function AdminContainer({ categoryData, setPage }) {
  const [page, setAdminPage] = useState("home");

  let currentPage = <AdminHome setAdminPage={setAdminPage} />;

  switch (page) {
    case "new":
      currentPage = (
        <NewQuestion categoryData={categoryData} setAdminPage={setAdminPage} />
      );
      break;
    case "edit":
      break;
    case "all":
      currentPage = <AllQuestions setAdminPage={setAdminPage} />;
      break;
    case "home":
      currentPage = <AdminHome setAdminPage={setAdminPage} setPage={setPage} />;
      break;
    default:
      currentPage = <AdminHome setAdminPage={setAdminPage} setPage={setPage} />;
      break;
  }

  return <div className={styles.AdminContainer}>{currentPage}</div>;
}
