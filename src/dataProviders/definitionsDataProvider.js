import axios from 'axios'

const urls = {
  getDefinitions: '/definitions'
}

const getDefinitions = async () => {
  const { data } = await axios.get(urls.getDefinitions)

  return data
}

export { urls as definitionsUrls, getDefinitions }
