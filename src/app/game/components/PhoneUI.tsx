import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../GameEngine';
import { Lock, Smartphone, MessageCircle, Image as ImageIcon, Book, ShieldAlert, X } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import sportsDayImg from '../../../imports/______.jpg';

export const PhoneUI = () => {
  const { getCurrentScene, makeChoice, investigation, setInvestigationItem } = useGame();
  const scene = getCurrentScene();
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeModal, setActiveModal] = useState<'photo' | 'diary' | 'sns' | null>(null);

  if (!scene.interactive) return null;

  const handlePinInput = (num: number) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '0313') {
          setTimeout(() => makeChoice('phone_home_scene'), 500);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPin('');
            setPinError(false);
          }, 800);
        }
      }
    }
  };

  const renderUnlock = () => (
    <div className="flex flex-col items-center justify-center h-full text-white py-6">
      <Lock size={40} className={`mb-6 shrink-0 ${pinError ? 'text-red-500 animate-bounce' : 'text-white'}`} />
      <div className="flex gap-4 mb-8 shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`w-4 h-4 rounded-full border-2 ${pin.length > i ? 'bg-white border-white' : 'border-white/50'}`} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2].map((num) => (
          num >= 0 ? (
            <button
              key={num}
              onClick={() => handlePinInput(num)}
              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/30 text-xl font-light transition-colors"
            >
              {num}
            </button>
          ) : <div key={num} />
        ))}
      </div>
    </div>
  );

  const renderAppHome = () => (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-white text-xl font-semibold mb-8 text-center mt-8">앱 보관함</h2>
      <div className="grid grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-2" onClick={() => makeChoice('app_warning')}>
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg border border-gray-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-900 opacity-80" />
            <Smartphone className="text-white z-10" />
          </div>
          <span className="text-xs text-white">리멤버집</span>
        </button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="h-full bg-white flex flex-col rounded-[2rem] overflow-hidden">
      <div className="bg-gray-100 p-4 font-semibold text-center border-b">3학년 2반 단톡방</div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-blue-50">
        <div className="bg-white p-3 rounded-2xl rounded-tl-sm w-4/5 shadow-sm text-sm border">
          <span className="font-bold text-gray-800 block mb-1">도윤</span>
          서우야 넌 왜 맨날 구석에만 있냐? ㅋㅋㅋ 존재감 1도 없네 진짜.
        </div>
        <div className="bg-white p-3 rounded-2xl rounded-tl-sm w-4/5 shadow-sm text-sm border self-start">
          <span className="font-bold text-gray-800 block mb-1">유나</span>
          얘들아 좋게 좋게 하자~ 원래 서우 혼자 있는 거 좋아하잖아.
        </div>
        <div className="bg-[#fee500] p-3 rounded-2xl rounded-tr-sm w-fit self-end shadow-sm text-sm border border-yellow-400 mt-4">
          <span className="text-gray-500 text-xs">읽음 2</span>
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <p className="text-sm font-semibold mb-3 text-center">이 상처받은 메시지를 삭제하시겠습니까?</p>
        <div className="flex gap-2">
          <button onClick={() => makeChoice('ending_3_setup')} className="flex-1 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300">아니오</button>
          <button onClick={() => makeChoice('next_day')} className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">삭제한다</button>
        </div>
      </div>
    </div>
  );

  const renderIntroChat = () => (
    <div className="h-full bg-[#b2c7d9] flex flex-col rounded-[2rem] overflow-hidden">
      <div className="bg-[#b2c7d9] p-4 font-semibold text-center border-b border-black/10 text-gray-800">윤서우</div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 pt-8">
        <div className="flex gap-2 items-start">
          <div className="w-10 h-10 rounded-2xl bg-white/50 flex items-center justify-center shrink-0 shadow-sm border border-white">
            <span className="text-gray-600 text-sm font-medium">서우</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-700 ml-1">윤서우</span>
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm border-none max-w-[200px] text-gray-800">
              하린아 나 너에게 졸업식 전에 할 말이 있어
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-[#b2c7d9] flex flex-col gap-2">
        <motion.button 
          onClick={() => makeChoice('intro_3')} 
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full py-3.5 rounded-xl bg-gray-600/20 text-gray-800 font-bold hover:bg-gray-500/30 transition-colors border border-gray-500/30 shadow-sm"
        >
          읽씹하고 대화창 닫기
        </motion.button>
      </div>
    </div>
  );

  const renderInvestigationItem = (type: 'photo' | 'diary' | 'sns', icon: React.ReactNode, label: string) => {
    const state = investigation[type];
    return (
      <button 
        onClick={() => state === 'pending' && setActiveModal(type)}
        disabled={state !== 'pending'}
        className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${
          state === 'pending' ? 'bg-white/10 hover:bg-white/20 text-white' : 
          state === 'deleted' ? 'bg-red-500/20 text-red-300 opacity-50' : 'bg-green-500/20 text-green-300 opacity-50'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
        {state !== 'pending' && (
          <span className="text-xs">{state === 'deleted' ? '삭제됨' : '유지됨'}</span>
        )}
      </button>
    );
  };

  const renderInvestigation = () => (
    <div className="p-6 h-full flex flex-col pt-12 text-white">
      <h2 className="text-2xl font-bold mb-2">리멤버집</h2>
      <p className="text-white/70 mb-8 text-sm">삭제할 기억을 선택하세요.</p>
      
      <div className="grid grid-cols-2 gap-6">
        {renderInvestigationItem('photo', <ImageIcon size={28} />, '체육대회 사진')}
        {renderInvestigationItem('diary', <Book size={28} />, '비밀 일기장')}
        {renderInvestigationItem('sns', <ShieldAlert size={28} />, '비공개 SNS')}
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-white z-50 text-gray-900 flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">
                {activeModal === 'photo' ? '체육대회 사진' : activeModal === 'diary' ? '비밀 일기장' : '비공개 SNS'}
              </h3>
              <button onClick={() => setActiveModal(null)}><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 text-sm leading-relaxed">
              {activeModal === 'photo' && (
                <div>
                  <div className="bg-gray-200 h-48 mb-4 rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden">
                    <ImageWithFallback src={sportsDayImg} alt="체육대회 단체사진" className="w-full h-full object-cover" />
                    <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-xs font-bold text-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]">서우</div>
                  </div>
                  <p>서우는 체육대회에서 반 친구들을 응원해주는 편에 가까웠다. 단체사진에서도 항상 센터보다 사이드에 있었다.</p>
                </div>
              )}
              {activeModal === 'diary' && (
                <div className="flex flex-col gap-4">
                  <div className="bg-yellow-50 p-3 rounded shadow-sm border border-yellow-100 whitespace-pre-wrap">
                    <div className="font-bold mb-1">2025년 9월 27일 목요일</div>
                    {`오늘 시험을 봤다. 난 분명 열심히 공부하고 암기했지만 내가 생각했던 것보다 시험 점수가 훨씬 낮게 나왔다. 
엄마에게 내 속상함을 말하면서 나는 공부도 좋지만 영상 제작에 더 관심이 있다고 말을 했다. 

하지만 엄마의 반응은 너무 차가웠다. 너가 여기서 공부 말고 나중에 영상으로 먹고 살 수 있겠냐며 오히려 나에게 짜증을 냈고 나는 방 문을 강하게 닫으면서 들어갔다... 

나 사실 혼자서 유튜브 채널 운영하고 있는데.....ㅠㅠ`}
                  </div>
                  <div className="bg-yellow-50 p-3 rounded shadow-sm border border-yellow-100 whitespace-pre-wrap">
                    <div className="font-bold mb-1">2026년 3월 13일 화요일</div>
                    {`고3이 된지 얼마 안됐다. 대입도 1년밖에 안 남았고 곧 있으면 3월 모의고사다. 
나는 애들이랑 같이 입시 얘기도 하며 고민을 나누고 싶은데 애들이 자꾸 나를 피하는 것만 같다. 내가 뭐 잘못했을까? 

나는 애들이랑 친하게 지내고 싶은데... 
나 오늘도 급식 혼자 먹었다.`}
                  </div>
                  <div className="bg-yellow-50 p-3 rounded shadow-sm border border-yellow-100 whitespace-pre-wrap">
                    <div className="font-bold mb-1">2026년 10월 11일 금요일</div>
                    {`한 달 뒤 수능이다. 나름 열심히 하고 있지만 여전히 나는 나를 못 믿는다. 결국 아직까지도 반 애들이랑 안 친해졌다. 그냥 빨리 졸업하고 싶다. 

반 애들이 "선재업고튀어" 드라마 얘기를 엄청한다. 사실 나 그거 엄청 좋아하는데...내가 갑자기 끼면 애들이 싫어하겠지?`}
                  </div>
                </div>
              )}
              {activeModal === 'sns' && (
                <div className="flex flex-col gap-3">
                  {[
                    "친해지고 싶었던 친구 하린이, 최고의 수학여행.",
                    "2학년 되면서 하린이랑 멀어졌다.",
                    "하린이는 방송부에 들어갔다. 부럽다..재수없어",
                    "고3, 어색하게 된 하린이랑 같은 반이 됐다.",
                    "도윤이한테 상처 받았다. (진짜 심한 욕)",
                    "체육대회. 혼자 있는데 유나가 '얘 원래 혼자 있는거 좋아하자나ㅋㅋ' 라고 했다.",
                    "단체사진 구석. 애들이 나를 보기는 할까? 왕따 시키는 걸까? (진짜 심한 욕)"
                  ].map((text, i) => (
                    <div key={i} className="border-l-4 border-gray-300 pl-3 py-1 text-gray-700">{text}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex gap-3">
              <button 
                onClick={() => {
                  setInvestigationItem(activeModal, 'deleted');
                  setActiveModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold"
              >삭제</button>
              <button 
                onClick={() => {
                  setInvestigationItem(activeModal, 'kept');
                  setActiveModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gray-800 text-white font-bold"
              >유지</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[320px] h-[90vh] max-h-[650px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden ring-4 ring-black/20"
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-2xl w-40 mx-auto z-50"></div>
        
        {scene.interactive === 'unlock' && renderUnlock()}
        {scene.interactive === 'app_home' && renderAppHome()}
        {scene.interactive === 'chat' && renderChat()}
        {scene.interactive === 'investigation' && renderInvestigation()}
        {scene.interactive === 'intro_chat' && renderIntroChat()}
      </motion.div>
    </div>
  );
};
