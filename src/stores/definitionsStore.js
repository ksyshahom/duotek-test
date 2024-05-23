import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getDefinitions as getDefinitionsApi } from '@/dataProviders/definitionsDataProvider'

export const useDefinitionsStore = defineStore('definitions', () => {
  const companySpecializationList = useStorage('companySpecialization', [])
  const industryList = useStorage('companySpecialization', [])

  async function getDefinitions() {
    const response = await getDefinitionsApi()

    companySpecializationList.value = response.CompanySpecialization
    industryList.value = response.Industry
  }

  return {
    companySpecializationList,
    industryList,
    getDefinitions
  }
})
