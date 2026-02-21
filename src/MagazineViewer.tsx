// MagazineViewer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MagazineViewer = ({ magazine }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    if (index + newDirection >= 0 && index + newDirection < magazine.images.length) {
      setDirection(newDirection);
      setIndex((prev) => prev + newDirection);
    }
  }, [index, magazine.images.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={`http://localhost:3001/images/${magazine.name}/${magazine.images[index]}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute max-h-full max-w-full object-contain shadow-2xl"
        />
      </AnimatePresence>

      {/* UI Overlays */}
      <div className="absolute bottom-5 text-white bg-black/50 px-4 py-2 rounded-full">
        {magazine.name} — {index + 1} / {magazine.images.length}
      </div>
    </div>
  );
};