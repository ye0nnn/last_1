import React, { useState, useEffect } from 'react';
import { Scene, GameState } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Smartphone, Image as ImageIcon, MessageCircle, Book, EyeOff } from 'lucide-react';

interface Props {
  scene: Scene;
  gameState: GameState;
  onNext: (nextId: string | ((state: GameState) => string), action?: any) => void;
  onSetState: (state: GameState) => void;
}

export const GameUI: React.FC<Props> = ({ scene, gameState, onNext, onSetState }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Reset text index when scene changes
  useEffect(() => {
    setTextIndex(0);
    setPin('');
    setError(false);
  }, [scene.id]);

  const texts = Array.isArray(scene.text) ? scene.text : [scene.text];
  const isTypingFinished = textIndex === texts.length - 1 || texts.length === 0;

  const handleNextText = () => {
    if (textIndex < texts.length - 1) {
      setTextIndex(textIndex + 1);
    } else if (scene.next && !scene.choices) {
      onNext(scene.next);
    }
  };

  const handleChoice = (choice: any) => {
    if (choice.action) {
      choice.action(gameState, onSetState);
    }
    onNext(choice.next);
  };

  const handlePin = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '0313') {
          setTimeout(() => onNext(scene.next!), 500);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-[600px] bg-black overflow-hidden flex flex-col justify-end shadow-2xl select-none"
      style={{ backgroundImage: `url(${scene.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={(!scene.choices && scene.ui !== 'pin') ? handleNextText : undefined}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Ending UI */}
      {scene.ui === 'ending' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-black flex flex-col items-center justify-center p-12 text-center z-50"
        >
          {texts.map((txt, i) => (
            <motion.p 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 2, duration: 1 }}
              className="text-white text-lg leading-relaxed mb-6 font-serif tracking-wide"
            >
              {txt}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* PIN UI */}
      {scene.ui === 'pin' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <div className="bg-zinc-900 p-8 rounded-3xl w-72 flex flex-col items-center border border-zinc-800">
            <Lock className="text-zinc-400 mb-6" size={32} />
            <div className="text-white mb-2">비밀번호 입력</div>
            <div className={`flex gap-3 mb-8 ${error ? 'animate-shake' : ''}`}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`w-4 h-4 rounded-full ${i < pin.length ? 'bg-white' : 'bg-zinc-700'}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((n, i) => (
                <div key={i} className="flex items-center justify-center">
                  {n !== '' ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePin(n.toString()); }}
                      className="w-16 h-16 rounded-full bg-zinc-800 text-white text-xl hover:bg-zinc-700 active:bg-zinc-600 transition-colors"
                    >
                      {n}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Phone Specific Content UI */}
      {scene.ui === 'phone' && scene.phoneContent && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[580px] bg-white rounded-[40px] border-[8px] border-zinc-900 shadow-xl overflow-hidden z-20 flex flex-col">
          <div className="bg-zinc-100 h-14 flex items-center justify-center font-bold text-sm border-b">
            {scene.phoneContent.title || scene.phoneContent.sender}
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-zinc-50 flex flex-col gap-4 text-zinc-800 text-sm">
            {scene.phoneContent.type === 'chat' && scene.phoneContent.messages.map((m: string, i: number) => (
              <div key={i} className="bg-yellow-300 p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] shadow-sm">
                {m}
              </div>
            ))}
            {scene.phoneContent.type === 'photo' && (
              <div className="flex flex-col gap-2 items-center text-center mt-4">
                <div className="w-full aspect-video bg-zinc-300 rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-zinc-500" size={32} />
                </div>
                <p className="text-zinc-600 italic text-xs mt-2">{scene.phoneContent.desc}</p>
              </div>
            )}
            {scene.phoneContent.type === 'diary' && scene.phoneContent.entries.map((e: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
                <div className="text-xs text-zinc-400 mb-2">{e.date}</div>
                <div>{e.content}</div>
              </div>
            ))}
            {scene.phoneContent.type === 'sns' && scene.phoneContent.feeds.map((f: string, i: number) => (
              <div key={i} className="bg-zinc-900 text-white p-4 rounded-xl">
                <div>{f}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* App Icons UI */}
      {scene.ui === 'apps' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[580px] bg-zinc-800 rounded-[40px] border-[8px] border-zinc-900 shadow-xl overflow-hidden z-20 p-6">
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white"><ImageIcon /></div>
              <span className="text-[10px] text-white">사진</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-zinc-800"><MessageCircle /></div>
              <span className="text-[10px] text-white">채팅</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-zinc-700 border border-zinc-600 rounded-2xl flex items-center justify-center text-white relative">
                <EyeOff size={20} />
              </div>
              <span className="text-[10px] text-white">Remember Zip</span>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue Box */}
      {scene.ui !== 'ending' && (
        <div className="relative z-30 w-full p-4 mb-4">
          <div className="bg-black/80 backdrop-blur-md rounded-lg border border-zinc-800 p-6 min-h-[140px] shadow-2xl relative">
            
            {/* Character Name Badge */}
            {scene.character && (
              <div className="absolute -top-4 left-6 bg-blue-600 text-white px-4 py-1 rounded shadow-lg font-bold">
                {scene.character}
              </div>
            )}
            
            {/* Character Intro Tooltip */}
            {scene.characterIntro && (
              <div className="absolute -top-10 left-6 text-xs text-blue-200 bg-black/60 px-3 py-1 rounded">
                {scene.characterIntro}
              </div>
            )}

            <div className="text-white text-lg mt-2 leading-relaxed">
              <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {texts[textIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Indicator */}
            {!scene.choices && (
              <div className="absolute bottom-4 right-4 animate-bounce text-zinc-400 text-sm">
                ▼
              </div>
            )}
          </div>

          {/* Choices */}
          {scene.choices && isTypingFinished && (
            <div className="flex flex-col gap-3 mt-4 items-center">
              {scene.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); handleChoice(choice); }}
                  className="w-2/3 py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full border border-zinc-600 transition-all hover:scale-105 active:scale-95 text-center shadow-lg"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
