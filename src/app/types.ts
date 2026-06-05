export type GameState = {
  deletedCount: number;
};

export type Choice = {
  text: string;
  next: string | ((state: GameState) => string);
  action?: (state: GameState, setState: (s: GameState) => void) => void;
  style?: 'default' | 'danger';
};

export type Scene = {
  id: string;
  bg?: string;
  character?: string;
  characterIntro?: string;
  text: string | string[];
  choices?: Choice[];
  next?: string | ((state: GameState) => string);
  delay?: number;
  ui?: 'dialogue' | 'phone' | 'pin' | 'ending' | 'apps';
  phoneContent?: any;
};
