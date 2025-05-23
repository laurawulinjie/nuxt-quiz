<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800"
  >
    <div class="p-6 w-full">
      <QuizCard
        v-if="quizStore.currentQuestion"
        :key="quizStore.currentIndex"
        :question="quizStore.currentQuestion"
        @answered="handleAnswer"
        @next="goNext"
      />
      <div v-else class="mx-auto flex flex-col items-center justify-center">
        <div class="text-center">Something went wrong, Please start again</div>

        <button
          @click="restart"
          class="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuizCard from "~/components/QuizCard.vue";
import { useQuizStore } from "~/stores/useQuizStore";

const quizStore = useQuizStore();

onMounted(() => {
  quizStore.resetQuiz();
});

const handleAnswer = (correct: boolean) => {
  quizStore.answerQuestion(correct);
};

const goNext = () => {
  if (quizStore.isFinished) {
    useRouter().push("/result");
  } else {
    quizStore.nextQuestion();
  }
};

const router = useRouter();
const restart = () => {
  quizStore.resetQuiz();
  router.push("/");
};
</script>
