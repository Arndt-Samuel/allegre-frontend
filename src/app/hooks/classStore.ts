import { create } from 'zustand'
import { api } from '@/app/api'

interface User {
  id: string
  name: string
}

interface Class {
  id: string
  name: string
  logoUrl: string
  place: string
  daysOfClasses: string
  startTime: string
  endTime: string
  classObservations: string
  responsibleClass: string
  studentCount: number
  userClasses: { user: User }[]
}

interface ClassesState {
  classes: Class[]
  fetchClasses: () => Promise<void>
  addClass: (newClass: Class) => void
  setClasses: (classes: Class[]) => void
}

export const useClassStore = create<ClassesState>((set) => ({
  classes: [],
  fetchClasses: async () => {
    const response = await api.get('/class')
    const classes = response.data.data
    set({ classes })
  },
  addClass: (newClass: Class) => {
    set((state) => ({
      classes: [...state.classes, newClass]
    }))
  },
  setClasses: (classes: Class[]) => {
    set({ classes })
  }
}))
