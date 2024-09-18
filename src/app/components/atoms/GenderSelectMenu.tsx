import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'
import { Gender } from '@/app/enums/enums'

interface GenderSelectMenuProps {
  value: string
  onChange: (value: string) => void
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
}

export const GenderSelectMenu: React.FC<GenderSelectMenuProps> = ({
  value,
  onChange,
  isInvalid,
  onBlur
}) => {
  const options = Object.values(Gender).map((gender) => ({
    label: gender === 'MALE' ? 'Masculino' : 'Feminino',
    value: gender
  }))

  return (
    <SelectMenuBase
      label="Gênero"
      name="gender"
      options={options}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      onBlur={onBlur}
    />
  )
}
