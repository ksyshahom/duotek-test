import axios from 'axios'

const urls = {
  getCompanies: '/companies'
}

const getCompanies = async (filter) => {
  const { data } = await axios.get(urls.getCompanies, {
    params: filter
  })

  return data
}

export { urls as companiesUrls, getCompanies }
