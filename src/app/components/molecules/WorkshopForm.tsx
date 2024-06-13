import React, { useState } from 'react'
import {
  Flex,
  IconButton,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { Text, SelectMenu } from '../atoms'
import { PiPlusCircleBold, PiMinusCircleBold } from 'react-icons/pi'

export const WorkshopForm: React.FC = () => {
  const [workshops, setWorkshops] = useState([
    { id: 1, selectedOption: '', dateOfEntry: '', dateOfExit: '' }
  ])
  const [nextWorkshopId, setNextWorkshopId] = useState(2)

  const addWorkshop = () => {
    setWorkshops([
      ...workshops,
      {
        id: nextWorkshopId,
        selectedOption: '',
        dateOfEntry: '',
        dateOfExit: ''
      }
    ])
    setNextWorkshopId(nextWorkshopId + 1)
  }

  const removeWorkshop = (id: number) => {
    setWorkshops(workshops.filter((workshop) => workshop.id !== id))
  }

  const handleSelectChange = (id: number, option: string) => {
    setWorkshops(
      workshops.map((workshop) =>
        workshop.id === id ? { ...workshop, selectedOption: option } : workshop
      )
    )
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    setWorkshops(
      workshops.map((workshop) =>
        workshop.id === id ? { ...workshop, [field]: value } : workshop
      )
    )
  }
  return (
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
          key={workshop.id}
          w={'100%'}
          h={'46.34%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={4}
        >
          <SelectMenu
            label="Oficinas"
            options={['Arte', 'Basketball', 'Música']}
            selectedOption={workshop.selectedOption}
            onSelect={(option) => handleSelectChange(workshop.id, option)}
          />
          <FormControl id={`dateOfEntry-${workshop.id}`} w={['28.87%']}>
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
              // value={values.dateOfEntry}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // touched={touched.dateOfEntry}
              // error={errors.dateOfEntry}
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={workshop.dateOfEntry}
              onChange={(e) =>
                handleInputChange(workshop.id, 'dateOfEntry', e.target.value)
              }
            />
          </FormControl>
          <FormControl id={`dateOfExit-${workshop.id}`} w={['28.87%']}>
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
              // value={values.dateOfExit}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // touched={touched.dateOfExit}
              // error={errors.dateOfExit}
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={workshop.dateOfExit}
              onChange={(e) =>
                handleInputChange(workshop.id, 'dateOfExit', e.target.value)
              }
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
              onClick={() => removeWorkshop(workshop.id)}
              mt={'24px'}
            />
          )}
        </Flex>
      ))}
    </Flex>
  )
}
