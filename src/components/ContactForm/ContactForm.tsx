"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ContactForm.module.scss";

interface FormData {
  name: string;
  email: string;
  phone: string;
  criteria: string;
  consent: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    criteria: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (headerRef.current) {
              headerRef.current.classList.add(styles.visible);
            }
            setTimeout(() => {
              if (formRef.current) {
                formRef.current.classList.add(styles.visible);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      alert("Пожалуйста, укажите ваше имя");
      return false;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      alert("Пожалуйста, укажите email или телефон");
      return false;
    }

    if (!formData.consent) {
      alert("Необходимо согласие на обработку персональных данных");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          criteria: "",
          consent: false,
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section ref={sectionRef} className={styles.contactForm} id="contact">
        <div className={styles.container}>
          <div ref={headerRef} className={styles.header}>
            <h2 className={styles.title}>Получить персональную подборку</h2>
            <p className={styles.subtitle}>
              Заполните форму, и мы подберём для вас 3–5 объектов, которые
              полностью соответствуют вашим запросам.
            </p>
          </div>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="ivan@example.com"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Телефон или Telegram
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="criteria" className={styles.label}>
                Критерии или желаемый объект
              </label>
              <textarea
                id="criteria"
                name="criteria"
                value={formData.criteria}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Опишите ваши требования: локация, площадь, бюджет, особенности..."
                rows={5}
              />
            </div>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <label htmlFor="consent">
                Я согласен на{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  обработку персональных данных
                </a>
              </label>
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Получить подборку"}
            </button>
          </form>
        </div>
      </section>
      {showToast && (
        <div className={styles.toast}>
          Заявка отправлена! Мы свяжемся с вами в ближайшее время.
        </div>
      )}
    </>
  );
}

