import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'

interface MaritalStatusSelectMenuProps {
  value: string
  onChange: (value: string) => void
  onBlur?: (event: React.FocusEvent<any>) => void
  isInvalid?: boolean
}

export const MaritalStatusSelectMenu: React.FC<
  MaritalStatusSelectMenuProps
> = ({ value, onChange, onBlur, isInvalid }) => {
  const maritalStatusOptions = [
    { label: 'Solteiro', value: 'Solteiro' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viúvo', value: 'Viúvo' }
  ]

  return (
    <SelectMenuBase
      name="marital_status"
      label="Estado Civil"
      options={maritalStatusOptions}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
  )
}
