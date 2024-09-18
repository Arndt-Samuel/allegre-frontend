import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'
import { HousingStatus } from '@/app/enums/enums'

interface HousingStatusSelectMenuProps {
  value: string
  onChange: (value: string) => void
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
}

export const HousingStatusSelectMenu: React.FC<
  HousingStatusSelectMenuProps
> = ({ value, onChange, onBlur, isInvalid }) => {
  const options = Object.values(HousingStatus).map((status) => ({
    label: status,
    value: status
  }))

  return (
    <SelectMenuBase
      name="housingStatus"
      label="Status de Moradia"
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
  )
}
