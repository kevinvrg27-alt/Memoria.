import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronLeft, ChevronRight, Heart, Stars, Moon } from 'lucide-react';

// --- Components ---

const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] overflow-hidden pointer-events-none z-0">
      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-10 right-10 md:top-20 md:right-20"
      >
        <div className="relative">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-yellow-100 rounded-full shadow-[0_0_50px_rgba(254,249,195,0.5)]" />
          <div className="absolute top-0 left-4 w-20 h-20 md:w-32 md:h-32 bg-[#020617] rounded-full translate-x-4 -translate-y-2" />
        </div>
      </motion.div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars / Meteor Shower */}
      <MeteorShower />
    </div>
  );
};

const MeteorShower = () => {
  const meteors = [
    { id: 1, top: "5%", left: "10%", angle: -35, duration: 1.2, delay: 0 },
    { id: 2, top: "15%", left: "40%", angle: -30, duration: 1.5, delay: 5 },
    { id: 3, top: "0%", left: "70%", angle: -40, duration: 1.3, delay: 12 },
    { id: 4, top: "25%", left: "20%", angle: -35, duration: 2, delay: 8 },
    { id: 5, top: "10%", left: "85%", angle: -45, duration: 1.1, delay: 15 },
  ];

  return (
    <>
      {meteors.map((m) => (
        <ShootingStar 
          key={m.id} 
          top={m.top} 
          left={m.left} 
          angle={m.angle} 
          duration={m.duration} 
          delay={m.delay} 
        />
      ))}
    </>
  );
};

interface ShootingStarProps {
  top?: string;
  left?: string;
  angle?: number;
  duration?: number;
  delay?: number;
}

const ShootingStar: React.FC<ShootingStarProps> = ({ 
  top = "20%", 
  left = "0%", 
  angle = -35, 
  duration = 2, 
  delay = 0 
}) => (
  <motion.div
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: [0, 800],
      y: [0, 600],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      repeatDelay: 15 + delay,
      ease: "linear",
    }}
    className="absolute w-40 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent z-0 pointer-events-none"
    style={{
      top: top,
      left: left,
      transform: `rotate(${angle}deg)`,
    }}
  />
);

const memories = [
  {
    id: 1,
    url: "https://i.ibb.co.com/xS2g5KwH/Gemini-Generated-Image-632a02632a02632a.png",
    title: "Momen 1",
    desc: "Awal dari segalanya, tawa yang tak pernah pudar."
  },
  {
    id: 2,
    url: "https://i.ibb.co.com/7JkYJJtP/Gemini-Generated-Image-r12yz0r12yz0r12y.png",
    title: "Momen 2",
    desc: "Kebersamaan yang membuat hari-hari lebih berwarna."
  },
  {
    id: 3,
    url: "https://i.ibb.co.com/ZpPZP5Cx/Gemini-Generated-Image-vrddavvrddavvrdd.png",
    title: "Momen 3",
    desc: "Cerita-cerita kecil yang akan kita kenang selamanya."
  },
  {
    id: 4,
    url: "https://i.ibb.co.com/cXKK4z2c/Gemini-Generated-Image-a2yxufa2yxufa2yx.png",
    title: "Momen 4",
    desc: "Melewati rintangan bersama, menguatkan ikatan kita."
  },
  {
    id: 5,
    url: "https://i.ibb.co.com/sdYJwccX/Gemini-Generated-Image-us3bjtus3bjtus3b.png",
    title: "Momen 5",
    desc: "Janji untuk selalu ada, apa pun yang terjadi."
  }
];

const MemoryGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % memories.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={memories[currentIndex].url}
              alt={memories[currentIndex].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {memories[currentIndex].title}
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-lg text-gray-300"
              >
                {memories[currentIndex].desc}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-md border border-white/20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-md border border-white/20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Download Button */}
        <button
          onClick={() => handleDownload(memories[currentIndex].url, `memory-${currentIndex + 1}.png`)}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20 text-sm font-medium"
        >
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3 mt-6">
        {memories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-8" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-yellow-200 selection:text-black">
      <StarryBackground />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
            >
              <Stars className="text-yellow-200 w-8 h-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                KITA JANGAN SAMPAI
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-t from-yellow-200 to-yellow-500">
                ASING YAA
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 text-xl md:text-2xl font-light text-gray-400 italic">
              <div className="h-[1px] w-12 bg-gray-700" />
              <span>Kevin X Fiorenza</span>
              <div className="h-[1px] w-12 bg-gray-700" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-12"
            >
              <div className="animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1 mx-auto">
                  <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-black/40">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-yellow-200 mb-6"
            >
              <Heart size={14} className="fill-current" />
              Our Memories
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Setiap Detik Berharga</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Kumpulan momen indah yang telah kita lalui bersama. Mari kita jaga agar kenangan ini tetap abadi.
            </p>
          </div>

          <MemoryGallery />
        </section>

        {/* Footer */}
        <footer className="py-20 text-center border-t border-white/5">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-yellow-500/20 rounded-full" />
              <Moon className="relative text-yellow-100 w-12 h-12" />
            </div>
            <p className="text-gray-400 font-medium">
              Dibuat dengan ❤️ untuk persahabatan abadi.
            </p>
            <div className="text-xs text-gray-600 tracking-widest uppercase">
              © 2026 Kevin X Fiorenza
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
