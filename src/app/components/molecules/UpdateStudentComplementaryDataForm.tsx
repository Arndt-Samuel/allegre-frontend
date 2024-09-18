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
import {
  createComplementaryDataCall,
  updateComplementaryDataCall
} from '@/app/api/student'
import { useEffect, useState } from 'react'
import { api } from '@/app/api'

interface UpdateStudentComplementaryFormValues {
  clothingSize: string
  shoeSize: string
  favorite_soccer_team: string
  likeMoreInProject: string
  dream: string
}

interface UpdateStudentComplementaryFormProps {
  studentId: string
  onSuccess?: () => void
}

export const UpdateStudentComplementaryDataForm: React.FC<
  UpdateStudentComplementaryFormProps
> = ({ studentId, onSuccess }) => {
  const toast = useToast()
  const [initialValues, setInitialValues] =
    useState<UpdateStudentComplementaryFormValues>({
      clothingSize: '',
      shoeSize: '',
      favorite_soccer_team: '',
      likeMoreInProject: '',
      dream: ''
    })
  const [complementaryDataId, setComplementaryDataId] = useState<string | null>(
    null
  )

  useEffect(() => {
    const fetchComplementaryData = async () => {
      try {
        const response = await api.get(
          `/student-complementary-data/${studentId}`
        )
        const complementaryData = response.data?.[0]
        if (complementaryData) {
          setComplementaryDataId(complementaryData.id)
          setInitialValues({
            clothingSize: complementaryData.clothingSize,
            shoeSize: complementaryData.shoeSize,
            favorite_soccer_team: complementaryData.favorite_soccer_team,
            likeMoreInProject: complementaryData.likeMoreInProject,
            dream: complementaryData.dream
          })
        }
      } catch (error) {
        console.error('Failed to fetch complementary data', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar os dados complementares do aluno. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchComplementaryData()
  }, [studentId, toast])

  const formik = useFormik<UpdateStudentComplementaryFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      clothingSize: Yup.string(),
      shoeSize: Yup.string(),
      favorite_soccer_team: Yup.string(),
      likeMoreInProject: Yup.string(),
      dream: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        if (complementaryDataId) {
          await updateComplementaryDataCall(complementaryDataId, values)
          toast({
            title: 'Dados complementares do aluno atualizados com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        } else {
          await createComplementaryDataCall({ ...values, studentId })
          toast({
            title: 'Dados complementares do aluno criados com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        }
        if (onSuccess) {
          onSuccess()
        }
      } catch (error: any) {
        toast({
          title: 'Erro ao salvar dados complementares do aluno',
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

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue
  } = formik

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
              placeholder="Insira aqui o que o aluno mais gosta no projeto."
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
