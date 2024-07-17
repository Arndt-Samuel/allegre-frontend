import React, { useState } from 'react'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Input from './Input'
import { Text } from '../atoms'
import CheckBox from './Checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CreateSocialServiceCall } from '@/app/api/student'

interface SocialServiceFormValues {
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
  studentId: string
}

interface SocialServiceFormProps {
  studentId: string
  onSubmit: (values: SocialServiceFormValues) => Promise<void>
  savedData?: SocialServiceFormValues | null
}

export const StudentSocialServicesForm: React.FC<SocialServiceFormProps> = ({
  studentId,
  onSubmit,
  savedData
}) => {
  const toast = useToast()

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<SocialServiceFormValues>({
      initialValues: {
        receive_visit: savedData?.receive_visit || false,
        register_CRAS: savedData?.register_CRAS || false,
        relative_in_prision: savedData?.relative_in_prision || false,
        family_at_institution_before:
          savedData?.family_at_institution_before || false,
        project_name: savedData?.project_name || '',
        project_year: savedData?.project_year || '',
        family_scholarship: savedData?.family_scholarship || false,
        accompanied_by_CREAS: savedData?.accompanied_by_CREAS || false,
        accompanied_by_CAPSAD: savedData?.accompanied_by_CAPSAD || false,
        accompanied_by_CAPSI: savedData?.accompanied_by_CAPSI || false,
        studentId: studentId
      },
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
          await CreateSocialServiceCall(values)
          onSubmit(values)
        } catch (error: any) {
          toast({
            title: 'Erro ao criar serviços sociais',
            description: error.message || 'Ocorreu um erro, tente novamente.',
            status: 'error',
            duration: 9000,
            isClosable: true
          })
        }
      }
    })

  const [
    HasFamilyServedAlreadyAtInstitutionBeforeChecked,
    setHasFamilyServedAlreadyAtInstitutionBeforeChecked
  ] = useState(false)

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
            isInvalid={
              touched.family_at_institution_before &&
              !!errors.family_at_institution_before
            }
            onChange={(e) => {
              handleChange(e)
              setHasFamilyServedAlreadyAtInstitutionBeforeChecked(
                e.target.checked
              )
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
              disabled={!HasFamilyServedAlreadyAtInstitutionBeforeChecked}
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
              disabled={!HasFamilyServedAlreadyAtInstitutionBeforeChecked}
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
