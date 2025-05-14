<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-8 space-y-6"
  >
    <h1 class="text-4xl font-bold text-blue-600">Welcome to the Quiz!</h1>
    <p class="text-lg text-center max-w-md">
      Test your knowledge with single-choice and multi-select questions. Get
      instant feedback and see how well you do!
    </p>
    <button
      @click="startQuiz"
      class="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
    >
      Let's Go
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const startQuiz = () => {
  router.push("/quiz");
};
</script>
