import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'

interface DegreeOfKinshipSelectMenuProps {
  value: string
  onChange: (value: string) => void
  onBlur?: (event: React.FocusEvent<any>) => void
  isInvalid?: boolean
}

export const DegreeOfKinshipSelectMenu: React.FC<
  DegreeOfKinshipSelectMenuProps
> = ({ value, onChange, onBlur, isInvalid }) => {
  const degreeOfKinshipOptions = [
    { label: 'Pai', value: 'Pai' },
    { label: 'Mãe', value: 'Mãe' },
    { label: 'Avô', value: 'Avô' },
    { label: 'Avó', value: 'Avó' },
    { label: 'Tio', value: 'Tio' },
    { label: 'Tia', value: 'Tia' },
    { label: 'Irmão', value: 'Irmão' },
    { label: 'Irmã', value: 'Irmã' },
    { label: 'Primo', value: 'Primo' },
    { label: 'Prima', value: 'Prima' },
    { label: 'Padrasto', value: 'Padrasto' },
    { label: 'Madrasta', value: 'Madrasta' },
    { label: 'Guardião Legal', value: 'Guardião Legal' },
    { label: 'Outro', value: 'Outro' }
  ]

  return (
    <SelectMenuBase
      name="degree_of_kinship"
      label="Grau de parentesco"
      options={degreeOfKinshipOptions}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
  )
}
