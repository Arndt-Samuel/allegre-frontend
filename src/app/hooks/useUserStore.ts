import { create } from 'zustand'

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  setAll: (user: User, token: string) => void
}

interface User {
  id: number
  name: string
  email: string
  avatarUrl: string
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token }),
  setAll: (user: User, token: string) => set({ user, token })
}))
