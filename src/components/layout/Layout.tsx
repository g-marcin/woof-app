import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import styles from "./layout.module.css";

export const Layout: FC = () => {
  return (
    <>
      {/* <Header /> */}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};
