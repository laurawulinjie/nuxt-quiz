<template>
  <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <div v-if="question">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        {{ question.question }}
      </h2>

      <form class="space-y-2" @submit.prevent="submitAnswer">
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="flex items-start space-x-2 p-2 rounded-lg transition-all duration-150"
          :class="answerFeedbackClass(answer)"
        >
          <input
            :id="`answer-${question.id}-${index}`"
            :type="question.type === 'multiple' ? 'checkbox' : 'radio'"
            :name="'answer-' + question.id"
            :value="answer.text"
            v-model="userSelection"
            :disabled="submitted"
            class="mt-1"
          />
          <label
            class="text-gray-800 cursor-pointer"
            :for="`answer-${question.id}-${index}`"
          >
            {{ answer.text }}
          </label>
        </div>

        <div class="flex flex-wrap gap-3 pt-4">
          <button
            type="submit"
            :disabled="submitted || !canSubmit"
            class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            Submit
          </button>

          <button
            type="button"
            @click="$emit('next')"
            :disabled="!submitted"
            class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-200"
          >
            {{ props.isLastQuestion ? "View Score" : "Next Question" }}
          </button>
        </div>
      </form>

      <div v-if="submitted" class="text-sm text-gray-600 mt-2">
        <span v-if="isCorrect">✅ Correct!</span>
        <span v-else>❌ Your answer is not quite right</span>
      </div>
    </div>
    <div v-else>Loading Questions...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Question, Answer } from "~/types/quiz";

const props = defineProps<{
  question: Question;
  isLastQuestion?: boolean;
}>();

const emit = defineEmits<{
  (e: "answered", value: boolean): void;
  (e: "next"): void;
}>();

const submitted = ref(false);
const userSelection = ref<string[] | string>(
  props.question.type === "multiple" ? [] : ""
);

watch(
  () => props.question,
  () => {
    submitted.value = false;
    userSelection.value = props.question.type === "multiple" ? [] : "";
  },
  { immediate: true }
);

const correctAnswers = computed(() =>
  props.question.answers.filter((a) => a.isCorrect).map((a) => a.text)
);

const canSubmit = computed(() => {
  if (props.question.type === "multiple")
    return (userSelection.value as string[]).length > 0;
  return (userSelection.value as string).length > 0;
});

const isCorrect = computed(() => {
  const selected = Array.isArray(userSelection.value)
    ? userSelection.value
    : [userSelection.value];
  return (
    selected.length === correctAnswers.value.length &&
    selected.every((text) => correctAnswers.value.includes(text))
  );
});

const submitAnswer = () => {
  submitted.value = true;
  emit("answered", isCorrect.value);
};

const answerFeedbackClass = (answer: Answer) => {
  if (!submitted.value) return "hover:bg-gray-100";

  if (answer.isCorrect)
    return "bg-green-100 border border-green-400 text-green-800";
  const selected = Array.isArray(userSelection.value)
    ? userSelection.value.includes(answer.text)
    : userSelection.value === answer.text;
  if (selected) return "bg-red-100 border border-red-400 text-red-800";

  return "opacity-50";
};
</script>
