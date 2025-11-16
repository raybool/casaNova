"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>CasaNova</div>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
            О компании
          </a>
          <a href="#properties" onClick={(e) => handleNavClick(e, "#properties")}>
            Каталог
          </a>
          <a href="#services" onClick={(e) => handleNavClick(e, "#services")}>
            Услуги
          </a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, "#testimonials")}>
            Отзывы
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
            Контакты
          </a>
        </nav>
        <button
          className={styles.burger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

