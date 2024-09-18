import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'
import { Ethnicity } from '@/app/enums/enums'

interface EthnicitySelectMenuProps {
  value: string
  onChange: (value: string) => void
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
}

export const EthnicitySelectMenu: React.FC<EthnicitySelectMenuProps> = ({
  value,
  onChange,
  isInvalid,
  onBlur
}) => {
  const options = Object.values(Ethnicity).map((ethnicity) => ({
    label: ethnicity,
    value: ethnicity
  }))

  return (
    <SelectMenuBase
      label="Etnia"
      name="ethnicity"
      options={options}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      onBlur={onBlur}
    />
  )
}
