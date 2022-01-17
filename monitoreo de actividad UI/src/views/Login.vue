<template>
  <div class="login">
    <form>
      <div class="form-group">
        <label for="user">Usuario</label>
        <input type="text" class="form-control" id="user" placeholder="Introduzca usuario">
      </div>
      <div class="form-group">
        <label for="pass">Constraseña</label>
        <input type="password" class="form-control" id="pass" placeholder="Constraseña">
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>


  </div>
</template>

<script>
// @ is an alias to /src
//const axios = require('axios').default;
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      errorStatus:'',

    }

  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>