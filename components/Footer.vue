<template>
  <footer class="footer">
    <div>
      <p>
        Universidade Federal do Pará
      </p>
      <p>Biblioteca Central Prof. Dr. Clodoaldo Beckmann</p>
      <p>
        End.: Rua Augusto Corrêa, n. 1 – CEP 66075-110 Belém – PA
      </p>
      <p>
        Desenvolvido e mantido por
        <b><nuxt-link to="/sedepti" style="color: white;">SEDEPTI</nuxt-link></b
        >.
      </p>
    </div>

    <img src="../assets/images/ufpa-logo.png" alt="logo-ufpa" class="logo" />
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: #dc3545;
  display: flex;
  flex-wrap: wrap;
  color: #fbb;
  font-size: 0.9em;
  justify-content: space-around;
  padding: 60px 40px;
}

.logo {
  height: 110px;
}
</style>
