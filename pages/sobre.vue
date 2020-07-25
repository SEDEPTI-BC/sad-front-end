<template>
  <div class="content pt-5">
    <div class="container">
      <h2 class="my-5">Sobre o Sistema de Agendamentos de Auditório</h2>

      <strong>Finalidade</strong>

      <p>
        O SAD (Sistema de Agendamentos de Auditório) foi desenvolvido com o
        intuito de falicitar, agilizar e automatizar os agendamentos de horários
        do auditório da Biblioteca Central da UFPA.
      </p>
      <br />
      <p>
        Neste sistema é possível realizar agendamentos escolhendo o dia e os
        horários, de acordo com a disponibilidade de horários mostrado pelo
        sistema.
      </p>

      <strong>Realizando um agendamento</strong>

      <p>
        Para agendar um evento, basta o usuário preencher o formulário na página
        de <nuxt-link to="/agendar">agendamento</nuxt-link> com os dados
        requeridos no formulário.
      </p>
      <p>
        Após finalizar o preenchimento do formulário e confirmar o agendamento,
        o usuário irá receber um email, contendo a data, horário e todas as
        informações a respeito do evento agendado.
      </p>
      <strong>Local</strong>
      <p>
        O local onde ocorrerão os eventos será no auditório da Biblioteca
        Central UFPA no endereço Rua Augusto Corrêa, n. 1 – CEP 66075-110 Belém
        – PA.
      </p>
      <strong>Contatos</strong>
      <p>
        Para mais informações entre em contato com a
        <a :href="`mailto:${email}`">administração</a> do SAD.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'public',
  name: 'Sobre',
  data() {
    return {
      email: 'bc@ufpa.br'
    }
  }
}
</script>

<style scoped>
p {
  text-align: justify;
  margin-bottom: 0;
}

strong {
  display: block;
  margin: 40px 0 20px 0;
}

.content {
  padding-bottom: 100px;
  min-height: 100vh;
  color: #555;
  background: #edf3ff;
}

.container {
  max-width: 900px;
}
</style>
