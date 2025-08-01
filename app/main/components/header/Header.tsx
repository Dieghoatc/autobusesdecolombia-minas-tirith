import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { ABCLoader } from "@/components/abcLoader";
import { useGetPosts } from "@/lib/hooks/useGetPosts";

import styles from "./Header.module.css";
import Link from "next/link";
import { formatDate } from "@/lib/helpers/formatDate";

import FeriaFlores from "@/assets/destinations/feria_flores.webp";

type TouchOrMouseEvent = React.TouchEvent | React.MouseEvent;
const SLIDES_NUMBER = 3;
export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const { posts, loading } = useGetPosts();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES_NUMBER);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES_NUMBER) % SLIDES_NUMBER);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getPositionX = (event: TouchOrMouseEvent) => {
    if ("clientX" in event) {
      return event.clientX;
    } else if ("touches" in event && event.touches.length > 0) {
      return event.touches[0].clientX;
    }
    return 0;
  };

  const getPositionY = (event: TouchOrMouseEvent): number => {
    if ("clientY" in event) {
      return event.clientY;
    } else if ("touches" in event && event.touches.length > 0) {
      return event.touches[0].clientY;
    }
    return 0;
  };
  const handleStart = (event: TouchOrMouseEvent) => {
    if (!isMobile && event.type === "touchstart") return;

    setIsDragging(true);
    const posX = getPositionX(event);
    const posY = getPositionY(event);

    setStartPos({ x: posX, y: posY });
    setCurrentTranslate(-currentSlide * 100);
    setPrevTranslate(-currentSlide * 100);
  };
  const handleMove = (event: TouchOrMouseEvent) => {
    if (!isDragging) return;

    const currentPositionX = getPositionX(event);
    const currentPositionY = getPositionY(event);
    const diffX = currentPositionX - startPos.x;
    const diffY = Math.abs(currentPositionY - startPos.y);

    // Si el movimiento vertical es mayor que el horizontal, no interceptar
    if (diffY > Math.abs(diffX) && Math.abs(diffX) < 50) {
      return;
    }

    // Prevenir scroll vertical en móvil cuando se hace swipe horizontal
    if (Math.abs(diffX) > 10) {
      event.preventDefault();
    }

    const containerWidth = (event.currentTarget as HTMLElement).offsetWidth;
    const movePercent = (diffX / containerWidth) * 100;
    const newTranslate = prevTranslate + movePercent;

    setCurrentTranslate(newTranslate);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 25; // Porcentaje mínimo para cambiar slide

    if (movedBy < -threshold && currentSlide < SLIDES_NUMBER - 1) {
      nextSlide();
    } else if (movedBy > threshold && currentSlide > 0) {
      prevSlide();
    }

    // Reset translate
    setCurrentTranslate(-currentSlide * 100);
    setPrevTranslate(-currentSlide * 100);
  };

  // Actualizar translate cuando cambia currentSlide
  useEffect(() => {
    if (!isDragging) {
      setCurrentTranslate(-currentSlide * 100);
      setPrevTranslate(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      Tecnología: "bg-blue-500",
      Sostenibilidad: "bg-green-500",
      Scania: "bg-purple-500",
      Eventos: "bg-yellow-500",
      Transmilenio: "bg-orange-500",
    };
    return colors[categoria] || "bg-gray-500";
  };

  if (loading) {
    return <ABCLoader />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.bento}>
        <article
          className={`w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden ${styles.bento_item} ${styles.bento_item_large}`}
        >
          <div
            className="relative h-full bg-gray-900 overflow-hidden"
            onTouchStart={handleStart}
            onTouchMove={(e) => {
              e.preventDefault();
              handleMove(e);
            }}
            onTouchEnd={handleEnd}
            style={{ touchAction: "none" }}
          >
            {posts.slice(0, SLIDES_NUMBER).map((news, index) => (
              <div
                key={news.post_id}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(
                            news.category
                          )}`}
                        >
                          {news.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {formatDate(news.created_at)}
                          </div>
                        </div>
                      </div>
                      <Link href={`/posts/${news.post_id}_${news.slug}`}>
                        <h3 className="text-3xl font-bold mb-3 leading-tight">
                          {news.title}
                        </h3>
                      </Link>
                      <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
                        {news.resume}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 hover:backdrop-blur-sm rounded-full p-2 transition-all duration-300 text-white hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 hover:backdrop-blur-sm rounded-full p-2 transition-all duration-300 text-white hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex justify-center items-center w-full py-3 gap-3 absolute bottom-0">
              {posts.slice(0, SLIDES_NUMBER).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-2 bg-slate-700"
                      : "w-3 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </article>
        <article className={`${styles.bento_item} ${styles.bento_item_small}`}>
          <div className={styles.bento_item_image}>
            <Link href={`/destinos/medellin`}>
              <img src={FeriaFlores.src} alt="Feria de las Flores" />
            </Link>
          </div>
          <div className={styles.bento_item_image_title}>
            <Link href={`/destinos/medellin`}>
              <h1>Inicia la feria de las Flores en medellín.</h1>
            </Link>
          </div>
        </article>
        {posts.slice(3, posts.length).map((news) => (
          <article
            key={news.post_id}
            className={`${styles.bento_item} ${styles.bento_item_small}`}
          >
            <div className={styles.bento_item_image}>
              <Link href={`/posts/${news.post_id}_${news.slug}`}>
                <img src={news.image_url} alt={news.title} />
              </Link>
            </div>
            <div className={styles.bento_item_image_title}>
              <Link href={`/posts/${news.post_id}_${news.slug}`}>
                <h1>{news.title}</h1>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
