import { Scene } from './types';

export const BG_CLASSROOM = "https://images.unsplash.com/photo-1670924786856-9ae9882ca224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
export const BG_PHONE = "https://images.unsplash.com/photo-1600856209923-34372e319a5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
export const BG_DARK = "https://images.unsplash.com/photo-1562034475-0292da13283a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
export const BG_GRAD = "https://images.unsplash.com/photo-1780342245115-7019547031cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const script: Record<string, Scene> = {
  intro: {
    id: "intro",
    bg: BG_CLASSROOM,
    text: ["[졸업식 7일 전]", "장소: 3학년 2반 교실", "하린, 서우, 도윤, 유나가 모여 성인에 대해 이야기하고 있다."],
    next: "intro_harin"
  },
  intro_harin: {
    id: "intro_harin",
    bg: BG_CLASSROOM,
    character: "강하린",
    characterIntro: "주인공. 책임감이 강하고 눈치가 빠르지만, 정작 깊은 감정 표현은 서툴다.",
    text: "얘들아 성인되면 뭐하고 싶어?",
    next: "intro_doyun"
  },
  intro_doyun: {
    id: "intro_doyun",
    bg: BG_CLASSROOM,
    character: "박도윤",
    characterIntro: "서우의 짝꿍. 장난이 많고 말을 가볍게 하는 편이다. 무심코 한 말이 서우에게 상처가 된 적이 있었다.",
    text: "나는 일단... 운전면허부터 따야지!",
    next: "intro_yuna"
  },
  intro_yuna: {
    id: "intro_yuna",
    bg: BG_CLASSROOM,
    character: "최유나",
    characterIntro: "3학년 2반 반장. 졸업식 준비를 총괄. 밝고 추진력이 있지만 불편한 이야기와 상황은 피하려고 한다.",
    text: "나는 cc해보고 싶어!",
    next: "intro_harin_2"
  },
  intro_harin_2: {
    id: "intro_harin_2",
    bg: BG_CLASSROOM,
    character: "강하린",
    text: "서우야 너는?",
    next: "intro_seowoo"
  },
  intro_seowoo: {
    id: "intro_seowoo",
    bg: BG_CLASSROOM,
    character: "윤서우",
    characterIntro: "조용하고 착한 친구로 기억되는 학생. 반에서 튀지 않지만 단체 사진에서는 늘 뒤쪽이나 가장자리에 있다.",
    text: "나는 음... 잘 모르겠어.",
    next: "d_minus_5"
  },
  d_minus_5: {
    id: "d_minus_5",
    bg: BG_PHONE,
    text: ["[졸업식 5일 전]", "서우에게서 개인 메시지가 왔다."],
    next: "d_minus_5_msg"
  },
  d_minus_5_msg: {
    id: "d_minus_5_msg",
    bg: BG_PHONE,
    ui: 'phone',
    phoneContent: {
      type: 'chat',
      sender: '윤서우',
      messages: ['하린아 나 너에게 졸업식 전에 할 말이 있어']
    },
    text: "(졸업식 영상 편집으로 바쁘네... 졸업식 끝나고 답장해야지.)",
    next: "d_minus_3"
  },
  d_minus_3: {
    id: "d_minus_3",
    bg: BG_CLASSROOM,
    text: ["[졸업식 3일 전]", "장소: 3학년 2반 교실", "졸업을 앞둔 친구들은 칠판을 꾸미고 뒷풀이 이야기를 하며 들떠있다.", "하지만 저 멀리 혼자 앉아있는 하린의 모습이 보인다."],
    next: "teacher_news"
  },
  teacher_news: {
    id: "teacher_news",
    bg: BG_CLASSROOM,
    character: "담임 선생님",
    text: [
      "하린아, 졸업 영상에 서우 사진이랑 영상을 좀 추가로 편집할 수 있겠니?",
      "......",
      "놀라지 말고 들어. 서우가... 어제 사고로 세상을 떠났어."
    ],
    next: "teacher_choice"
  },
  teacher_choice: {
    id: "teacher_choice",
    bg: BG_CLASSROOM,
    text: "[담임이 서우 추모 영상을 부탁했다.]",
    choices: [
      { text: "만든다", next: "mom_meet" },
      { text: "만들지 않는다", next: "game_over" }
    ]
  },
  game_over: {
    id: "game_over",
    bg: BG_DARK,
    ui: 'ending',
    text: "게임 오버: 하린은 영상 제작을 거절했고, 서우의 진실은 영영 묻혔다."
  },
  mom_meet: {
    id: "mom_meet",
    bg: BG_CLASSROOM,
    character: "서우 엄마",
    characterIntro: "딸을 사랑하지만 학교에서 어떻게 생활했는지 잘 모름.",
    text: "하린아... 우리 서우 영상 만들어준다고 해서 정말 고맙다. 서우 핸드폰 여기 있어.",
    next: "sister_meet"
  },
  sister_meet: {
    id: "sister_meet",
    bg: BG_CLASSROOM,
    character: "서우 여동생",
    characterIntro: "서우가 중학생 때부터 영상 제작을 좋아했다는 걸 유일하게 아는 사람.",
    text: "언니, 이거 서우 언니 핸드폰 비밀번호야. (0313)",
    next: "phone_unlock"
  },
  phone_unlock: {
    id: "phone_unlock",
    bg: BG_PHONE,
    ui: 'pin',
    text: "서우의 핸드폰 전원을 켰다. 비밀번호를 입력해야 한다.",
    next: "app_home"
  },
  app_home: {
    id: "app_home",
    bg: BG_PHONE,
    ui: 'apps',
    text: "잠금이 풀렸다. 화면에 'Remember Zip' 이라는 낯선 어플이 보인다.",
    choices: [
      { text: "Remember Zip 열기", next: "app_warning" },
      { text: "열지 않는다", next: "ending_3" }
    ]
  },
  app_warning: {
    id: "app_warning",
    bg: BG_PHONE,
    text: "앱을 실행하자 알 수 없는 문구가 떴다.",
    next: "app_warning_2"
  },
  app_warning_2: {
    id: "app_warning_2",
    bg: BG_PHONE,
    text: "『삭제된 기록은 기억에서도 사라집니다.』",
    next: "explore_choice"
  },
  explore_choice: {
    id: "explore_choice",
    bg: BG_PHONE,
    text: "다른 앱들을 확인해볼까?",
    choices: [
      { text: "사진첩과 반톡을 확인한다", next: "chat_inspect" },
      { text: "아니, 굳이 안 봐도 될 것 같다", next: "ending_3" }
    ]
  },
  chat_inspect: {
    id: "chat_inspect",
    bg: BG_PHONE,
    ui: 'phone',
    phoneContent: {
      type: 'chat',
      sender: '3학년 2반 톡방',
      messages: ['도윤: 야 너 어제 체육시간에 왜 튀었냐ㅋㅋ 친구없냐?']
    },
    text: "서우가 상처받았을 만한 메시지들이 남아있다.",
    next: "chat_delete_choice"
  },
  chat_delete_choice: {
    id: "chat_delete_choice",
    bg: BG_PHONE,
    text: "반톡에서 서우가 상처받았던 메시지를 삭제할까?",
    choices: [
      { text: "삭제한다", next: "chat_deleted_effect" },
      { text: "삭제하지 않는다", next: "ending_3" }
    ]
  },
  chat_deleted_effect: {
    id: "chat_deleted_effect",
    bg: BG_CLASSROOM,
    character: "박도윤",
    text: "[다음 날] 서우가 내 짝이었던 적이 있었나? 나 원래 혼자 앉았던 것 같은데...",
    next: "editing_start"
  },
  editing_start: {
    id: "editing_start",
    bg: BG_DARK,
    text: "하린은 서우의 스마트폰을 가지고 추모 영상을 제작하고 있다. 그러던 중 서우가 하지 못했던 말들을 하나씩 발견하며 고민에 빠진다.",
    next: "sports_photo"
  },
  sports_photo: {
    id: "sports_photo",
    bg: BG_DARK,
    ui: 'phone',
    phoneContent: {
      type: 'photo',
      title: '체육대회 단체사진',
      desc: '서우는 체육대회에서 항상 센터보다 사이드에 있었다.'
    },
    text: "체육대회 단체사진. 서우는 구석에 작게 찍혀있다. 이 사진을 어떻게 할까?",
    choices: [
      { 
        text: "삭제한다", 
        action: (s, set) => set({...s, deletedCount: s.deletedCount + 1}),
        next: "diary_inspect"
      },
      { text: "유지한다", next: "diary_inspect" }
    ]
  },
  diary_inspect: {
    id: "diary_inspect",
    bg: BG_DARK,
    ui: 'phone',
    phoneContent: {
      type: 'diary',
      title: '일기장',
      entries: [
        { date: '2025년 9월 27일 목요일', content: `오늘 시험을 봤다. 난 분명 열심히 공부하고 암기했지만 내가 생각했던 
것보다 시험 점수가 훨씬 낮게 나왔다. 엄마에게 내 속상함을 말하면서 
나는 공부도 좋지만 영상 제작에 더 관심이 있다고 말을 했다. 
하지만 엄마의 반응은 너무 차가웠다. 너가 여기서 공부 말고 나중에 영
상으로 먹고 살 수 있겠냐며 오히려 나에게 짜증을 냈고 나는 방 문을 강
하게 닫으면서 들어갔다... 

나 사실 혼자서 유튜브 채널 운영하고 있는데.....ㅠㅠ` },
        { date: '2026년 3월 13일 화요일', content: `고3이 된지 얼마 안됐다. 대입도 1년밖에 안 남았고 곧 있으면 3월 모의
고사다. 나는 애들이랑 같이 입시 얘기도 하며 고민을 나누고 싶은데 애
들이 자꾸 나를 피하는 것만 같다. 내가 뭐 잘못했을까? 

나는 애들이랑 친하게 지내고 싶은데... 
나 오늘도 급식 혼자 먹었다.` },
        { date: '2026년 10월 11일 금요일', content: `한 달 뒤 수능이다. 나름 열심히 하고 있지만 여전히 나는 나를 못 믿는
다. 결국 아직까지도 반 애들이랑 안 친해졌다. 그냥 빨리 졸업하고 싶
다. 

반 애들이 "선재업고튀어" 드라마 얘기를 엄청한다. 사실 나 그거 엄청 
좋아하는데...내가 갑자기 끼면 애들이 싫어하겠지?` }
      ]
    },
    text: "서우의 비공개 계정에 외로움과 불안이 적힌 일기가 있다.",
    choices: [
      { 
        text: "삭제한다", 
        action: (s, set) => set({...s, deletedCount: s.deletedCount + 1}),
        next: "sns_inspect"
      },
      { text: "유지한다 (공개)", next: "sns_inspect" }
    ]
  },
  sns_inspect: {
    id: "sns_inspect",
    bg: BG_DARK,
    ui: 'phone',
    phoneContent: {
      type: 'sns',
      title: '비공개 SNS',
      feeds: [
        "고등학교 입학. 친해지고 싶은 친구가 생겼다. 강하린.",
        "수학여행 최고였다.",
        "하린이 방송부 들어갔다. 부럽다.. 재수없어",
        "도윤이랑 짝꿍. 말이 심할 때가 많다. 상처 받았다. XX",
        "체육대회 단체사진 구석에서 찍었다. 왕따 시키는 걸까? XX"
      ]
    },
    text: "서우가 반 친구들을 뒤에서 원망하고 욕했던 비공개 SNS 글들이다.",
    choices: [
      { 
        text: "삭제한다", 
        action: (s, set) => set({...s, deletedCount: s.deletedCount + 1}),
        next: "final_eval"
      },
      { text: "유지한다 (공개)", next: "final_eval" }
    ]
  },
  final_eval: {
    id: "final_eval",
    bg: BG_DARK,
    text: "...",
    next: (state) => {
      if (state.deletedCount >= 2) return "find_video_del";
      return "find_video_keep";
    }
  },
  find_video_del: {
    id: "find_video_del",
    bg: BG_DARK,
    text: "서우가 그저 조용한 반 친구였다고만 기억하게 되었다. 스마트폰을 살피다 <우리 반에게> 라는 제목의 미완성 영상을 발견했다.",
    choices: [
      { text: "영상을 삭제한다 (Yes)", next: "ending_2" },
      { text: "삭제하지 않는다 (No)", next: "ending_4_transition" }
    ]
  },
  ending_4_transition: {
    id: "ending_4_transition",
    bg: BG_PHONE,
    text: "졸업식 5일 전, 하린에게 온 메시지...",
    next: "ending_4_msg_delete"
  },
  ending_4_msg_delete: {
    id: "ending_4_msg_delete",
    bg: BG_PHONE,
    ui: 'phone',
    phoneContent: {
      type: 'chat',
      sender: '윤서우',
      messages: ['하린아 나 너에게 졸업식 전에 할 말이 있어 (삭제됨...)']
    },
    text: "이 메시지가 스르륵 하면서 삭제되었다...",
    next: "ending_4"
  },
  find_video_keep: {
    id: "find_video_keep",
    bg: BG_DARK,
    text: "서우의 진심이 담긴 미완성 영상 <우리 반에게>를 발견했다.",
    choices: [
      { text: "영상을 졸업식에 공개한다", next: "ending_1" },
      { text: "공개하지 않는다", next: "ending_2" }
    ]
  },
  
  // Endings
  ending_1: {
    id: "ending_1",
    bg: BG_GRAD,
    ui: 'ending',
    text: [
      "[엔딩 1: 판타지 엔딩]",
      "서우 핸드폰에 있던 기록들을 모두 졸업 영상에 넣었다.",
      "영상이 재생될수록 친구들은 서우가 사실 반 애들과 어울리고 싶어했다는 것을 깨닫고 눈물을 흘렸다.",
      "졸업식이 끝난 후 빈 교실, 졸업 앨범을 열자 서우가 친구들 사이에 선명하게 서있다.",
      "『기억이 복원되었습니다.』",
      "기억한다는 것은 누군가를 완벽하게 이해하는 것이 아니라, 그 사람이 분명히 존재했다는 사실을 잊지 않는 것이다."
    ]
  },
  ending_2: {
    id: "ending_2",
    bg: BG_GRAD,
    ui: 'ending',
    text: [
      "[엔딩 2: 삭제 엔딩]",
      "하린은 스마트폰 속 서우의 모든 기록을 삭제했다.",
      "서우라는 사람 존재 자체를 모든 사람의 기억에서 없애버렸고, 졸업식은 평화롭게 끝이 났다.",
      "불편한 기억의 삭제는 때로 한 사람의 존재 자체를 지운다."
    ]
  },
  ending_3: {
    id: "ending_3",
    bg: BG_GRAD,
    ui: 'ending',
    text: [
      "[엔딩 3: 아름다운 조작 엔딩]",
      "서우의 밝은 기록만 남기고 불편하거나 아픈 기록은 모두 삭제하거나 덮어두었다.",
      "졸업식 영상에는 서우가 웃는 사진, 따뜻한 문구만 들어갔다. 모두 감동적으로 끝났고 서우를 밝고 착했던 친구로 기억한다.",
      "하지만 졸업앨범의 사진은 어딘가 어색하다.",
      "좋은 기억만 남기는 것은 애도처럼 보이지만, 때로는 기억조작이 될 수 있다."
    ]
  },
  ending_4: {
    id: "ending_4",
    bg: BG_GRAD,
    ui: 'ending',
    text: [
      "[엔딩 4: 하린의 후회 엔딩]",
      "하린은 자신이 읽씹했던 죄책감 때문에 서우가 마지막으로 보낸 메시지를 삭제했다.",
      "메시지가 사라지자 죄책감도 사라졌고, 서우와의 관계도 흐릿해졌다.",
      "졸업식 영상을 보는데 이상하게 눈물이 난다. 왜 우는지 알 수 없다.",
      "죄책감과 함께 친구를 잃었다."
    ]
  }
};
