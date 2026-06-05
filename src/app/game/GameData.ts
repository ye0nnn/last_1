export type Character = '강하린' | '윤서우' | '박도윤' | '최유나' | '담임선생님' | '서우 엄마' | '서우 여동생' | '시스템' | '나(강하린)';

export type SceneLine = {
  speaker?: Character;
  text: string;
  desc?: string;
};

export type SceneChoice = {
  text: string;
  nextId: string;
};

export type Scene = {
  id: string;
  bg?: string;
  lines: SceneLine[];
  choices?: SceneChoice[];
  nextId?: string;
  interactive?: 'unlock' | 'app_home' | 'chat' | 'investigation' | 'intro_chat';
  ending?: number;
};

export const gameScript: Record<string, Scene> = {
  intro_1: {
    id: 'intro_1',
    bg: 'classroom',
    lines: [
      { text: '졸업식 일주일 전. 3학년 2반.' },
      { text: '하린, 서우, 도윤, 유나가 다 같이 앉아서 성인에 대해 말하고 있다.' },
      { speaker: '강하린', text: '얘들아 성인되면 뭐하고 싶어?', desc: '주인공. 책임감이 강하고 눈치가 빠르지만, 깊은 감정 표현은 서툴다.' },
      { speaker: '박도윤', text: '나는 일단... 운전면허부터 따야지!', desc: '서우의 짝꿍. 장난이 많고 말을 가볍게 하는 편.' },
      { speaker: '최유나', text: '나는 cc해보고 싶어!', desc: '3학년 2반 반장. 밝고 추진력 있지만 불편한 상황은 피하려 한다.' },
      { speaker: '강하린', text: '서우야 너는?' },
      { speaker: '윤서우', text: '나는 음... 잘 모르겠어.', desc: '조용하고 착한 친구. 단체 사진에서는 늘 뒤쪽이나 가장자리에 서 있다.' },
    ],
    nextId: 'intro_2',
  },
  intro_2: {
    id: 'intro_2',
    bg: 'phone',
    lines: [
      { text: '졸업식 5일 전.' },
      { speaker: '나(강하린)', text: '서우에게서 개인 메시지가 왔다.' },
      { speaker: '나(강하린)', text: '하지만 나는 졸업식 영상 편집으로 바빠서... 서우의 메시지를 확인하고도 답장하지 않았다.' },
    ],
    interactive: 'intro_chat',
  },
  intro_3: {
    id: 'intro_3',
    bg: 'classroom',
    lines: [
      { text: '졸업식 3일 전. 3학년 2반.' },
      { speaker: '나(강하린)', text: '졸업을 기대하는 친구들은 반 칠판을 꾸미고 졸업식 뒷풀이까지 이야기하며 들떠있다.' },
      { speaker: '나(강하린)', text: '하지만 저 멀리 나 혼자 앉아있는 곳으로, 담임선생님이 다가오셨다.' },
      { speaker: '담임선생님', text: '하린아... 혹시 졸업 영상에 서우 사진이랑 영상을 추가로 편집해 줄 수 있겠니?' },
      { speaker: '담임선생님', text: '서우가... 어제 사고로 우리 곁을 떠났단다.' },
      { speaker: '나(강하린)', text: '(서우가... 죽었다고?)' },
    ],
    choices: [
      { text: '서우의 추모 영상을 만든다', nextId: 'meet_family' },
      { text: '만들지 않는다', nextId: 'game_over_1' },
    ],
  },
  game_over_1: {
    id: 'game_over_1',
    bg: 'black',
    lines: [
      { text: '나는 영상을 만들지 않았다.' },
      { text: '그렇게 서우는 서서히 잊혀졌다...' },
    ],
    ending: 0,
  },
  meet_family: {
    id: 'meet_family',
    bg: 'funeral',
    lines: [
      { speaker: '나(강하린)', text: '나는 서우의 장례식장에 찾아가 영상을 만들겠다고 말씀드렸다.' },
      { speaker: '서우 엄마', text: '하린아... 우리 서우 영상 만들어준다고 해서 정말 고맙다. 여기 서우 스마트폰이야.', desc: '딸을 사랑하지만 학교에서 어떻게 생활했는지 모른다.' },
      { speaker: '서우 엄마', text: '우리 서우가 학교에서 어땠는지 나는 잘 몰라서... 네가 좀 잘 만들어주렴.' },
      { speaker: '서우 여동생', text: '언니, 이거 우리 언니 휴대폰이고 비밀번호는 언니를 처음 만난 날이래.', desc: '서우가 영상 제작을 좋아하는 걸 아는 유일한 사람.' },
      { speaker: '서우 여동생', text: '우리 언니가 중학생 때부터 공부보다 영상 제작을 좋아하는 걸 내가 유일하게 알고 있었거든...' },
      { speaker: '나(강하린)', text: '나는 서우의 스마트폰을 받아들었다.' },
      { speaker: '나(강하린)', text: '처음 만난 날..? 3월 2일!!' },
    ],
    nextId: 'phone_unlock_scene',
  },
  phone_unlock_scene: {
    id: 'phone_unlock_scene',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '서우의 스마트폰. 잠금을 풀어야 한다. (비밀번호: 0302)' },
    ],
    interactive: 'unlock',
  },
  phone_home_scene: {
    id: 'phone_home_scene',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '잠금을 풀었다. 핸드폰 배경화면에 낯선 어플이 하나 있다. "리멤버집"...?' },
    ],
    interactive: 'app_home',
  },
  app_warning: {
    id: 'app_warning',
    bg: 'phone',
    lines: [
      { speaker: '시스템', text: '[삭제된 기록은 기억에서도 사라집니다.]' },
      { speaker: '나(강하린)', text: '...이게 무슨 소리지? 사진첩과 반톡 기록이 연동되어 있는 것 같다.' },
    ],
    choices: [
      { text: '사진첩/반톡을 확인한다', nextId: 'chat_check' },
      { text: '확인하지 않는다', nextId: 'ending_3_setup' },
    ],
  },
  chat_check: {
    id: 'chat_check',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '반톡을 확인해보니... 예전에 도윤이가 서우에게 무심코 던진 상처주는 말들이 그대로 남아있다.' },
      { speaker: '나(강하린)', text: '서우는 반에서 존재감 없는 학생이었고, 항상 가장자리에 있었지. 말이 묻히고 작게 취급되던...' },
      { speaker: '나(강하린)', text: '유나가 좋게 좋게 하자고 했지만, 서우는 뒤에서 우리를 헐뜯으며 괴로워했던 것 같다.' },
    ],
    interactive: 'chat',
  },
  next_day: {
    id: 'next_day',
    bg: 'classroom',
    lines: [
      { speaker: '나(강하린)', text: '다음 날 학교.' },
      { speaker: '박도윤', text: '어? 서우가 내 짝이었던 적이 있었나? 나 원래 혼자 앉았던 것 같은데.' },
      { speaker: '나(강하린)', text: '(도윤이의 기억이 지워졌다... 앱의 경고가 진짜였어.)' },
      { speaker: '나(강하린)', text: '나는 서우의 스마트폰을 가지고 졸업식 추모 영상을 계속 제작하기로 했다.' },
      { speaker: '나(강하린)', text: '추모 영상을 제작하기 위해 스마트폰을 보던 중, 서우가 하지 못했던 말들을 하나씩 발견하게 된다...' },
    ],
    nextId: 'investigation_start',
  },
  investigation_start: {
    id: 'investigation_start',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '어떤 기록부터 확인해볼까?' },
    ],
    interactive: 'investigation',
  },
  video_discovery_deleted: {
    id: 'video_discovery_deleted',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '이것저것 지우다보니... 서우가 그저 조용한 반 친구였다고만 기억하게 될 것 같다.' },
      { speaker: '나(강하린)', text: '갤러리 마지막에 <우리 반에게>라는 서우가 만든 미완성 영상이 남아있다.' },
    ],
    choices: [
      { text: '이 영상을 삭제한다', nextId: 'ending_2_setup' },
      { text: '삭제하지 않는다', nextId: 'ending_4_setup' },
    ],
  },
  video_discovery_kept: {
    id: 'video_discovery_kept',
    bg: 'phone',
    lines: [
      { speaker: '나(강하린)', text: '서우의 진짜 마음이 담긴 기록들...' },
      { speaker: '나(강하린)', text: '갤러리 마지막에 서우의 진심이 담긴 미완성 영상 <우리 반에게>를 발견했다.' },
    ],
    choices: [
      { text: '이 영상을 졸업식에 공개한다', nextId: 'ending_1_setup' },
      { text: '공개하지 않는다', nextId: 'ending_2_setup' },
    ],
  },
  ending_1_setup: {
    id: 'ending_1_setup',
    bg: 'black',
    lines: [
      { speaker: '나(강하린)', text: '나는 서우의 진짜 모습이 담긴 모든 기록을 졸업 영상에 넣기로 결심했다.' },
    ],
    ending: 1,
  },
  ending_2_setup: {
    id: 'ending_2_setup',
    bg: 'black',
    lines: [
      { speaker: '나(강하린)', text: '나는 이 영상을 지워버리기로 했다. 모두가 서우를 잊는 편이 나을지도 몰라...' },
    ],
    ending: 2,
  },
  ending_3_setup: {
    id: 'ending_3_setup',
    bg: 'black',
    lines: [
      { speaker: '나(강하린)', text: '나는 더 이상 기록을 파헤치지 않고, 그저 사람들이 아는 조용하고 착한 서우의 모습으로만 영상을 만들기로 했다.' },
    ],
    ending: 3,
  },
  ending_4_setup: {
    id: 'ending_4_setup',
    bg: 'black',
    lines: [
      { speaker: '나(강하린)', text: '나는 5일 전 서우가 마지막으로 보냈던 메시지, "할 말 있어"를 지워버리기로 했다. 나의 죄책감마저 지우고 싶어서...' },
    ],
    ending: 4,
  },
};
