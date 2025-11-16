import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.logo}>CasaNova</div>
            <p className={styles.copyright}>
              © CasaNova, {currentYear}. Все права защищены.
            </p>
          </div>
          <div className={styles.right}>
            <a href="/privacy" className={styles.link}>
              Политика конфиденциальности
            </a>
            <a href="#contact" className={styles.link}>
              Контакты
            </a>
            <a
              href="https://t.me/casanova"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

