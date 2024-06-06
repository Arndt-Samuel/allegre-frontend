import { Tag as ChakraTag, TagProps as ChakraTagProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface TagProps {
  colorScheme: string
  children: ReactNode
}

const Tag: React.FC<TagProps> = ({ children, colorScheme, ...props }) => {
  return (
    <ChakraTag
      size="lg"
      colorScheme={colorScheme}
      borderRadius="full"
      {...props}
    >
      {children}
    </ChakraTag>
  )
}

export default Tag
