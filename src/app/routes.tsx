import React from 'react';
import { createBrowserRouter, Link } from 'react-router';
import { GameProvider } from './game/GameEngine';
import { GameScreen } from './game/components/GameScreen';
import { motion } from 'motion/react';

const TitleScreen = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="z-10 text-center flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          졸업앨범에 없는 아이
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 tracking-widest font-light">
          Delete or Remember
        </p>

        <Link 
          to="/play" 
          className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          게임 시작
        </Link>
      </motion.div>
    </div>
  );
};

const PlayScreen = () => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TitleScreen,
  },
  {
    path: "/play",
    Component: PlayScreen,
  }
]);
