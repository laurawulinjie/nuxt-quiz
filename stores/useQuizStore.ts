import { defineStore } from "pinia";
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
    const questions = ref<Question[]>([]);
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

    async function resetQuiz() {
      if (import.meta.client) {
        const { data } = await useFetch<Question[]>(
          "/nuxt-quiz/questions.json"
        );
        if (data.value) {
          questions.value = data.value.map((q) =>
            shuffleAnswers({ ...q, type: q.type as QuestionType })
          );
          currentIndex.value = 0;
          score.value = 0;
          answersGiven.value = [];
        } else {
          console.error("❌ Failed to load questions.");
        }
      }
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
