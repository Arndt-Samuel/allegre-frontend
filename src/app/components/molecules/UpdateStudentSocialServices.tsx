import React, { useEffect, useState } from 'react'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Input from './Input'
import { Text } from '../atoms'
import CheckBox from './Checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  createSocialServiceCall,
  updateSocialServiceCall
} from '@/app/api/student'
import { api } from '@/app/api'

interface UpdateSocialServiceFormValues {
  receive_visit: boolean
  register_CRAS: boolean
  relative_in_prision: boolean
  family_at_institution_before: boolean
  project_name: string
  project_year: string
  family_scholarship: boolean
  accompanied_by_CREAS: boolean
  accompanied_by_CAPSAD: boolean
  accompanied_by_CAPSI: boolean
}

interface UpdateSocialServiceFormProps {
  studentId: string
  onSuccess?: () => void
}

export const UpdateStudentSocialServicesForm: React.FC<
  UpdateSocialServiceFormProps
> = ({ studentId, onSuccess }) => {
  const toast = useToast()
  const [initialValues, setInitialValues] =
    useState<UpdateSocialServiceFormValues>({
      receive_visit: false,
      register_CRAS: false,
      relative_in_prision: false,
      family_at_institution_before: false,
      project_name: '',
      project_year: '',
      family_scholarship: false,
      accompanied_by_CREAS: false,
      accompanied_by_CAPSAD: false,
      accompanied_by_CAPSI: false
    })
  const [socialServiceId, setSocialServiceId] = useState<string | null>(null)

  const [
    isFamilyAtInstitutionBeforeChecked,
    setIsFamilyAtInstitutionBeforeChecked
  ] = useState(false)

  useEffect(() => {
    const fetchSocialService = async () => {
      try {
        const response = await api.get(`/student_social_service/${studentId}`)
        const socialService = response.data?.[0]
        if (socialService) {
          setSocialServiceId(socialService.id)
          setInitialValues({
            receive_visit: socialService.receive_visit,
            register_CRAS: socialService.register_CRAS,
            relative_in_prision: socialService.relative_in_prision,
            family_at_institution_before:
              socialService.family_at_institution_before,
            project_name: socialService.project_name,
            project_year: socialService.project_year,
            family_scholarship: socialService.family_scholarship,
            accompanied_by_CREAS: socialService.accompanied_by_CREAS,
            accompanied_by_CAPSAD: socialService.accompanied_by_CAPSAD,
            accompanied_by_CAPSI: socialService.accompanied_by_CAPSI
          })
          setIsFamilyAtInstitutionBeforeChecked(
            socialService.family_at_institution_before
          )
        }
      } catch (error) {
        console.error('Failed to fetch social service', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar os serviços sociais do aluno. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchSocialService()
  }, [studentId, toast])

  const formik = useFormik<UpdateSocialServiceFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      receive_visit: Yup.boolean().required(
        'Família deseja receber visita é obrigatório'
      ),
      register_CRAS: Yup.boolean().required(
        'Família Cadastrada no CRAS é obrigatório'
      ),
      relative_in_prision: Yup.boolean().required(
        'Possui algum parente em sistema carcerário é obrigatório'
      ),
      family_at_institution_before: Yup.boolean().required(
        'Família já foi atendida na instituição é obrigatório'
      ),
      project_name: Yup.string(),
      project_year: Yup.string(),
      family_scholarship: Yup.boolean().required(
        'Recebe bolsa família é obrigatório'
      ),
      accompanied_by_CREAS: Yup.boolean().required(
        'Acompanhada pelo CREAS é obrigatório'
      ),
      accompanied_by_CAPSAD: Yup.boolean().required(
        'Acompanhada pelo CAPSAD é obrigatório'
      ),
      accompanied_by_CAPSI: Yup.boolean().required(
        'Acompanhada pelo CAPSI é obrigatório'
      )
    }),
    onSubmit: async (values) => {
      try {
        if (socialServiceId) {
          await updateSocialServiceCall(socialServiceId, values)
          toast({
            title: 'Serviços sociais do aluno atualizados com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        } else {
          await createSocialServiceCall({ ...values, studentId })
          toast({
            title: 'Serviços sociais do aluno criados com sucesso!',
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
          title: 'Erro ao salvar serviços sociais do aluno',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    formik

  return (
    <form
      id="form-social-service"
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
        gap={'16px'}
      >
        <Flex w={'100%'} h={'14.06%'}>
          <Text.CardTitle>Serviços Sociais</Text.CardTitle>
        </Flex>
        <Flex
          w={'100%'}
          h={'23.96%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'28.87%'}
            name="receive_visit"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.receive_visit)}
            isChecked={values.receive_visit}
            isInvalid={touched.receive_visit && !!errors.receive_visit}
          >
            Família deseja receber visita?
          </CheckBox>
          <CheckBox
            w={'28.87%'}
            name="register_CRAS"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.register_CRAS)}
            isChecked={values.register_CRAS}
            isInvalid={touched.register_CRAS && !!errors.register_CRAS}
          >
            Família Cadastrada no CRAS?
          </CheckBox>
          <CheckBox
            w={'28.87%'}
            name="relative_in_prision"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.relative_in_prision)}
            isChecked={values.relative_in_prision}
            isInvalid={
              touched.relative_in_prision && !!errors.relative_in_prision
            }
          >
            Possui algum parente em sistema carcerário?
          </CheckBox>
        </Flex>
        <Flex
          w={'100%'}
          h={'38.28%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'28.87%'}
            name="family_at_institution_before"
            onBlur={handleBlur}
            value={String(values.family_at_institution_before)}
            isChecked={values.family_at_institution_before}
            isInvalid={
              touched.family_at_institution_before &&
              !!errors.family_at_institution_before
            }
            onChange={(e) => {
              handleChange(e)
              setIsFamilyAtInstitutionBeforeChecked(e.target.checked)
            }}
          >
            Família já foi atendida na instituição?
          </CheckBox>
          <FormControl w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Nome do Projeto
            </FormLabel>
            <Input
              type="text"
              placeholder="Nome do Projeto"
              mt={'5px'}
              fontSize={'16px'}
              name="project_name"
              value={values.project_name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.project_name && !!errors.project_name}
              disabled={!isFamilyAtInstitutionBeforeChecked}
            />
          </FormControl>
          <FormControl w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Ano
            </FormLabel>
            <Input
              type="text"
              placeholder="Ano de em que participou do projeto"
              mt={'5px'}
              fontSize={'16px'}
              name="project_year"
              value={values.project_year}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.project_year && !!errors.project_year}
              disabled={!isFamilyAtInstitutionBeforeChecked}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'23.96%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'25.07%'}
            name="family_scholarship"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.family_scholarship)}
            isChecked={values.family_scholarship}
            isInvalid={
              touched.family_scholarship && !!errors.family_scholarship
            }
          >
            Recebe bolsa família?
          </CheckBox>
          <CheckBox
            w={'25.07%'}
            name="accompanied_by_CREAS"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.accompanied_by_CREAS)}
            isChecked={values.accompanied_by_CREAS}
            isInvalid={
              touched.accompanied_by_CREAS && !!errors.accompanied_by_CREAS
            }
          >
            Acompanhada pelo CREAS?
          </CheckBox>
          <CheckBox
            w={'25.07%'}
            name="accompanied_by_CAPSAD"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.accompanied_by_CAPSAD)}
            isChecked={values.accompanied_by_CAPSAD}
            isInvalid={
              touched.accompanied_by_CAPSAD && !!errors.accompanied_by_CAPSAD
            }
          >
            Acompanhada pelo CAPSAD?
          </CheckBox>
          <CheckBox
            w={'25.07%'}
            name="accompanied_by_CAPSI"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.accompanied_by_CAPSI)}
            isChecked={values.accompanied_by_CAPSI}
            isInvalid={
              touched.accompanied_by_CAPSI && !!errors.accompanied_by_CAPSI
            }
          >
            Acompanhada pelo CAPSI?
          </CheckBox>
        </Flex>
      </Flex>
    </form>
  )
}
