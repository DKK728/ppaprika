<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="addRole">添加角色</el-button>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px #ccc dashed"
          >
            <el-col :span="4">
              <el-tag closable type @close="close(scope.row,first.id)">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:6px">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="close(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    @close="close(scope.row,third.id)"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:4px;margin-bottom:6px"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length===0">没有任何权限，请去分配</el-col>
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
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="'120px'" ref="form" :rules="rules">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input
            v-model="form.roleName"
            auto-complete="off"
            style="width: 200px;"
            placeholder="请输入角色名"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="roleDesc">
          <el-input
            v-model="form.roleDesc"
            auto-complete="off"
            style="width: 200px;"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogEditFormVisible">
      <el-form :model="editform" :label-width="'100px'" ref="editform" :rules="rules">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editform.roleName" auto-complete="off" disabled style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="editform.roleDesc" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限弹框 -->
    <el-dialog title="分配权限" :visible.sync="dialogAllotFormVisible">
      <el-tree
        ref="tree"
        :data="authorityList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllRoleList, deleteRightId, addAuthorityRole, deleteRole, updateRole, updateRoleRights } from '@/api/role_api.js'
import { getAllAuthority } from '@/api/authority_api.js'
export default {
  data() {
    return {
      roleList: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      dialogAllotFormVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      },
      editform: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      },
      authorityList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultCheck: [],
      defaultExpanded: [101, 102, 103, 125, 145],
      roleId: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getAllRoleList()
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
          }
        })
        .catch(err => {

        })
    },
    close(row, rightId) {
      console.log(row.id, rightId)
      deleteRightId(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
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
    },
    addRole() {
      this.dialogFormVisible = true
    },
    addRoleSubmit() {
      addAuthorityRole(this.form)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.dialogFormVisible = false
            this.$refs.form.resetFields()
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.init()
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
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole(data.id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEdit(data) {
      this.dialogEditFormVisible = true
      this.editform.roleName = data.roleName
      this.editform.roleDesc = data.roleDesc
      this.editform.id = data.id
    },
    editsubmit() {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          updateRole(this.editform)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                this.dialogEditFormVisible = false
                this.$refs.editform.resetFields()
                this.init()
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '编辑失败'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleAllot(row) {
      this.dialogAllotFormVisible = true
      this.defaultCheck.length = 0
      this.roleId = row.id
      getAllAuthority('tree')
        .then(res => {
          // console.log(res)
          this.authorityList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          first.children.forEach((second) => {
            if (second.children && second.children.length > 0) {
              second.children.forEach((third) => {
                this.defaultCheck.push(third.id)
              })
            }
          })
        }
      })

    },
    allotSubmit() {
      var arr = this.$refs.tree.getCheckedNodes()
      // console.log(arr)
      var arrlast = this.quchong(arr)
      console.log(arrlast)
      updateRoleRights(this.roleId, arrlast.join(','))
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.dialogAllotFormVisible = false
            this.$message({
              type: 'success',
              message: '分配状态成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '分配状态失败'
            })
          }
        })
        .catch(err => [
          console.log(err)
        ])
    },
    quchong(arr) {
      var temp = []
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i].id + ',' + arr[i].pid)
      }
      var finalArr = temp.join(',').split(',')
      let resultArr = []
      let obj = {}
      for (let i of finalArr) {
        if (!obj[i]) {
          resultArr.push(i)
          obj[i] = 1
        }
      }
      return resultArr
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
