import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Head from "next/head";
import { useState } from "react";
import AdminContainer from "../components/adminContainer";
import CardContainer from "../components/cardContainer";
import Header from "../components/header";
import { useGetCategories } from "../components/hooks";
import PickCategory from "../components/pickCategory";
import TriviaHome from "../components/trivia/triviaHome";
import styles from "../styles/Home.module.css";
import BaccaratApp from "../components/baccarat/baccaratApp";

export enum PageName {
  admin = "admin",
  home = "home",
  flashCards = "flash-cards",
  trivia = "trivia",
  baccarat = "baccarat",
}

export default function Home() {
  const [category, setCategory] = useState<PageName>(PageName.admin);
  const [page, setPage] = useState<PageName>(PageName.baccarat);
  const categoryData = useGetCategories();

  function chooseCategory(value: PageName) {
    if (value === PageName.admin) return;
    setCategory(value);
    setPage(PageName.flashCards);
  }

  let currentPage = (
    <PickCategory chooseCategory={chooseCategory} categoryData={categoryData} />
  );

  switch (page) {
    case PageName.admin:
      currentPage = (
        <AdminContainer setPage={setPage} categoryData={categoryData} />
      );
      break;
    case PageName.home:
      currentPage = (
        <PickCategory
          chooseCategory={chooseCategory}
          categoryData={categoryData}
        />
      );
      break;
    case PageName.flashCards:
      currentPage = category ? <CardContainer category={category} /> : null;
      break;
    case PageName.trivia:
      currentPage = <TriviaHome />;
      break;
    case PageName.baccarat:
      currentPage = <BaccaratApp />;
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
