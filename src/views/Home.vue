<template>
  <div class="home">
    <BemVindoComp msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BemVindoComp from '@/components/BemVindoComp.vue'

export default {
  name: 'Home',
  components: {
    BemVindoComp
  }
}
</script>
