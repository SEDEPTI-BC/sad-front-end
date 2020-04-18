import Vue from 'vue'

Vue.filter('capitalize', str => {
  const captalizedStr = str.replace(str[0], str[0].toUpperCase())
  return captalizedStr
})
