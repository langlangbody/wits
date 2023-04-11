import { install as gridInstall } from '@mctech/vue3-kaka-grid'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  gridInstall(app)
}
