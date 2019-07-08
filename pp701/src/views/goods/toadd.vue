<template>
  <div>
    <el-alert title="添加商品信息" type="success" :closable="false"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-form ref="form" :model="form" :label-width="'80px'">
      <el-tabs v-model="active" @tab-click="handleClick" tab-position="left">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              :options="goodsCateList"
              :props="cascaderProps"
              @change="handleChange"
              clearable
              v-model="form.goods_cat"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model="form.attr" label="1">否</el-radio>
            <el-radio v-model="form.attr" label="2">是</el-radio>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
      <el-button type="info" plain @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>
<script>
import { getAllCategories } from '@/api/categories_api.js'
export default {
  data () {
    return {
      active: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        attrs: '',
        goods_cat: ''
      },
      goodsCateList: [],
      cascaderProps: {
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/home/goods/list'
      })
    },
    handleClick () {

    },
    handleChange (v) {
      console.log(v)
    }
  },
  mounted () {
    getAllCategories()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.goodsCateList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.el-alert {
  line-height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-steps {
  margin-bottom: 20px;
}
</style>
