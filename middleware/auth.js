export default function({ error, redirect }) {
  if (!window.localStorage.token) {
    error({
      message: 'Você não está autenticado',
      statusCode: 403
    })
    return redirect('/login')
  }
}
