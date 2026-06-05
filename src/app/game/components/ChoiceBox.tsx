import React from 'react';
import { motion } from 'motion/react';
import { SceneChoice } from '../GameData';

interface ChoiceBoxProps {
  choices: SceneChoice[];
  onChoose: (nextId: string) => void;
}

export const ChoiceBox: React.FC<ChoiceBoxProps> = ({ choices, onChoose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md flex flex-col gap-4 px-4"
    >
      {choices.map((choice, idx) => (
        <button
          key={idx}
          onClick={() => onChoose(choice.nextId)}
          className="w-full bg-white/95 backdrop-blur-md hover:bg-black hover:text-white transition-all duration-300 rounded-xl py-4 px-6 text-center text-lg font-semibold shadow-xl border border-gray-200"
        >
          {choice.text}
        </button>
      ))}
    </motion.div>
  );
};
