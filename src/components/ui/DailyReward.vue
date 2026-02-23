<script setup lang="ts">
import { computed } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GiftIcon } from 'lucide-vue-next'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { useXp } from '@/lib/useXp'

const lastClaimedDay = useLocalStorage('daily-reward:lastClaimed', '')
const { addXp } = useXp()

function getTodayString(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}

const isAvailable = computed(() => lastClaimedDay.value !== getTodayString())

function claimReward() {
  if (!isAvailable.value) return
  addXp(5)
  lastClaimedDay.value = getTodayString()
}
</script>

<template>
  <Alert v-if="isAvailable" class="cursor-pointer" @click="claimReward">
    <GiftIcon />
    <AlertTitle>Daily reward</AlertTitle>
    <AlertDescription>Click to claim 5 Xp</AlertDescription>
  </Alert>
</template>
