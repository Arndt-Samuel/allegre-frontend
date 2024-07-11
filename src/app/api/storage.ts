export const saveItem = async (
  key: string,
  data: string
): Promise<{ error?: Error }> => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, data)
    } else {
      throw new Error('localStorage is not available')
    }
    return {}
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) }
  }
}

export const restoreItem = async (
  key: string
): Promise<{ data?: string; error?: Error }> => {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key)
      return { data: data ?? undefined }
    } else {
      throw new Error('localStorage is not available')
    }
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) }
  }
}

export const saveAuthToken = (token: string) =>
  saveItem('@Allegre_token', token)

export const restoreAuthToken = () => restoreItem('authToken')

export const saveRecoveryEmail = (email: string) =>
  saveItem('recoveryEmail', email)

export const restoreRecoveryEmail = () => restoreItem('recoveryEmail')

export const saveRecoveryToken = (token: string) =>
  saveItem('recoveryToken', token)

export const restoreRecoveryToken = () => restoreItem('recoveryToken')
