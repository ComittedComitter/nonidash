<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/BareBox'
import CheckCircle from '@/components/ui/checkbox/CheckCircle.vue'
</script>

<template>
  <Item variant="outline" class="flex flex-col justify-center">
    <h2 class="text-3xl font-bold">Read</h2>
    <div class="flex gap-6">
      <div><ItemTitle>Mon</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Tue</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Wed</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Thu</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Fri</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Sat</ItemTitle> <CheckCircle /></div>
      <div><ItemTitle>Sun</ItemTitle> <CheckCircle /></div>
    </div>
  </Item>
</template>
