"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./About.module.scss";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (textRef.current) {
              textRef.current.classList.add(styles.visible);
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
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={textRef} className={styles.text}>
            <h2 className={styles.title}>О компании</h2>
            <div className={styles.description}>
              <p>
                CasaNova — агентство элитной недвижимости, которое сопровождает
                клиента от первой заявки до завершения сделки. Мы
                специализируемся на подборе эксклюзивных объектов недвижимости
                по всему миру.
              </p>
              <p>
                Наша команда профессионалов обеспечивает полную
                конфиденциальность и индивидуальный подход к каждому клиенту. Мы
                работаем с закрытой базой объектов, которые недоступны в
                открытых источниках.
              </p>
              <p>
                Международный опыт, глубокое знание рынка и внимание к деталям
                позволяют нам находить именно те объекты, которые соответствуют
                вашим требованиям и образу жизни.
              </p>
            </div>
          </div>
          <div ref={imageRef} className={styles.image}>
            <Image
              src="/about-meeting.jpeg"
              alt="Деловая встреча"
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
