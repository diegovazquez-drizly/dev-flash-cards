import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import Head from "next/head";
import { useState } from "react";
import AdminContainer from "../components/adminContainer";
import CardContainer from "../components/cardContainer";
import Header from "../components/header";
import { useGetCategories } from "../components/hooks";
import PickCategory from "../components/pickCategory";
import styles from "../styles/Home.module.css";
import { MantineProvider } from "@mantine/core";

export default function Home() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");
  const categoryData = useGetCategories();

  function chooseCategory(value) {
    if (value === "admin") return;
    setCategory(value);
    setPage("flash-cards");
  }

  let currentPage = (
    <PickCategory chooseCategory={chooseCategory} categoryData={categoryData} />
  );

  switch (page) {
    case "admin":
      currentPage = (
        <AdminContainer setPage={setPage} categoryData={categoryData} />
      );
      break;
    case "home":
      currentPage = (
        <PickCategory
          chooseCategory={chooseCategory}
          categoryData={categoryData}
        />
      );
      break;
    case "flash-cards":
      currentPage = category ? <CardContainer category={category} /> : null;
      break;
    default:
      currentPage = (
        <PickCategory
          chooseCategory={chooseCategory}
          categoryData={categoryData}
        />
      );
      break;
  }

  return (
    <MantineProvider>
      <div className={styles.container}>
        <Head>
          <title>Dev Flash Cards</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Header chooseCategory={chooseCategory} setPage={setPage} />
          {currentPage}
        </main>
      </div>
    </MantineProvider>
  );
}
