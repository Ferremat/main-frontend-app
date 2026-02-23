<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
}>();
</script>

<template>
  <div class="bg-[#F0F0F0] rounded-xl overflow-hidden aspect-square flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <img :src="image" :alt="title" class="max-h-full max-w-full object-contain mix-blend-multiply" />
  </div>
</template>
