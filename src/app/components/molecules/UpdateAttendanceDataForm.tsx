import React, { useRef, useEffect, useState, forwardRef } from 'react'
import {
  Flex,
  Text,
  Checkbox,
  Avatar,
  Image,
  Icon,
  useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PiFileArrowUpBold } from 'react-icons/pi'
import { api } from '@/app/api'
import Input from './Input'
import { Button } from '../atoms'
import { UpdateAttendanceClassFormValues } from '@/app/api/class'

interface Student {
  id: string
  name: string
  avatarUrl: string
}

interface UpdateAttendanceDataFormProps {
  classAttendanceId: string
  onSave: (data: FormData) => void
  onClose: () => void
}

export const UpdateAttendanceDataForm = forwardRef<
  HTMLFormElement,
  UpdateAttendanceDataFormProps
>(({ classAttendanceId, onSave, onClose }, ref) => {
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})
  const [dateOfClass, setDateOfClass] = useState<string>('')
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null)
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [initialValues, setInitialValues] =
    useState<UpdateAttendanceClassFormValues>({
      classAttendanceId,
      dateOfClass,
      photoUrl: null,
      students: []
    })

  const formatDateToBR = (dateString: string): string => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await api.get(
          `/class-attendance/range?id=${classAttendanceId}`
        )

        const attendanceData = response.data.data[0]

        if (attendanceData) {
          setDateOfClass(formatDateToBR(attendanceData.dateOfClass))
          setExistingPhotoUrl(attendanceData.photoUrl)

          const studentsMapped = attendanceData.attendanceDetails.map(
            (detail: any) => ({
              id: detail.studentId,
              name: detail.student.name,
              avatarUrl: detail.student.avatarUrl || '',
              isPresent: detail.isPresent,
              observations: detail.observations || ''
            })
          )

          setStudents(studentsMapped)

          const attendanceMapped = attendanceData.attendanceDetails.reduce(
            (acc: Record<string, boolean>, detail: any) => {
              acc[detail.studentId] = detail.isPresent
              return acc
            },
            {}
          )
          setAttendance(attendanceMapped)

          setInitialValues({
            classAttendanceId,
            dateOfClass: attendanceData.dateOfClass,
            photoUrl: attendanceData.photoUrl || '',
            students: studentsMapped.map((student: any) => ({
              studentId: student.id,
              isPresent: student.isPresent,
              observations: student.observations || ''
            }))
          })
        }
      } catch (error) {
        console.error('Erro ao buscar dados da presença:', error)
      }
    }

    fetchAttendanceData()
  }, [classAttendanceId])

  const formik = useFormik<UpdateAttendanceClassFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      photoUrl: Yup.mixed().nullable(),
      students: Yup.array().of(
        Yup.object().shape({
          studentId: Yup.string().uuid().required('ID do aluno é obrigatório'),
          isPresent: Yup.boolean().required('Status de presença é obrigatório'),
          observations: Yup.string().nullable()
        })
      )
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData()
        formData.append('classAttendanceId', values.classAttendanceId)

        if (values.photoUrl instanceof File) {
          formData.append('photo', values.photoUrl)
        }

        formData.append(
          'students',
          JSON.stringify(
            values.students.map((student) => ({
              studentId: student.studentId,
              isPresent: student.isPresent,
              observations: student.observations || ''
            }))
          )
        )

        await onSave(formData)

        toast({
          title: 'Presença registrada com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })

        onClose()
      } catch (error: any) {
        toast({
          title: 'Erro ao salvar a presença',
          description: error.message || 'Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formik.setFieldValue('photoUrl', file)
      setExistingPhotoUrl(null)
    }
  }

  const handleToggleAll = (isPresent: boolean) => {
    const newAttendance = students.reduce(
      (acc, student) => {
        acc[student.id] = isPresent
        return acc
      },
      {} as Record<string, boolean>
    )

    setAttendance(newAttendance)

    formik.setFieldValue(
      'students',
      students.map((student) => ({
        studentId: student.id,
        isPresent: isPresent,
        observations: ''
      }))
    )
  }

  const handleToggleAttendance = (studentId: string, isPresent: boolean) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: isPresent
    }))

    formik.setFieldValue(
      'students',
      formik.values.students.map((student) =>
        student.studentId === studentId ? { ...student, isPresent } : student
      )
    )
  }

  return (
    <form
      id="form-update-attendance"
      onSubmit={formik.handleSubmit}
      ref={ref}
      style={{ width: '100%' }}
    >
      <Flex w="45%">
        <Input type="text" name="dateOfClass" value={dateOfClass} readOnly />
      </Flex>

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
            Foto
          </Text>
          <Flex
            w="70%"
            h="13.31%"
            borderRadius="32px"
            border="1px dotted"
            borderColor="brand.gray30"
            p="24px"
            alignItems="center"
            justifyContent="center"
            onClick={() => fileInputRef.current?.click()}
            cursor="pointer"
            flexDirection="column"
          >
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {existingPhotoUrl ? (
              <Image
                src={existingPhotoUrl}
                alt="Imagem existente"
                maxW="100%"
                maxH="100%"
              />
            ) : formik.values.photoUrl &&
              typeof formik.values.photoUrl === 'object' ? (
              <Image
                src={URL.createObjectURL(formik.values.photoUrl as File)}
                alt="Prévia da Imagem"
                maxW="100%"
                maxH="100%"
              />
            ) : (
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="flex-start"
                flexDir="column"
                cursor="pointer"
              >
                <Flex
                  w="64px"
                  h="64px"
                  borderRadius="132px"
                  bg="brand.purple20"
                  color="brand.primary"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={PiFileArrowUpBold} w="32px" h="32px" />
                </Flex>
                <Flex flexDir="row" mt="20px">
                  <Text
                    mr="3px"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="20px"
                    color="brand.primary"
                  >
                    Clique aqui
                  </Text>
                  <Text
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="20px"
                    color="brand.gray60"
                  >
                    para adicionar o arquivo.
                  </Text>
                </Flex>
                <Text
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="20px"
                  color="brand.gray40"
                >
                  Formatos suportados: PNG, JPG.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex
          w={'90%'}
          minH={'60vh'}
          flexDir={'column'}
          border={'1px solid'}
          borderRadius={'32px'}
          borderColor={'brand.gray30'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            w={'100%'}
            h={'80px'}
            pt={'16px'}
            pb={'16px'}
            pl={'24px'}
            pr={'24px'}
          >
            <Text fontSize={'24px'} fontWeight={600} w={'30%'}>
              Alunos
            </Text>
          </Flex>
          <Flex
            flexDir={'column'}
            w={'100%'}
            h={'48px'}
            bg={'brand.gray05'}
            pb={'14px'}
            pl={'24px'}
            pr={'24px'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
          >
            <Checkbox
              onChange={(event) => handleToggleAll(event.target.checked)}
            >
              Selecionar alunos
            </Checkbox>
            <Text>Clique nos alunos presentes na classe</Text>
          </Flex>
          <Flex flexDir="column" overflowY="auto" maxH="50vh">
            {students.map((student, index) => (
              <Flex
                key={`${student.id}-${index}`}
                flexDir={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                w={'100%'}
                h={'72px'}
                pt={'12px'}
                pb={'12px'}
                pl={'24px'}
                pr={'24px'}
                borderTop={'solid 1px'}
                borderBottom={'solid 1px'}
                borderColor={'brand.gray20'}
              >
                <Flex alignItems={'center'} justifyContent={'flex-start'}>
                  <Checkbox
                    isChecked={attendance[student.id]}
                    onChange={(event) =>
                      handleToggleAttendance(student.id, event.target.checked)
                    }
                  />
                </Flex>
                <Flex
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  ml="10px"
                >
                  <Avatar
                    w={'40px'}
                    h={'40px'}
                    borderRadius={'76px'}
                    backgroundSize="cover"
                    src={student.avatarUrl}
                  />
                  <Text
                    color={'brand.gray60'}
                    fontSize={'14px'}
                    fontWeight={'700'}
                    ml={'5px'}
                  >
                    {student.name}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        alignItems={'center'}
        justifyContent={'flex-end'}
        h={'4.41%'}
        w={'100%'}
        mt="24px"
      >
        <Button
          w={'18.90%'}
          h={'48px'}
          color={'brand.primary'}
          bg={'brand.white'}
          _hover={{ bg: 'red', color: 'brand.white', borderColor: 'red' }}
          border={'1px solid'}
          borderColor={'brand.primary'}
          fontSize={'16px'}
          fontWeight={700}
          mr={3}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          w={'18.90%'}
          h={'48px'}
          color={'brand.white'}
          border={'1px solid'}
          _hover={{ bg: 'brand.purple50', color: 'brand.purple20' }}
          fontSize={'16px'}
          fontWeight={700}
          type="submit"
        >
          Confirmar
        </Button>
      </Flex>
    </form>
  )
})
