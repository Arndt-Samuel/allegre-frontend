import React from 'react'
import { SelectMenuBase } from './SelectMenuBase'
import { UserRole } from '@/app/enums/enums'

interface RolesSelectMenuProps {
  value: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
  isDisabled?: boolean
  label?: string
  includeAllOption?: boolean
}

export const RolesSelectMenu: React.FC<RolesSelectMenuProps> = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  isDisabled,
  label,
  includeAllOption = false
}) => {
  const options: { label: string; value: string }[] = Object.values(
    UserRole
  ).map((role) => ({
    label: role,
    value: role
  }))

  if (includeAllOption) {
    options.unshift({ label: 'Todos os Cargos', value: '' })
  }

  return (
    <SelectMenuBase
      label={label}
      name="role"
      options={options}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      onBlur={onBlur}
      isDisabled={isDisabled}
    />
  )
}
