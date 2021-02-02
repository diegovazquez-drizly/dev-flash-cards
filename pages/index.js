import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PickCategory from '../components/pickCategory';
import CardContainer from '../components/cardContainer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PickCategory/>  
        <CardContainer/>
      </main>
    </div>
  )
}
