"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Services.module.scss";

const services = [
  "Подбор и анализ объектов",
  'Сопровождение сделок "под ключ"',
  "Юридическая проверка недвижимости",
  "Организация просмотров и личных туров",
  "Помощь с визами, релокацией и банками",
  "Постпродажное сопровождение",
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (listRef.current) {
              listRef.current.classList.add(styles.visible);
            }
            setTimeout(() => {
              if (imageRef.current) {
                imageRef.current.classList.add(styles.visible);
              }
            }, 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className={styles.title}>Услуги</h2>
        <div className={styles.content}>
          <div ref={listRef} className={styles.list}>
            <ul>
              {services.map((service, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.icon}>✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={imageRef} className={styles.image}>
            <Image
              src="/services-villa.jpeg"
              alt="Элитная вилла"
              width={600}
              height={800}
              quality={90}
              style={{ objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
