interface InputState {
  value: string
  selectionStart?: number | null
  selectionEnd?: number | null
}

export const MaskToCurrency = ({ nextState }: { nextState: InputState }) => {
  const { value, selectionStart, selectionEnd } = nextState || {}

  let amountFormatted = value?.replace?.(/\D/g, '')
  amountFormatted = amountFormatted?.replace?.(/^0+/g, '')

  if (amountFormatted?.length === 2) {
    return {
      ...nextState,
      value: amountFormatted || '',
      selectionStart: amountFormatted.length + 3,
      selectionEnd: amountFormatted.length + 3
    }
  }

  const amountFormattedWithComma = amountFormatted?.replace?.(
    /(?=\d{2})(\d{2})$/,
    ',$1'
  )
  const amountFormattedWithDot = amountFormattedWithComma?.replace?.(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.'
  )

  if (amountFormattedWithDot) {
    return {
      ...nextState,
      value: amountFormattedWithDot || '',
      selectionStart: amountFormattedWithDot.length + 3,
      selectionEnd: amountFormattedWithDot.length + 3
    }
  }

  return {
    ...nextState,
    selectionStart,
    selectionEnd
  }
}
