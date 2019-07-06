<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain>添加角色</el-button>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id" style='margin-bottom:10px;border-bottom:1px #ccc dashed'>
            <el-col :span="4">
                <el-tag closable type="" @close='close(scope.row,first.id)'>{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style='margin-bottom:6px'>
                <el-col :span="4">
                  <el-tag closable type="success" @close='close(scope.row,second.id)'>{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                    <el-tag closable type="warning" @close='close(scope.row,third.id)' v-for="third in second.children" :key="third.id" style='margin-right:4px;margin-bottom:6px'>{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24' v-show='scope.row.children.length===0'>没有任何权限，请去分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="handleAllot(scope.row)">分配权限</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoleList, deleteRightId } from '@/api/role_api.js'
export default {
  data() {
    return {
      roleList: []
    }
  },
  mounted() {
    getAllRoleList()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
      .catch(err => {

      })
  },
  methods: {
    close(row,rightId) {
      console.log(row.id,rightId)
      deleteRightId(row.id,rightId)
        .then(res => {
          console.log(res)
          if(res.data.meta.status === 200) {
            row.children = res.data.data
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
