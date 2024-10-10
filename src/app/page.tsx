import { Navbar } from "@/components/Navbar";
import { CardList } from "@/components/CardList";
import styles from "./page.module.css";


export default function Home() {
  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Navbar/>
          <CardList />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://www.materimperium.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mater Imperium Challenge, 2024
          </a>
        </footer>
      </div>
  );
}
