export interface Task {
  id: string
  title: string
  done: boolean
}

export interface TimerState {
  endTime: number | null // timestamp in ms
  remaining: number
  running: boolean
}
