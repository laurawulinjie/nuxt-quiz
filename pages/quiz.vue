<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800"
  >
    <div class="p-6 w-full">
      <div v-if="quizStore.currentQuestion">
        <div class="max-w-xl mx-auto bg-gray-200 rounded-full h-4 mb-6">
          <div
            class="bg-blue-600 h-4 rounded-full transition-all duration-300"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <div class="text-sm text-center text-gray-600 mb-4">
          Question {{ quizStore.currentIndex + 1 }} of
          {{ quizStore.questions.length }}
        </div>

        <QuizCard
          :key="quizStore.currentIndex"
          :question="quizStore.currentQuestion"
          :isLastQuestion="quizStore.isFinished"
          @answered="handleAnswer"
          @next="goNext"
        />
      </div>

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

const progressPercent = computed(() => {
  if (!quizStore.questions.length) return 0;
  return Math.round(
    ((quizStore.currentIndex + 1) / quizStore.questions.length) * 100
  );
});
</script>
