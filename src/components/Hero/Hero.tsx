"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add(styles.visible);
    }
  }, []);

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.imageWrapper}>
        <Image
          src="/hero-bg.jpeg"
          alt="Элитная недвижимость"
          fill
          priority
          quality={90}
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>CasaNova</h1>
          <p className={styles.subtitle}>
            Индивидуальный подбор элитной недвижимости по всему миру
          </p>
          <div className={styles.buttons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => handleScroll("#properties")}
            >
              Выбрать объект
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => handleScroll("#contact")}
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
