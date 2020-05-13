export default function({ $axios }, inject) {
  const api = $axios.create({
    baseURL: process.env.baseUrl
  })
  const token = localStorage.getItem('user-token')
  if (token) {
    // eslint-disable-next-line dot-notation
    api.defaults.headers.common['Authorization'] = token
  }

  // Inject to context as $api
  inject('api', api)
}
