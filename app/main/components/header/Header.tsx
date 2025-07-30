import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Eye } from "lucide-react";
import { ABCLoader } from "@/components/abcLoader";
import { useGetPosts } from "@/lib/hooks/useGetPosts";

import styles from "./Header.module.css";

export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const { posts, loading } = useGetPosts();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
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

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  /* eslint-disable no-unused-vars */
  const getPositionX = (event: any) => {
    return event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
  };
  /* eslint-disable no-unused-vars */
  const getPositionY = (event: any) => {
    if ("clientY" in event) {
      return event.clientY;
    } else if ("touches" in event && event.touches.length > 0) {
      return event.touches[0].clientY;
    }
    return 0;
  };
  /* eslint-disable no-unused-vars */
  const handleStart = (event: any) => {
    if (!isMobile && event.type === "touchstart") return;

    setIsDragging(true);
    const posX = getPositionX(event);
    const posY = getPositionY(event);

    setStartPos({ x: posX, y: posY });
    setCurrentTranslate(-currentSlide * 100);
    setPrevTranslate(-currentSlide * 100);
  };
  /* eslint-disable no-unused-vars */
  const handleMove = (event: any) => {
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

    if (movedBy < -threshold && currentSlide < 2 - 1) {
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
      Transporte: "bg-blue-500",
      "Medio Ambiente": "bg-green-500",
      Espacio: "bg-purple-500",
      Energía: "bg-yellow-500",
      Historia: "bg-orange-500",
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
            className="relative h-80 bg-gray-900 overflow-hidden"
            onTouchStart={handleStart}
            onTouchMove={(e) => {
              e.preventDefault();
              handleMove(e);
            }}
            onTouchEnd={handleEnd}
            style={{ touchAction: "none" }}
          >
            {posts.slice(0, 2).map((news, index) => (
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
                            "Transporte"
                          )}`}
                        >
                          Transporte
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            30 Jul 2025
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            100
                          </div>
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold mb-3 leading-tight">
                        {news.title}
                      </h3>
                      <p className="text-lg text-gray-200 leading-relaxed max-w-3xl"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="hidden md:block absolute left-4 top-[45%] transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:block absolute right-4 top-[45%] transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex justify-center items-center w-full py-3 gap-3 absolute bottom-0">
              {posts.slice(0, 2).map((_, index) => (
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
            <img src={posts[3].image_url} alt={posts[3].title} />
          </div>
          <div className={styles.bento_item_image_title}>
            <h1>{posts[3].title}</h1>
          </div>
        </article>
        <article className={`${styles.bento_item} ${styles.bento_item_small}`}>
          <div className={styles.bento_item_image}>
            <img src={posts[4].image_url} alt={posts[4].title} />
          </div>
          <div className={styles.bento_item_image_title}>
            <h1>{posts[4].title}</h1>
          </div>
        </article>
      </section>
    </div>
  );
}
