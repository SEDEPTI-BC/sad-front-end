export default function({ $axios }, inject) {
  const api = $axios.create({
    baseURL: process.env.baseUrl
  })

  // Inject to context as $api
  inject('api', api)
}
