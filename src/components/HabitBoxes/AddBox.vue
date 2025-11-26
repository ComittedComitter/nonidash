<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Item } from '@/components/ui/BareBox'
import { Button } from '../ui/button'
</script>

<template>
  <Item variant="outline" class="justify-center">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline"> Add Box </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Weekly Habit</DropdownMenuItem>
        <DropdownMenuItem>Timer</DropdownMenuItem>
        <DropdownMenuItem>To do</DropdownMenuItem>
        <DropdownMenuItem>Today</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Item>
</template>
