import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Button } from '../atoms'
import { PiPencilSimpleBold } from 'react-icons/pi'
import { UpdateClassForm } from './UpdateClassForm'
import { api } from '@/app/api'

interface ClassCardProps {
  classData: {
    id: string
    name: string
    logoUrl: string
    place: string
    daysOfClasses: string
    startTime: string
    endTime: string
    classObservations: string
    responsibleClass: string
  }
}

export const ClassCardInformation: React.FC<ClassCardProps> = ({
  classData
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updatedClassData, setUpdatedClassData] = useState(classData)

  const handleSuccess = async () => {
    const response = await api.get(`/class?id=${classData.id}`)
    const updatedClass = response.data.data[0]
    setUpdatedClassData(updatedClass)
    onClose()
  }

  useEffect(() => {
    setUpdatedClassData(classData)
  }, [classData])

  return (
    <Flex
      flexDir={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      w={'100%'}
      h={'72px'}
      pt={'12px'}
      pb={'12px'}
      pl={'24px'}
      pr={'24px'}
    >
      <Flex alignItems={'center'} justifyContent={'flex-start'} w={'4.39%'}>
        <Avatar
          w={'40px'}
          h={'40px'}
          borderRadius={'76px'}
          backgroundImage={`url($)`}
          src={updatedClassData.logoUrl}
          backgroundSize="cover"
        />
      </Flex>
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        w={'11.84%'}
      >
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
          Nome da Classe
        </Text>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          mt={'5px'}
        >
          {updatedClassData.name}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        w={'13.60%'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
          Responsável
        </Text>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          mt={'5px'}
        >
          {updatedClassData.responsibleClass}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        w={'7.35%'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
          Local
        </Text>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          mt={'5px'}
        >
          {updatedClassData.place}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        w={'10.63%'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
          Dias da Classe
        </Text>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          mt={'5px'}
        >
          {updatedClassData.daysOfClasses}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        w={'11.29%'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
          Horário
        </Text>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          mt={'5px'}
        >
          {updatedClassData.startTime} - {updatedClassData.endTime}
        </Text>
      </Flex>
      <Flex w={'40.91%'} alignItems={'center'} justifyContent={'flex-end'}>
        <Button
          w={'116px'}
          h={'48px'}
          bg={'brand.purple05'}
          color={'brand.primary'}
          _hover={{
            bg: 'brand.purple50',
            color: 'brand.purple20'
          }}
          fontSize={'16px'}
          fontWeight={700}
          leftIcon={<PiPencilSimpleBold />}
          onClick={onOpen}
        >
          Editar
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'xl'}
          blockScrollOnMount={true}
        >
          <ModalOverlay />
          <ModalContent
            borderRadius={'32px'}
            gap={'10px'}
            p={'24px'}
            maxW="800px"
          >
            <Text
              h={'3.09%'}
              fontSize={'20px'}
              fontWeight={'800'}
              color={'brand.gray80'}
            >
              Atualizar Classe
            </Text>
            <Text
              h={'2.87%'}
              fontSize={'16px'}
              fontWeight={'400'}
              color={'brand.gray60'}
            >
              Insira abaixo os dados da classe
            </Text>
            <ModalCloseButton />
            <ModalBody h={'100%'}>
              <UpdateClassForm
                classId={classData.id}
                onSuccess={handleSuccess}
              />
              <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                h={'4.41%'}
                w={'100%'}
              >
                <Button
                  w={'18.90%'}
                  h={'48px'}
                  color={'brand.primary'}
                  bg={'brand.white'}
                  _hover={{
                    bg: 'red',
                    color: 'brand.white',
                    borderColor: 'red'
                  }}
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
                  _hover={{
                    bg: 'brand.purple50',
                    color: 'brand.purple20'
                  }}
                  fontSize={'16px'}
                  fontWeight={700}
                  form="form-classes"
                  type="submit"
                >
                  Confirmar
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  )
}
