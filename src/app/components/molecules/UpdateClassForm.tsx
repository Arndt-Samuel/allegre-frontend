import React, { useRef, forwardRef, useEffect, useState } from 'react'
import {
  Image,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  useToast,
  Text as ChakraText,
  Textarea
} from '@chakra-ui/react'
import { SelectMenuBase, Text } from '../atoms'
import { Input } from './Input'
import InputMask from 'react-input-mask'
import { PiFileArrowUpBold } from 'react-icons/pi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CheckBox from './Checkbox'
import { updateClassCall } from '@/app/api/class'
import { api } from '@/app/api'

interface Teacher {
  id: string
  name: string
}

interface UpdateClassFormValues {
  name: string
  logoUrl: string | File | null
  place: string
  daysOfClasses: string[]
  startTime: string
  endTime: string
  classObservations: string
  userId: string
}

interface UpdateClassFormProps {
  classId: string
  onSuccess?: () => void
}

export const UpdateClassForm = forwardRef<
  HTMLFormElement,
  UpdateClassFormProps
>(({ classId, onSuccess }, ref) => {
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [teachers, setTeachers] = useState<{ label: string; value: string }[]>(
    []
  )

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/user?role=ORG_TEACHER')
        const teacherOptions = response.data.data.map((teacher: Teacher) => ({
          label: teacher.name,
          value: teacher.id
        }))
        setTeachers(teacherOptions)
      } catch (error) {
        console.error('Erro ao buscar professores:', error)
      }
    }

    fetchTeachers()
  }, [])

  const [initialValues, setInitialValues] = useState<UpdateClassFormValues>({
    name: '',
    logoUrl: '',
    place: '',
    daysOfClasses: [],
    startTime: '',
    endTime: '',
    classObservations: '',
    userId: ''
  })

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await api.get(`/class?id=${classId}`)
        const classData = response.data.data[0]
        setInitialValues({
          name: classData.name,
          logoUrl: classData.logoUrl,
          place: classData.place,
          daysOfClasses: classData.daysOfClasses.split(', '),
          startTime: classData.startTime,
          endTime: classData.endTime,
          classObservations: classData.classObservations,
          userId:
            classData.userClasses.length > 0
              ? classData.userClasses[0].user.id
              : ''
        })
      } catch (error) {
        console.error('Failed to fetch class data', error)
      }
    }
    fetchClass()
  }, [classId])

  const formik = useFormik<UpdateClassFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Nome da classe é obrigatório'),
      logoUrl: Yup.mixed().nullable(),
      place: Yup.string(),
      daysOfClasses: Yup.array()
        .of(Yup.string())
        .min(1, 'Selecione ao menos um dia'),
      startTime: Yup.string(),
      endTime: Yup.string(),
      classObservations: Yup.string(),
      userId: Yup.string().required('Selecione pelo menos um professor')
    }),
    onSubmit: async (values) => {
      try {
        if (classId) {
          const formData = new FormData()
          formData.append('name', values.name)
          if (values.logoUrl && typeof values.logoUrl === 'object') {
            formData.append('logo', values.logoUrl)
          }
          formData.append('place', values.place)
          formData.append('daysOfClasses', values.daysOfClasses.join(', '))
          formData.append('startTime', values.startTime)
          formData.append('endTime', values.endTime)
          formData.append('classObservations', values.classObservations)
          formData.append('userId', values.userId)

          await updateClassCall(classId, formData)
          toast({
            title: 'Dados da classe atualizados com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          if (onSuccess) {
            onSuccess()
          }
        } else {
          throw new Error('ID da classe está faltando')
        }
      } catch (error: any) {
        toast({
          title: 'Erro ao atualizar classe',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched
  } = formik

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFieldValue('logoUrl', file)
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDayChange = (day: string) => {
    setFieldValue(
      'daysOfClasses',
      values.daysOfClasses.includes(day)
        ? values.daysOfClasses.filter((d) => d !== day)
        : [...values.daysOfClasses, day]
    )
  }

  return (
    <form
      id="form-classes"
      ref={ref}
      onSubmit={handleSubmit}
      style={{ width: '100%' }}
    >
      <Flex
        h={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
      >
        <Flex flexDir={'column'} h={'23.62%'}>
          <Text
            fontSize={'14px'}
            fontWeight={'700'}
            letterSpacing={'-1px'}
            lineHeight={'20px'}
            mb={'5px'}
            color={'brand.gray60'}
          >
            Foto 3x4
          </Text>
          <Flex
            w={'70%'}
            h={'13.31%'}
            borderRadius={'32px'}
            border={'1px dotted'}
            borderColor={'brand.gray30'}
            p={'24px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={handleClick}
            cursor={'pointer'}
            flexDirection="column"
          >
            {values.logoUrl && typeof values.logoUrl === 'string' ? (
              <Image
                src={values.logoUrl}
                alt="Logo da Classe"
                maxW={'100%'}
                maxH={'100%'}
              />
            ) : (
              <Flex
                w={'100%'}
                h={'100%'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDir={'column'}
                cursor={'pointer'}
              >
                <Flex
                  w={'64px'}
                  h={'64px'}
                  borderRadius={'132px'}
                  bg={'brand.purple20'}
                  color={'brand.primary'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Icon as={PiFileArrowUpBold} w={'32px'} h={'32px'} />
                </Flex>
                <Flex flexDir={'row'} mt={'20px'}>
                  <ChakraText
                    mr={'3px'}
                    fontSize={'14px'}
                    fontWeight={'700'}
                    lineHeight={'20px'}
                    color={'brand.primary'}
                  >
                    Clique aqui
                  </ChakraText>
                  <ChakraText
                    fontSize={'14px'}
                    fontWeight={'700'}
                    lineHeight={'20px'}
                    color={'brand.gray60'}
                  >
                    para adicionar o arquivo.
                  </ChakraText>
                </Flex>
                <ChakraText
                  fontSize={'14px'}
                  fontWeight={'500'}
                  lineHeight={'20px'}
                  color={'brand.gray40'}
                >
                  Formatos suportados: PNG, JPG.
                </ChakraText>
              </Flex>
            )}
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Flex>
        </Flex>

        <Flex
          w={'100%'}
          h={'8.39%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'name'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Nome da Classe
            </FormLabel>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
              placeholder="Nome da Classe"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="userId" w={['45%']}>
            <SelectMenuBase
              name="userId"
              label="Selecione o Professor"
              options={teachers}
              value={values.userId}
              onChange={(value) => setFieldValue('userId', value)}
              onBlur={handleBlur}
              isInvalid={touched.userId && !!errors.userId}
            />
            {touched.userId && errors.userId ? (
              <ChakraText color="red.500" mt={2}>
                {errors.userId}
              </ChakraText>
            ) : null}
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'8.39%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'RG'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Local
            </FormLabel>
            <Input
              name="place"
              value={values.place}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.place}
              error={errors.place}
              placeholder="Insira o local da oficina!"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={500}
            />
          </FormControl>
          <Flex w={'45%'} />
        </Flex>
        <Flex justifyContent={'flex-start'} alignItems={'flex-end'} h={'2.21%'}>
          <Text fontSize={'14px'} fontWeight={700}>
            Dias da Classe
          </Text>
        </Flex>
        <Flex
          w={'100%'}
          h={'2.43%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'12.90%'}
            name="Segunda"
            isChecked={values.daysOfClasses.includes('Segunda')}
            onChange={() => handleDayChange('Segunda')}
          >
            Segunda
          </CheckBox>
          <CheckBox
            w={'9.31%'}
            name="Terça"
            isChecked={values.daysOfClasses.includes('Terça')}
            onChange={() => handleDayChange('Terça')}
          >
            Terça
          </CheckBox>
          <CheckBox
            w={'10.90%'}
            name="Quarta"
            isChecked={values.daysOfClasses.includes('Quarta')}
            onChange={() => handleDayChange('Quarta')}
          >
            Quarta
          </CheckBox>
          <CheckBox
            w={'10.64%'}
            name="Quinta"
            isChecked={values.daysOfClasses.includes('Quinta')}
            onChange={() => handleDayChange('Quinta')}
          >
            Quinta
          </CheckBox>
          <CheckBox
            w={'9.57%'}
            name="Sexta"
            isChecked={values.daysOfClasses.includes('Sexta')}
            onChange={() => handleDayChange('Sexta')}
          >
            Sexta
          </CheckBox>
          <CheckBox
            w={'11.84%'}
            name="Sábado"
            isChecked={values.daysOfClasses.includes('Sábado')}
            onChange={() => handleDayChange('Sábado')}
          >
            Sábado
          </CheckBox>
          <CheckBox
            w={'13.16%'}
            name="Domingo"
            isChecked={values.daysOfClasses.includes('Domingo')}
            onChange={() => handleDayChange('Domingo')}
          >
            Domingo
          </CheckBox>
        </Flex>
        <Flex
          w={'100%'}
          h={'8.39%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'startTime'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Horário de Início
            </FormLabel>
            <Input
              as={InputMask}
              mask="99:99"
              maskChar={null}
              type="text"
              name="startTime"
              value={values.startTime}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.startTime}
              error={errors.startTime}
              placeholder="00:00"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="endTime" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Horário do Fim
            </FormLabel>
            <Input
              as={InputMask}
              mask="99:99"
              maskChar={null}
              alignItems={'center'}
              justifyContent={'center'}
              value={values.endTime}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.endTime}
              error={errors.endTime}
              placeholder="00:00"
              mt={'5px'}
              fontSize={'16px'}
              name="endTime"
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'13.25%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={'25px'}
        >
          <FormControl id="classObservations" w={['100%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Observações
            </FormLabel>
            <Textarea
              name="classObservations"
              value={values.classObservations}
              onChange={handleChange}
              onBlur={handleBlur}
              minH={'100px'}
              maxH={'200px'}
              borderColor={'brand.gray30'}
              size={'md'}
              focusBorderColor="brand.primary"
              borderRadius="24px"
              placeholder="Adicione aqui observações sobre o classe"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
})
