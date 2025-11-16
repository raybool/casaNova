"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Properties.module.scss";

const properties = [
  {
    id: 1,
    name: "Вилла Эстрелла",
    location: "Испания, Коста-Брава",
    area: "420 м²",
    lot: "1000 м²",
    price: "€ 4 800 000",
    image: "/property-1.jpeg",
    buttonText: "Подробнее",
  },
  {
    id: 2,
    name: "Резиденция Монте Карло",
    location: "Монако",
    area: "380 м²",
    lot: "Панорамный вид на море",
    price: "€ 12 350 000",
    image: "/property-2.jpeg",
    buttonText: "Подобрать",
  },
  {
    id: 3,
    name: "Пентхаус Аквамарин",
    location: "Дубай, Palm Jumeirah",
    area: "260 м²",
    lot: "Собственная терраса",
    price: "€ 6 450 000",
    image: "/property-3.jpeg",
    buttonText: "Запросить",
  },
];

export default function Properties() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (headerRef.current) {
              headerRef.current.classList.add(styles.visible);
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
    <section ref={sectionRef} className={styles.properties} id="properties">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>Каталог объектов</h2>
          <p className={styles.subtitle}>
            Выбранные предложения из нашей закрытой базы элитной недвижимости
          </p>
        </div>
        <div className={styles.grid}>
          {properties.map((property) => (
            <div key={property.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  quality={90}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{property.name}</h3>
                <p className={styles.location}>{property.location}</p>
                <div className={styles.details}>
                  <span>Площадь: {property.area}</span>
                  <span>{property.lot}</span>
                </div>
                <div className={styles.price}>{property.price}</div>
                <button className={styles.button}>{property.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
