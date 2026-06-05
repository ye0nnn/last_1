import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../GameEngine';

const endingData = {
  0: {
    title: "Game Over",
    desc: "아무것도 하지 않았습니다.",
    quote: "그렇게 기억은 잊혀진다."
  },
  1: {
    title: "Ending 1 : 기억 복원 엔딩",
    desc: "서우 핸드폰에 있던 기록들을 다 졸업영상에 넣었다. 영상이 재생될수록 친구들은 자신이 놓쳤던 서우의 모습을 알게됐고 서우가 오히려 반 애들을 너무 좋아하고 어울리고 싶어해서 외로웠다는 사실을 깨닫는다.\n\n졸업식이 끝난 후, 빈 교실. 졸업 앨범을 펼치자 서우가 친구들 사이에 선명하게 서있다.\n[기억이 복원되었습니다]\n모두가 서우를 같이 졸업한 친구로 기억한다.",
    quote: "기억한다는 것은 누군가를 완벽하게 이해하는 것이 아니라, 그 사람이 분명히 존재했다는 사실을 잊지 않는 것이다."
  },
  2: {
    title: "Ending 2 : 완전한 삭제 엔딩",
    desc: "스마트폰 속 서우의 모든 기록들을 삭제했다. 반톡에서 묻혔던 말, 비공개 sns, 일기장까지. 서우라는 사람 존재 자체를 모든 사람의 기억에서 없애버렸고, 졸업식은 평화롭게 끝이 났다.",
    quote: "불편한 기억의 삭제는 때로 한 사람의 존재 자체를 지운다."
  },
  3: {
    title: "Ending 3 : 아름다운 조작 엔딩",
    desc: "서우의 밝은 기록만 남기고 불편하거나 아픈 기록은 삭제했다. 졸업식 영상에는 웃는 사진, 따뜻한 문구만 들어갔다. 졸업식은 감동적으로 끝났고 친구들은 서우를 항상 밝고 착했던 친구로만 기억한다.\n졸업앨범 사진에 있지만 어딘가 어색하다.",
    quote: "좋은 기억만 남기는 것은 애도처럼 보이지만, 때로는 기억조작이 될 수 있다."
  },
  4: {
    title: "Ending 4 : 하린의 후회 엔딩",
    desc: "자신이 읽씹했던 죄책감 때문에 서우가 마지막으로 보낸 메시지를 삭제했다. 메시지가 사라지자 죄책감은 아예 사라졌고 서우와의 관계가 흐릿해지며 친했다는 사실도 잊어지게 된다.\n졸업식 영상을 보는데 이상하게 눈물이 난다. 왜 눈물이 나는지 알 수 없다.",
    quote: "죄책감과 함께 친구를 잃었다."
  }
};

export const EndingScreen = ({ ending }: { ending: number }) => {
  const data = endingData[ending as keyof typeof endingData];
  const { resetGame } = useGame();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-3xl md:text-5xl font-bold mb-8 text-white/90"
      >
        {data.title}
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-300 mb-16 whitespace-pre-wrap"
      >
        {data.desc}
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="text-xl md:text-2xl italic font-serif text-white/80 border-t border-white/20 pt-8 max-w-3xl"
      >
        "{data.quote}"
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7 }}
        onClick={resetGame}
        className="mt-16 px-6 py-3 border border-white/30 hover:bg-white/10 rounded-full transition-colors"
      >
        처음으로 돌아가기
      </motion.button>
    </motion.div>
  );
};
