<script setup>
import Loader from '@/components/common/Loader/Loader.vue'
import ChipList from '@/components/common/ChipList/ChipList.vue'
import { getCompany } from '@/dataProviders/companiesDataProvider'
import { getAgeUnit, getStaffUnit } from '@/utils/getRussianUnit'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import SimpleLink from '@/components/common/SimpleLink/SimpleLink.vue'

const route = useRoute()

const companyLoading = ref(true)
const companyInfo = ref()
const showErrorMsg = ref(false)

const getCompanyInfo = async () => {
  companyLoading.value = true
  showErrorMsg.value = ''

  try {
    companyInfo.value = await getCompany(route.params.company_id)
  } catch (e) {
    showErrorMsg.value = true
  } finally {
    companyLoading.value = false
  }
}

getCompanyInfo()
</script>

<template>
  <section class="container-self company">
    <div v-if="showErrorMsg">Произошла ошибка. Попробуйте снова позже.</div>
    <Loader v-else-if="companyLoading" />
    <template v-else>
      <h1 class="heading1">{{ companyInfo.title }}</h1>
      <div class="company__wrapper">
        <div class="company__main-info">
          <div v-if="companyInfo.age || companyInfo.staff" class="company__stats">
            <div v-if="companyInfo.age" class="company__stat">
              <span class="company__stat-value">{{ companyInfo.age }}</span>
              <span class="company__stat-unit">{{ getAgeUnit(companyInfo.age) }}</span>
            </div>
            <div v-if="companyInfo.staff" class="company__stat">
              <span class="company__stat-value">{{ companyInfo.staff }}</span>
              <span class="company__stat-unit">{{ getStaffUnit(companyInfo.staff) }}</span>
            </div>
          </div>
          <p v-if="companyInfo.description_short" class="company__description-short">
            {{ companyInfo.description_short }}
          </p>
          <p v-if="companyInfo.description_full" class="company__description-full">
            {{ companyInfo.description_full }}
          </p>
          <div class="company__list-info-block" v-if="companyInfo.companySpecializations.length">
            <h2 class="company__list-info-title">Проектная специализация</h2>
            <ChipList :chips="companyInfo.companySpecializations" />
          </div>
          <div class="company__list-info-block" v-if="companyInfo.industries.length">
            <h2 class="company__list-info-title">Технологии</h2>
            <ChipList :chips="companyInfo.industries" />
          </div>
        </div>
        <div class="company__contact-info">
          <img
            v-if="companyInfo.picture"
            :src="companyInfo.picture"
            :alt="companyInfo.title"
            width="120"
            height="120"
            class="company__img"
          />
          <ul class="company__contact-list">
            <li class="company__contact-item" v-if="companyInfo.url">
              <span class="company__contact-item-key">Сайт:</span>
              <SimpleLink
                target="_blank"
                :href="companyInfo.url"
                class="company__contact-item-value company__contact-item-value_link"
                >{{ companyInfo.url }}</SimpleLink
              >
            </li>
            <li class="company__contact-item" v-if="companyInfo.contact_email">
              <span class="company__contact-item-key">E-mail:</span>
              <SimpleLink
                target="_blank"
                :href="'mailto:' + companyInfo.contact_email"
                class="company__contact-item-value company__contact-item-value_link"
                >{{ companyInfo.contact_email }}</SimpleLink
              >
            </li>
            <li class="company__contact-item" v-if="companyInfo.contact_phone">
              <span class="company__contact-item-key">Телефон:</span>
              <span class="company__contact-item-value">{{ companyInfo.contact_phone }}</span>
            </li>
            <li class="company__contact-item" v-if="companyInfo.contact_telegram">
              <span class="company__contact-item-key">Telegram:</span>
              <span class="company__contact-item-value">{{ companyInfo.contact_telegram }}</span>
            </li>
            <li class="company__contact-item" v-if="companyInfo.contact_whatsapp">
              <span class="company__contact-item-key">Telegram:</span>
              <span class="company__contact-item-value">{{ companyInfo.contact_whatsapp }}</span>
            </li>
            <li class="company__contact-item" v-if="companyInfo.contact_skype">
              <span class="company__contact-item-key">Skype:</span>
              <span class="company__contact-item-value">{{ companyInfo.contact_skype }}</span>
            </li>
            <li
              class="company__contact-item"
              v-if="companyInfo.country.title && companyInfo.city.title"
            >
              <span class="company__contact-item-key">Офис:</span>
              <span class="company__contact-item-value">{{
                companyInfo.country.title + ', ' + companyInfo.city.title
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
.company {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 24px;

    @media (min-width: $desktop-width) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  &__main-info {
    @media (min-width: $desktop-width) {
      grid-row-start: 1;
      grid-column-start: span 8;
    }
  }

  &__contact-info {
    margin-block-start: 40px;

    @media (min-width: $desktop-width) {
      grid-column-start: 10;
      grid-column-end: 13;
      margin-block-start: 0;
    }
  }

  &__stats {
    display: flex;
    gap: 0 20px;
    margin-block-end: 10px;
  }

  &__stat {
    display: flex;
    align-items: start;
    gap: 0 4px;
  }

  &__stat-value {
    color: $secondary-color;
    font-size: 36px;
    font-weight: 300;

    @media (min-width: $tablet-width) {
      font-size: 60px;
    }
  }

  &__stat-unit {
    line-height: 30px;
  }

  &__description-short {
    font-size: 18px;
    margin-block-end: 24px;
  }

  &__description-full {
    font-size: 14px;
  }

  &__list-info-block {
    margin-block-start: 40px;
  }

  &__list-info-title {
    margin-block-end: 24px;
    font-size: 18px;
    font-weight: 400;
  }

  &__img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    object-position: center;
    margin-block-end: 16px;
  }

  &__contact-list {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    font-size: 14px;
    flex-wrap: wrap;

    @media (min-width: $tablet-width) {
      flex-direction: row;
      justify-content: space-between;
      gap: 20px 20px;
    }

    @media (min-width: $desktop-width) {
      flex-direction: column;
      gap: 20px 0;
    }
  }

  &__contact-item {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 6px 0;
  }

  &__contact-item-key {
    color: $additional-text-color;
  }

  &__contact-item-value {
    color: $secondary-text-color;

    &.company__contact-item-value_link {
      color: $primary-color;
    }
  }
}
</style>
