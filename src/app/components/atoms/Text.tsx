import {
  Text as ChakraText,
  TextProps as ChakraTextProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface TextProps extends ChakraTextProps {
  children: ReactNode
}

interface CardTitleProps extends ChakraTextProps {
  children: ReactNode
}

export const Text: React.FC<TextProps> & {
  CardTitle: React.FC<CardTitleProps>
} = ({ children, ...props }) => (
  <ChakraText
    color="brand.gray80"
    fontWeight="800"
    fontSize={'30px'}
    lineHeight={'38px'}
    letterSpacing={'-1px'}
    {...props}
  >
    {children}
  </ChakraText>
)

const TextCardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => {
  return (
    <ChakraText
      color="brand.gray60"
      fontWeight="600"
      fontSize={'24px'}
      lineHeight={'24px'}
      letterSpacing={'-1px'}
      {...props}
    >
      {children}
    </ChakraText>
  )
}

Text.CardTitle = TextCardTitle
Text.CardTitle.displayName = 'TextCardTitle'

export default Text
