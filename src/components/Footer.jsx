import React from "react";
import styles from "./css/footer.module.css";

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <div className={styles.contentWrapper}>
            <div className={styles.infoText}>
               &copy; 2023 Abinash kar. All Rights Reserved.
            </div>
         </div>
      </footer>
   )
}

export default Footer