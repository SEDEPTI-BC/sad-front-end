export default function({ store, error, redirect }) {
  if (!store.state.login) {
    error({
      message: 'Você não está autenticado',
      statusCode: 403
    })
    return redirect('/login')
  }
}
