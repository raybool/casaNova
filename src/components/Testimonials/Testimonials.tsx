"use client";

import { useEffect, useRef } from "react";
import styles from "./Testimonials.module.scss";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.classList.add(styles.visible);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <div className={styles.quote}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.quoteIcon}
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <p className={styles.text}>
              Работа с CasaNova превзошла все ожидания. Команда проявила
              максимальную внимательность к нашим требованиям, обеспечила полную
              конфиденциальность и поддержку на каждом этапе сделки. Благодаря
              их профессионализму мы нашли идеальный объект в Дубае, который
              полностью соответствует нашему образу жизни.
            </p>
          </div>
          <div className={styles.author}>
            <div className={styles.name}>Александр Миронов</div>
            <div className={styles.role}>
              Предприниматель, Дубай & Côte d'Azur
            </div>
          </div>
          <div className={styles.indicators}>
            <span className={styles.indicator}></span>
            <span className={`${styles.indicator} ${styles.active}`}></span>
            <span className={styles.indicator}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
