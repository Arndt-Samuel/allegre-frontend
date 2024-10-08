import { UserRole } from '@/app/enums/enums'

export const userRoleDisplayMap = {
  [UserRole.SUPER_ADMIN]: 'Super Administrador',
  [UserRole.ORG_ADMIN]: 'Administrador',
  [UserRole.ORG_MEMBER]: 'Membro',
  [UserRole.ORG_TEACHER]: 'Professor'
}
