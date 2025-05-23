<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-8 space-y-6"
  >
    <h1 class="text-3xl font-bold">🎉 Quiz Completed!</h1>
    <p v-if="quizStore.questions.length" class="text-xl">
      You scored <strong>{{ quizStore.score }}</strong> out of
      <strong>{{ quizStore.questions.length }}</strong>
    </p>

    <button
      @click="restart"
      class="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
    >
      Back to Home
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuizStore } from "~/stores/useQuizStore";

const router = useRouter();
const quizStore = useQuizStore();

const restart = () => {
  quizStore.resetQuiz();
  router.push("/");
};
</script>
