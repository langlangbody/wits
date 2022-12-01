import { install as musselInstall } from 'mussel'
import { type UserModule } from '~/types'

// Setup mussel

export const install: UserModule = ({ app }) => {
  musselInstall(app)
}
