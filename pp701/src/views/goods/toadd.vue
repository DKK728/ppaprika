<template>
  <div>
    <el-button type="info" plain @click="cancel">取消</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/home/goods/list'
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
