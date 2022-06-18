import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import PickCategory from "../components/pickCategory";
import CardContainer from "../components/cardContainer";
import AdminContainer from "../components/adminContainer";

export default function Home() {
  const [category, setCategory] = useState("");
  const [admin, setAdmin] = useState(false);
  const [didFetch, setDidFetch] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  function chooseCategory(value) {
    if (value === "admin") return setAdmin(true);
    setCategory(value);
  }

  useEffect(() => {
    if (!didFetch) {
      fetch("/api/category")
        .then((res) => res.json())
        .then((data) => {
          setDidFetch(true);
          setCategoryData(data);
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!admin && (
          <PickCategory
            chooseCategory={chooseCategory}
            categoryData={categoryData}
          />
        )}
        {category ? <CardContainer category={category} /> : null}
        {admin && (
          <AdminContainer setAdmin={setAdmin} categoryData={categoryData} />
        )}
      </main>
    </div>
  );
}
