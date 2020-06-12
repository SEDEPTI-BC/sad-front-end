export function makeToast(message, variant = null, title = 'SAD-BC') {
  this.$bvToast.toast(message, {
    title,
    variant,
    solid: true
  })
}
