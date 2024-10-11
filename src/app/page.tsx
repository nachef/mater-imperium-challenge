import { Navbar } from "@/components/Navbar";
import { CardList } from "@/components/CardList";
import styles from "./page.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Navbar/>
          <CardList />
          <ToastContainer />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://www.materimperium.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mater Imperium Challenge
          </a>
        </footer>
      </div>
  );
}
