import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneLine } from '../GameData';

interface DialogueBoxProps {
  line: SceneLine;
  onAdvance: () => void;
  showChoices: boolean;
  isInteractive?: boolean;
  isWaitingForInteraction?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ line, onAdvance, showChoices, isInteractive, isWaitingForInteraction }) => {
  return (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 ${isWaitingForInteraction ? 'cursor-default' : 'cursor-pointer'} ${isInteractive ? 'top-8' : 'bottom-8'}`}
      onClick={(!showChoices && !isWaitingForInteraction) ? onAdvance : undefined}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-8"
          >
            {line.speaker && (
              <div className="mb-3 flex items-end gap-3">
                <h3 className="text-xl font-bold text-gray-900">{line.speaker}</h3>
                {line.desc && (
                  <span className="text-sm text-gray-500 hidden sm:block">
                    {line.desc}
                  </span>
                )}
              </div>
            )}
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              {line.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {!showChoices && !isWaitingForInteraction && (
          <div className="bg-gray-100/50 py-2 px-6 flex justify-end">
            <motion.div 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-gray-400 text-sm flex items-center gap-1"
            >
              다음 클릭 <span className="text-lg">›</span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
