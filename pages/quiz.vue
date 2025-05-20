<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800"
  >
    <div class="p-6 w-full">
      <QuizCard
        :key="quizStore.currentIndex"
        :question="quizStore.currentQuestion"
        @answered="handleAnswer"
        @next="goNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuizCard from "~/components/QuizCard.vue";
import { useQuizStore } from "~/stores/useQuizStore";

const quizStore = useQuizStore();

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
</script>
