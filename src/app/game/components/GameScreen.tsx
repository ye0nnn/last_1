import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../GameEngine';
import { DialogueBox } from './DialogueBox';
import { ChoiceBox } from './ChoiceBox';
import { PhoneUI } from './PhoneUI';
import { EndingScreen } from './EndingScreen';

const backgrounds: Record<string, string> = {
  classroom: 'bg-amber-50',
  phone_message: 'bg-zinc-800',
  funeral: 'bg-zinc-950 text-white',
  phone: 'bg-zinc-900',
  black: 'bg-black text-white',
};

export const GameScreen = () => {
  const { currentSceneId, currentLineIndex, getCurrentScene, advanceLine, makeChoice } = useGame();
  const scene = getCurrentScene();
  const line = scene.lines?.[currentLineIndex];
  const isChoicesMode = !scene.interactive && scene.lines && currentLineIndex === scene.lines.length - 1 && scene.choices && scene.choices.length > 0;

  if (scene.ending !== undefined) {
    return <EndingScreen ending={scene.ending} />;
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ${backgrounds[scene.bg || 'classroom']}`}>
      {/* Background Decorators based on scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {scene.bg === 'classroom' && (
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
          )}
        </motion.div>
      </AnimatePresence>

      {line && (
        <DialogueBox 
          line={line} 
          onAdvance={advanceLine} 
          showChoices={!!isChoicesMode}
          isInteractive={!!scene.interactive}
          isWaitingForInteraction={!!scene.interactive && currentLineIndex === (scene.lines?.length || 1) - 1}
        />
      )}

      {isChoicesMode && scene.choices && (
        <ChoiceBox choices={scene.choices} onChoose={makeChoice} />
      )}

      {scene.interactive && (
        <PhoneUI />
      )}
    </div>
  );
};
