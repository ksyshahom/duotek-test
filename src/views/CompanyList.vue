<script setup>
import SearchForm from '@/components/companyCatalog/SearchForm.vue'
import FilterBlock from '@/components/companyCatalog/FilterBlock.vue'
import CompanyCard from '@/components/companyCatalog/CompanyCard.vue'
import Pagination from '@/components/companyCatalog/Pagination.vue'
import { getCompanies } from '@/dataProviders/companiesDataProvider'
import { useDefinitionsStore } from '@/stores/definitionsStore'
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

const companiesLoading = ref(true)
const companyList = ref([])
const showErrorMsg = ref(false)
const searchErrorMsg = ref('')
const companiesFilter = {
  search: '',
  industry: '',
  specialization: '',
  page: ''
}
const pagination = ref({ current: 1, length: 1, loading: true })

const getNotEmptyFilters = (filters) => {
  const result = {}

  for (const [key, value] of Object.entries(filters)) {
    if (value) result[key] = value
  }

  return result
}

const getFilteredCompanies = async (selectFilters) => {
  companiesLoading.value = true
  pagination.value.loading = true
  companiesFilter.industry = selectFilters.industry.id
  companiesFilter.specialization = selectFilters.companySpecialization.id
  searchErrorMsg.value = ''

  try {
    const response = await getCompanies({ ...getNotEmptyFilters(companiesFilter), per_page: 10 })
    companyList.value = response.data
    pagination.value.current = response.meta.current_page
    pagination.value.length = response.meta.last_page
  } catch (e) {
    if (
      e.response?.data?.errors?.search &&
      e.response?.data?.errors?.search[0] === 'The search must be at least 2 characters.'
    )
      searchErrorMsg.value = 'Введите как минимум 2 символа'
    else {
      showErrorMsg.value = true
    }
  } finally {
    companiesLoading.value = false
    pagination.value.loading = false
  }

  // if (showErrorMsg.value) return
}

const debouncedGetFilteredCompanies = useDebounceFn(getFilteredCompanies, 1000)

const definitions = useDefinitionsStore()
const definitionsLoading = ref(true)
const filterOptions = ref({
  companySpecializationList: [{ id: '', title: 'Все специализации' }],
  industryList: [{ id: '', title: 'Все отрасли' }]
})
const selectedFilter = ref({
  companySpecialization: filterOptions.value.companySpecializationList[0],
  industry: filterOptions.value.industryList[0]
})

const getDefinitions = async () => {
  definitionsLoading.value = true

  try {
    await definitions.getDefinitions()
  } catch (e) {
    showErrorMsg.value = true
  } finally {
    definitionsLoading.value = false
  }

  if (showErrorMsg.value) return

  filterOptions.value.companySpecializationList = [
    filterOptions.value.companySpecializationList[0],
    ...definitions.companySpecializationList
  ]
  filterOptions.value.industryList = [
    filterOptions.value.industryList[0],
    ...definitions.industryList
  ]

  await getFilteredCompanies(selectedFilter.value)
}

getDefinitions()

watch(
  () => selectedFilter,
  (newValue) => {
    debouncedGetFilteredCompanies(newValue.value)
  },
  { deep: true }
)

const setSearchFilter = async (search) => {
  companiesFilter.search = search
  await getFilteredCompanies(selectedFilter.value)
}

const setPageFilter = async (page) => {
  companiesFilter.page = page
  await getFilteredCompanies(selectedFilter.value)
}
</script>

<template>
  <section class="container-self company-catalog">
    <h1 class="heading1">Каталог компаний</h1>
    <div v-if="showErrorMsg">Error!!!</div>
    <div v-else class="company-catalog__wrapper">
      <FilterBlock
        class="company-catalog__filter"
        :loading="definitionsLoading || companiesLoading"
        v-model="selectedFilter"
        :filters="filterOptions"
      />
      <div class="company-catalog__search-and-list">
        <SearchForm
          class="company-catalog__search"
          @submit-search="setSearchFilter"
          :error="searchErrorMsg"
        />
        <div v-if="companiesLoading">loading...</div>
        <ul class="company-catalog__list" v-else>
          <li v-for="company of companyList" :key="company.id">
            <CompanyCard :company="company" />
          </li>
        </ul>
      </div>
    </div>
    <Pagination
      v-if="!showErrorMsg"
      class="company-catalog__pagination"
      v-model="pagination.current"
      :length="pagination.length"
      :loading="pagination.loading"
      @update:modelValue="setPageFilter"
    />
  </section>
</template>

<style lang="scss">
.company-catalog {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 24px;

    @media (min-width: $desktop-width) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  &__search-and-list {
    @media (min-width: $desktop-width) {
      grid-row-start: 1;
      grid-column-start: span 8;
    }
  }

  &__search {
    margin-block-end: 38px;
  }

  &__filter {
    margin-block-end: 20px;

    @media (min-width: $desktop-width) {
      grid-column-start: 10;
      grid-column-end: 13;
      margin-block-end: 0;
    }
  }

  &__pagination {
    margin-block-start: 45px;
  }
}
</style>
