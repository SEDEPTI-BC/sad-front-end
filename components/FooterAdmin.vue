<template>
  <footer class="footer">
    <p>
      Desenvolvido e mantido por

      <img
        src="../assets/images/Logo_SEDEPTI.jpg"
        alt="logo-sedepti"
        class="logo"
      />
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: none;
  display: flex;
  padding: 30px 0;
  flex-wrap: wrap;
  font-size: 0.9em;
  justify-content: space-around;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}

.logo {
  height: 14px;
  padding: 0;
  margin: 0;
}
</style>
