<template>
  <div>page4</div>
</template>

<script>
import { AllUser } from '@/api/user'
export default {
  data() {
    return {
    };
  },
  mounted() {
this.getAllUser()
  },
  methods: {
    getAllUser() {
      AllUser().then(res =>{
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>