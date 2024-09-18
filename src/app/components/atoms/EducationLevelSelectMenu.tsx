import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'
import { EducationLevel } from '@/app/enums/enums'

interface EducationLevelSelectMenuProps {
  value: string
  onChange: (value: string) => void
  onBlur?: (event: React.FocusEvent<any>) => void
  isInvalid?: boolean
}

export const EducationLevelSelectMenu: React.FC<
  EducationLevelSelectMenuProps
> = ({ value, onChange, onBlur, isInvalid }) => {
  const options = Object.values(EducationLevel).map((level) => ({
    label: level.replace(/_/g, ' '),
    value: level
  }))

  return (
    <SelectMenuBase
      name="education_level"
      label="Escolaridade"
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
  )
}
