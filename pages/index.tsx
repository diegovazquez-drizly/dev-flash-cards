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

enum PageNames {
  admin = "admin",
  home = "home",
  flashCards = "flash-cards",
  trivia = "trivia",
}

export default function Home() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<PageNames>(PageNames.trivia);
  const categoryData = useGetCategories();

  function chooseCategory(value) {
    if (value === "admin") return;
    setCategory(value);
    setPage(PageNames.flashCards);
  }

  let currentPage = (
    <PickCategory chooseCategory={chooseCategory} categoryData={categoryData} />
  );

  switch (page) {
    case PageNames.admin:
      currentPage = (
        <AdminContainer setPage={setPage} categoryData={categoryData} />
      );
      break;
    case PageNames.home:
      currentPage = (
        <PickCategory
          chooseCategory={chooseCategory}
          categoryData={categoryData}
        />
      );
      break;
    case PageNames.flashCards:
      currentPage = category ? <CardContainer category={category} /> : null;
      break;
    case PageNames.trivia:
      currentPage = <TriviaHome />;
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
