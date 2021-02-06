import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PickCategory from '../components/pickCategory';
import CardContainer from '../components/cardContainer';
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');
  
  function chooseCategory(value) {
    setCategory(value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PickCategory chooseCategory={chooseCategory}/>  
        { category ? <CardContainer category={category}/> : null }
      </main>
    </div>
  )
}
