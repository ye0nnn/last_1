import React, { createContext, useContext, useState, ReactNode } from 'react';
import { gameScript, Scene } from './GameData';

type InvestigationState = 'pending' | 'kept' | 'deleted';

interface GameState {
  currentSceneId: string;
  currentLineIndex: number;
  investigation: {
    photo: InvestigationState;
    diary: InvestigationState;
    sns: InvestigationState;
  };
  advanceLine: () => void;
  makeChoice: (nextId: string) => void;
  setInvestigationItem: (item: 'photo' | 'diary' | 'sns', state: InvestigationState) => void;
  getCurrentScene: () => Scene;
  resetGame: () => void;
}

const GameContext = createContext<GameState | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentSceneId, setCurrentSceneId] = useState<string>('intro_1');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [investigation, setInvestigation] = useState({
    photo: 'pending' as InvestigationState,
    diary: 'pending' as InvestigationState,
    sns: 'pending' as InvestigationState,
  });

  const getCurrentScene = () => {
    return gameScript[currentSceneId] || gameScript['intro_1'];
  };

  const advanceLine = () => {
    const scene = getCurrentScene();

    if (currentLineIndex < scene.lines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      if (scene.interactive) return; // Wait for interactive resolution before moving to next scene
      
      if (scene.nextId) {
        setCurrentSceneId(scene.nextId);
        setCurrentLineIndex(0);
      }
    }
  };

  const makeChoice = (nextId: string) => {
    setCurrentSceneId(nextId);
    setCurrentLineIndex(0);
  };

  const setInvestigationItem = (item: 'photo' | 'diary' | 'sns', state: InvestigationState) => {
    setInvestigation((prev) => {
      const nextState = { ...prev, [item]: state };
      
      // Check if all are resolved
      if (nextState.photo !== 'pending' && nextState.diary !== 'pending' && nextState.sns !== 'pending') {
        const deleteCount = Object.values(nextState).filter((s) => s === 'deleted').length;
        setTimeout(() => {
          if (deleteCount >= 2) {
            makeChoice('video_discovery_deleted');
          } else {
            makeChoice('video_discovery_kept');
          }
        }, 1000); // Small delay for UX
      }

      return nextState;
    });
  };

  const resetGame = () => {
    setCurrentSceneId('intro_1');
    setCurrentLineIndex(0);
    setInvestigation({ photo: 'pending', diary: 'pending', sns: 'pending' });
  };

  return (
    <GameContext.Provider
      value={{
        currentSceneId,
        currentLineIndex,
        investigation,
        advanceLine,
        makeChoice,
        setInvestigationItem,
        getCurrentScene,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
