export type QuestionType = "single" | "multiple";

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  answers: Answer[];
}
