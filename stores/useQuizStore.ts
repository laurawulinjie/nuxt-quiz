import { defineStore } from "pinia";
import questionsJson from "~/assets/questions.json";
import type { Question, QuestionType } from "~/types/quiz";

function shuffleAnswers(q: Question): Question {
  return {
    ...q,
    answers: [...q.answers].sort(() => Math.random() - 0.5),
  };
}

export const useQuizStore = defineStore(
  "quiz",
  () => {
    const questions = ref<Question[]>(
      questionsJson.map((q) =>
        shuffleAnswers({ ...q, type: q.type as QuestionType })
      )
    );

    const currentIndex = ref(0);
    const score = ref(0);
    const answersGiven = ref<boolean[]>([]);
    const currentQuestion = computed(() => questions.value[currentIndex.value]);

    const isFinished = computed(
      () => currentIndex.value >= questions.value.length - 1
    );

    function answerQuestion(isCorrect: boolean) {
      answersGiven.value[currentIndex.value] = isCorrect;
      if (isCorrect) score.value++;
    }

    function nextQuestion() {
      if (!isFinished.value) currentIndex.value++;
    }

    function resetQuiz() {
      questions.value = questionsJson.map((q) =>
        shuffleAnswers({ ...q, type: q.type as QuestionType })
      );

      currentIndex.value = 0;
      score.value = 0;
      answersGiven.value = [];
    }

    return {
      questions,
      currentQuestion,
      currentIndex,
      score,
      answersGiven,
      isFinished,
      answerQuestion,
      nextQuestion,
      resetQuiz,
    };
  },
  { persist: true }
);
