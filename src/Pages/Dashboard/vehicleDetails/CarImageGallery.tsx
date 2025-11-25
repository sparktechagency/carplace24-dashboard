"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  images: string[];
  title: string;
};

const CarImageGallery = ({ images, title }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeImage = images[activeIndex];

  const prev = () => {
    if (!images.length) return;
    setDirection(-1);
    setActiveIndex((idx) => (idx - 1 + images.length) % images.length);
  };

  const next = () => {
    if (!images.length) return;
    setDirection(1);
    setActiveIndex((idx) => (idx + 1) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-[72%]">
        <div className="rounded-lg overflow-hidden border relative h-[300px] sm:h-[400px] md:h-[600px]">
          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 16 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={activeImage}
                alt={title}
                className="w-full h-full object-cover"
                width={34341000}
                height={3434500}
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/60"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/60"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="w-full md:w-[28%] flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] scrollbar-thin">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx);
            }}
            className={
              "rounded-md overflow-hidden border flex-shrink-0 w-16 h-16 md:w-full md:h-[120px] cursor-pointer" +
              (activeIndex === idx ? " border-primary" : "")
            }
          >
            <img
              src={img}
              alt={`thumb-${idx}`}
              className="w-full h-full object-cover"
              width={56100}
              height={66100}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImageGallery;
