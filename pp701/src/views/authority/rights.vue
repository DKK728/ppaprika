<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="authorityList" style="width: 100%">
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <!-- {{scope.row.level | levelFilters}} -->
          {{scope.row.level | levelFilters}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllAuthority } from '@/api/authority_api.js'
export default {
  data () {
    return {
      authorityList: []
    }
  },
  mounted () {
    getAllAuthority('list')
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.authorityList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 局部过滤器
  filters: {
    levelFilters: (level) => {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
