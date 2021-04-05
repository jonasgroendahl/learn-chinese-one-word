export type IWord = {
  word: string;
  translation: string;
  link: string;
  pinyin: string;
  audioURL: string;
  difficulty: string;
  examples?: {word: string; translation: string}[];
  date: string;
  guessed?: boolean;
};
