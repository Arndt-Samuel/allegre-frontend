import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  setAll: (user: User, token: string) => void
  clear: () => void
}

interface User {
  id: number
  name: string
  email: string
  avatarUrl: string
  organizationId: string
}

export const useUserStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setAll: (user: User, token: string) => set({ user, token }),
      clear: () => set({ user: null, token: null })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
