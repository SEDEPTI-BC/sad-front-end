export function makeToast(
  message = '',
  variant = null,
  noAutoHide = false,
  title = 'SAD-BC'
) {
  this.$bvToast.toast(message, {
    title,
    variant,
    noAutoHide,
    solid: true
  })
}
