<script setup>
import SearchForm from '@/components/companyCatalog/SearchForm.vue'
import FilterBlock from '@/components/companyCatalog/FilterBlock.vue'
import CompanyCard from '@/components/companyCatalog/CompanyCard.vue'
import Pagination from '@/components/companyCatalog/Pagination.vue'
import Loader from '@/components/common/Loader/Loader.vue'
import { getCompanies } from '@/dataProviders/companiesDataProvider'
import { useDefinitionsStore } from '@/stores/definitionsStore'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const companiesLoading = ref(true)
const companyList = ref([])
const showErrorMsg = ref(false)
const searchErrorMsg = ref('')
const companiesFilter = {
  search: route.query.search ?? '',
  industry: route.query.industry ?? '',
  specialization: route.query.specialization ?? '',
  page: route.query.page ?? ''
}
const pagination = ref({ current: 1, length: 1, loading: true })

const getNotEmptyFilters = (filters) => {
  const result = {}

  for (const [key, value] of Object.entries(filters)) {
    if (value) result[key] = value
  }

  return result
}

const getFilteredCompanies = async () => {
  companiesLoading.value = true
  pagination.value.loading = true
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
}

const definitions = useDefinitionsStore()
const definitionsLoading = ref(false)
const filterOptions = ref({
  companySpecializationList: [{ id: '', title: 'Все специализации' }],
  industryList: [{ id: '', title: 'Все отрасли' }]
})
const selectedFilter = ref({
  companySpecialization: filterOptions.value.companySpecializationList[0],
  industry: filterOptions.value.industryList[0]
})

const getDefinitions = async () => {
  if (!definitions.industryList.length || !definitions.companySpecializationList) {
    definitionsLoading.value = true

    try {
      await definitions.getDefinitions()
    } catch (e) {
      showErrorMsg.value = true
    } finally {
      definitionsLoading.value = false
    }

    if (showErrorMsg.value) return
  }

  filterOptions.value.companySpecializationList = [
    filterOptions.value.companySpecializationList[0],
    ...definitions.companySpecializationList
  ]
  filterOptions.value.industryList = [
    filterOptions.value.industryList[0],
    ...definitions.industryList
  ]

  if (companiesFilter.industry !== '') {
    const selected = filterOptions.value.industryList.findIndex((item) => {
      return item.id === +companiesFilter.industry
    })
    if (selected !== -1) {
      selectedFilter.value.industry = filterOptions.value.industryList[selected]
    } else {
      companiesFilter.industry = ''
      router.replace({
        name: route.name,
        query: companiesFilter
      })
    }
  }

  if (companiesFilter.specialization !== '') {
    const selected = filterOptions.value.companySpecializationList.findIndex((item) => {
      return item.id === +companiesFilter.specialization
    })
    if (selected !== -1) {
      selectedFilter.value.specialization = filterOptions.value.companySpecializationList[selected]
    } else {
      companiesFilter.specialization = ''
      router.replace({
        name: route.name,
        query: companiesFilter
      })
    }
  }

  await getFilteredCompanies()
}

getDefinitions()

watch(
  () => selectedFilter,
  async (newValue) => {
    companiesFilter.page = 1
    companiesFilter.industry = newValue.value.industry.id
    companiesFilter.specialization = newValue.value.companySpecialization.id

    router.replace({
      name: route.name,
      query: companiesFilter
    })

    await getFilteredCompanies()
  },
  { deep: true }
)

const setSearchFilter = async (search) => {
  companiesFilter.page = 1
  companiesFilter.search = search

  router.replace({
    name: route.name,
    query: companiesFilter
  })

  await getFilteredCompanies()
}

const setPageFilter = async (page) => {
  companiesFilter.page = page

  router.replace({
    name: route.name,
    query: companiesFilter
  })

  await getFilteredCompanies()
}
</script>

<template>
  <section class="container-self company-catalog">
    <h1 class="heading1">Каталог компаний</h1>
    <div v-if="showErrorMsg">Произошла ошибка. Попробуйте снова позже.</div>
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
          :initial-value="companiesFilter.search"
        />
        <Loader v-if="companiesLoading" class="company-catalog__list-loading" />
        <div v-else-if="!companyList.length">По заданным фильтрам ничего не найдено.</div>
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
    display: flex;
    flex-direction: column;

    @media (min-width: $desktop-width) {
      grid-row-start: 1;
      grid-column-start: span 8;
    }
  }

  &__search {
    margin-block-end: 38px;
  }

  &__list-loading {
    align-self: center;
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
