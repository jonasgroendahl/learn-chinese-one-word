export type IWord = {
  word: string;
  translation: string;
  link: string;
  examples?: {word: string; translation: string}[];
  date: string;
  guessed?: boolean;
};
