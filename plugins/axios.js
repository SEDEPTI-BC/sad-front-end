export default function({ $axios }, inject) {
  const api = $axios.create({
    baseURL: process.env.baseUrl
  })

  api.interceptors.request.use(
    function(config) {
      const token = window.localStorage.token
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  inject('api', api)
}
