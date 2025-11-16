"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Advantages.module.scss";

const advantages = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Эксклюзивный доступ",
    description:
      "Доступ к закрытым объектам, которых нет в открытых базах. Работаем с частными владельцами и эксклюзивными предложениями.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Персональный подход",
    description:
      "Подбор объектов под образ жизни, а не просто по метражу. Учитываем ваши предпочтения, стиль жизни и долгосрочные планы.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Полный комплекс услуг",
    description:
      "Юридическое сопровождение, проверка объекта, переговоры, оформление сделки. Всё под ключ — от поиска до заселения.",
  },
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);

  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.classList.add(styles.visible);
            }
            const cards = entry.target.querySelectorAll(`.${styles.card}`);
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add(styles.visible);
              }, index * 150);
            });
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
    <section ref={sectionRef} className={styles.advantages}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши преимущества</h2>
        <div className={styles.content}>
          <div ref={imageRef} className={styles.image}>
            <Image
              src="/advantages-interior.jpeg"
              alt="Элитный интерьер"
              width={600}
              height={900}
              quality={90}
              style={{ objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
          <div className={styles.cards}>
            {advantages.map((advantage, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.icon}>{advantage.icon}</div>
                <h3 className={styles.cardTitle}>{advantage.title}</h3>
                <p className={styles.cardDescription}>
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
