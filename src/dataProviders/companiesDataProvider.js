import axios from 'axios'

const urls = {
  getCompanies: '/companies',
  getCompany: '/companies/info'
}

const getCompanies = async (filter) => {
  const { data } = await axios.get(urls.getCompanies, {
    params: filter
  })

  return data
}

const getCompany = async (company_id) => {
  const { data } = await axios.get(urls.getCompany, {
    params: { id: company_id }
  })

  return data.data
}

export { urls as companiesUrls, getCompanies, getCompany }
