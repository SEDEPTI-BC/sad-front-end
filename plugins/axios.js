export default function({ $axios }, inject) {
  const api = $axios.create()

  api.setBaseURL('http://localhost:3333')

  // Inject to context as $api
  inject('api', api)
}
