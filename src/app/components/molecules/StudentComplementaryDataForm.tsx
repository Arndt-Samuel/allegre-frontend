import {
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Text as ChakraText
} from '@chakra-ui/react'
import { SelectMenuBase, Text } from '../atoms'
import Textarea from './Textarea'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import NumberInput from './NumberInput'
import Input from './Input'
import { createComplementaryDataCall } from '@/app/api/student'
interface StudentComplementaryFormValues {
  clothingSize: string
  shoeSize: string
  favorite_soccer_team: string
  likeMoreInProject: string
  dream: string
  studentId: string
}

interface StudentComplementaryFormProps {
  studentId: string
  onSubmit: (values: StudentComplementaryFormValues) => Promise<void>
  savedData?: StudentComplementaryFormValues | null
}

export const StudentComplementaryDataForm: React.FC<
  StudentComplementaryFormProps
> = ({ studentId, onSubmit, savedData }) => {
  const toast = useToast()

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue
  } = useFormik<StudentComplementaryFormValues>({
    initialValues: {
      clothingSize: savedData?.clothingSize || '',
      shoeSize: savedData?.shoeSize || '',
      favorite_soccer_team: savedData?.favorite_soccer_team || '',
      likeMoreInProject: savedData?.likeMoreInProject || '',
      dream: savedData?.dream || '',
      studentId: studentId
    },
    validationSchema: Yup.object({
      clothingSize: Yup.string(),
      shoeSize: Yup.string(),
      favorite_soccer_team: Yup.string(),
      likeMoreInProject: Yup.string(),
      dream: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        await createComplementaryDataCall(values)
        onSubmit(values)
      } catch (error: any) {
        toast({
          title: 'Erro ao criar dados complementares',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const clothingSizeOptions = [
    { label: '2', value: '2' },
    { label: '4', value: '4' },
    { label: '6', value: '6' },
    { label: '8', value: '8' },
    { label: '10', value: '10' },
    { label: '12', value: '12' },
    { label: 'PP', value: 'PP' },
    { label: 'P', value: 'P' },
    { label: 'M', value: 'M' },
    { label: 'G', value: 'G' },
    { label: 'GG', value: 'GG' },
    { label: 'XG', value: 'XG' },
    { label: 'XGG', value: 'XGG' },
    { label: 'EG', value: 'EG' },
    { label: 'EGG', value: 'EGG' }
  ]

  return (
    <form
      id="form-complementary-data"
      onSubmit={handleSubmit}
      style={{ width: '84%' }}
    >
      <Flex
        h={'auto'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
        p={'24px'}
        justifyContent={'space-between'}
        mt={'16px'}
        gap={'16px'}
      >
        <Flex w={'100%'} h={'14.74%'}>
          <Text.CardTitle>Dados Complementares</Text.CardTitle>
        </Flex>
        <Flex
          w={'100%'}
          h={'26.32%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl w={'28.87%'}>
            <SelectMenuBase
              name="clothingSize"
              label="Número da roupa"
              options={clothingSizeOptions}
              value={values.clothingSize}
              onChange={(value) => setFieldValue('clothingSize', value)}
              onBlur={handleBlur}
              isInvalid={touched.clothingSize && !!errors.clothingSize}
            />
            {touched.clothingSize && errors.clothingSize ? (
              <ChakraText color="red.500" mt={2}>
                {errors.clothingSize}
              </ChakraText>
            ) : null}
          </FormControl>
          <FormControl id="number-college" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Número do calçado
            </FormLabel>
            <NumberInput
              name="shoeSize"
              min={1}
              defaultValue={1}
              value={values.shoeSize}
              onChange={(value) => setFieldValue('shoeSize', value)}
              onBlur={handleBlur}
              touched={touched.shoeSize}
              error={errors.shoeSize}
            />
          </FormControl>
          <FormControl id="health-insurance" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Time de Futebol
            </FormLabel>
            <Input
              type="text"
              placeholder="Time de futebol"
              mt={'5px'}
              fontSize={'16px'}
              name="favorite_soccer_team"
              value={values.favorite_soccer_team}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.favorite_soccer_team && !!errors.favorite_soccer_team
              }
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'52.63%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="school-observations" w={['43.55%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              O que mais gosta no projeto?
            </FormLabel>
            <Textarea
              minH={'120px'}
              maxH={'172px'}
              name="likeMoreInProject"
              value={values.likeMoreInProject}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.likeMoreInProject}
              error={errors.likeMoreInProject}
              placeholder="Insira aqui o que a aluno mais gosta no projeto."
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="school-observations" w={['43.55%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Qual o seu sonho?
            </FormLabel>
            <Textarea
              minH={'120px'}
              maxH={'172px'}
              name="dream"
              value={values.dream}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.dream}
              error={errors.dream}
              placeholder="Insira aqui o sonho do aluno."
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
        <Flex />
      </Flex>
    </form>
  )
}
