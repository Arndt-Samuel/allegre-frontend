import React, { useState, useEffect } from 'react'
import {
  Flex,
  IconButton,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react'
import Input from './Input'
import { Text, SelectMenu } from '../atoms'
import { PiPlusCircleBold, PiMinusCircleBold } from 'react-icons/pi'
import { useFormik, FormikErrors } from 'formik'
import * as Yup from 'yup'
import { getWorkshops, CreateWorkshopCall } from '@/app/api/student'
import { parse, isValid, format } from 'date-fns'

interface WorkshopFormValues {
  classId: string
  dateOfEntry: string
  dateOfExit: string | null
  studentIds: string[]
}

interface SchoolDataFormProps {
  studentId: string
  onSubmit: (values: WorkshopFormValues[]) => Promise<void>
  savedData?: WorkshopFormValues[] | null
}

interface WorkshopOption {
  id: string
  name: string
}

export const WorkshopForm: React.FC<SchoolDataFormProps> = ({
  studentId,
  onSubmit,
  savedData
}) => {
  const toast = useToast()
  const [workshopOptions, setWorkshopOptions] = useState<WorkshopOption[]>([])

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const workshops = await getWorkshops()
        setWorkshopOptions(workshops)
      } catch (error) {
        toast({
          title: 'Erro ao carregar oficinas',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }

    fetchWorkshops()
  }, [toast])

  const [workshops, setWorkshops] = useState<WorkshopFormValues[]>(
    savedData || [
      {
        classId: '',
        dateOfEntry: '',
        dateOfExit: null,
        studentIds: [studentId]
      }
    ]
  )

  const formik = useFormik({
    initialValues: {
      workshops
    },
    validationSchema: Yup.object().shape({
      workshops: Yup.array().of(
        Yup.object().shape({
          classId: Yup.string()
            .required('Oficina é obrigatória')
            .matches(
              /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
              'classId must be a valid UUID'
            ),
          dateOfEntry: Yup.date().required(
            'Data de entrada no projeto é obrigatória'
          ),
          dateOfExit: Yup.date().nullable(),
          studentIds: Yup.array()
            .of(
              Yup.string().matches(
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
                'each value in studentIds must be a valid UUID'
              )
            )
            .required('studentIds é obrigatório')
        })
      )
    }),
    onSubmit: async (values) => {
      const formattedValues = values.workshops.map((workshop) => {
        const parsedDateOfEntry = parse(
          workshop.dateOfEntry,
          'yyyy-MM-dd',
          new Date()
        )
        const parsedDateOfExit = workshop.dateOfExit
          ? parse(workshop.dateOfExit, 'yyyy-MM-dd', new Date())
          : null

        if (!isValid(parsedDateOfEntry)) {
          toast({
            title: 'Erro na data de entrada',
            description: 'Data de entrada inválida',
            status: 'error',
            duration: 9000,
            isClosable: true
          })
          throw new Error('Data de entrada inválida')
        }

        if (
          workshop.dateOfExit &&
          parsedDateOfExit &&
          !isValid(parsedDateOfExit)
        ) {
          toast({
            title: 'Erro na data de saída',
            description: 'Data de saída inválida',
            status: 'error',
            duration: 9000,
            isClosable: true
          })
          throw new Error('Data de saída inválida')
        }

        const formattedDateOfEntry = format(
          parsedDateOfEntry,
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        )
        const formattedDateOfExit = parsedDateOfExit
          ? format(parsedDateOfExit, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
          : null

        return {
          date_of_entry: formattedDateOfEntry,
          date_of_exit: formattedDateOfExit,
          classId: workshop.classId,
          studentIds: [studentId]
        }
      })

      for (const value of formattedValues) {
        await CreateWorkshopCall(value)
      }

      toast({
        title: 'Oficina atribuída com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    }
  })

  const addWorkshop = () => {
    const newWorkshop = {
      classId: '',
      dateOfEntry: '',
      dateOfExit: null,
      studentIds: [studentId]
    }
    const updatedWorkshops = [...workshops, newWorkshop]
    setWorkshops(updatedWorkshops)
    formik.setFieldValue('workshops', updatedWorkshops)
  }

  const removeWorkshop = (index: number) => {
    const updatedWorkshops = workshops.filter((_, i) => i !== index)
    setWorkshops(updatedWorkshops)
    formik.setFieldValue('workshops', updatedWorkshops)
  }

  const handleWorkshopChange = (index: number, field: string, value: any) => {
    const updatedWorkshops = workshops.map((workshop, i) =>
      i === index ? { ...workshop, [field]: value } : workshop
    )
    setWorkshops(updatedWorkshops)
    formik.setFieldValue('workshops', updatedWorkshops)
  }

  return (
    <form
      id="form-workshop"
      onSubmit={formik.handleSubmit}
      style={{ width: '84%' }}
    >
      <Flex
        w={'84%'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
        p={'24px'}
        justifyContent={'space-between'}
        mt={'16px'}
        gap={'16px'}
      >
        <Flex w={'100%'} h={'19.51%'}>
          <Text.CardTitle>Oficinas</Text.CardTitle>
        </Flex>
        {workshops.map((workshop, index) => (
          <Flex
            key={index}
            w={'100%'}
            h={'46.34%'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={4}
          >
            <FormControl w={'28.87%'}>
              <SelectMenu
                name={`workshops[${index}].classId`}
                value={workshop.classId}
                onChange={(e) => {
                  const selectedClass = workshopOptions.find(
                    (workshop) => workshop.name === e.target.value
                  )
                  handleWorkshopChange(
                    index,
                    'classId',
                    selectedClass?.id || ''
                  )
                }}
                label="Oficinas"
                options={workshopOptions.map((option) => option.name)}
                selectedOption={
                  workshopOptions.find(
                    (option) => option.id === workshop.classId
                  )?.name || ''
                }
              />
            </FormControl>
            <FormControl id={`dateOfEntry-${index}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Data de entrada no projeto
              </FormLabel>
              <Input
                name={`workshops[${index}].dateOfEntry`}
                value={workshop.dateOfEntry}
                onChange={(e) =>
                  handleWorkshopChange(index, 'dateOfEntry', e.target.value)
                }
                onBlur={formik.handleBlur}
                error={
                  (
                    formik.errors.workshops?.[
                      index
                    ] as FormikErrors<WorkshopFormValues>
                  )?.dateOfEntry
                }
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
            </FormControl>
            <FormControl id={`dateOfExit-${index}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Data de saída do projeto
              </FormLabel>
              <Input
                name={`workshops[${index}].dateOfExit`}
                value={workshop.dateOfExit || ''}
                onChange={(e) =>
                  handleWorkshopChange(index, 'dateOfExit', e.target.value)
                }
                onBlur={formik.handleBlur}
                error={
                  (
                    formik.errors.workshops?.[
                      index
                    ] as FormikErrors<WorkshopFormValues>
                  )?.dateOfExit
                }
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
            </FormControl>
            {index === 0 ? (
              <IconButton
                aria-label="AddOficina"
                icon={<PiPlusCircleBold />}
                color="brand.primary"
                colorScheme="none"
                w={'48px'}
                h={'48px'}
                size={'lg'}
                borderRadius={'123px'}
                bg={'brand.purple20'}
                alignItems={'center'}
                justifyContent={'center'}
                mt={'24px'}
                onClick={addWorkshop}
              />
            ) : (
              <IconButton
                aria-label="RemoveOficina"
                icon={<PiMinusCircleBold />}
                color="brand.primary"
                colorScheme="none"
                w={'48px'}
                h={'48px'}
                size={'lg'}
                borderRadius={'123px'}
                bg={'brand.purple20'}
                alignItems={'center'}
                justifyContent={'center'}
                onClick={() => removeWorkshop(index)}
                mt={'24px'}
              />
            )}
          </Flex>
        ))}
      </Flex>
    </form>
  )
}
