import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
export const storageCustomSites = useStorageLocal('fugon-custom-sites', [], { listenToStorageChanges: true })
