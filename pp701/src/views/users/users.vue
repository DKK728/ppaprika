<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="userlist" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="可用"
            inactive-text="不可用"
            @change="changeStatus(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="handleAllot(scope.row)">分配角色</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 到分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="'120px'" ref="userform" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible">
      <el-form :model="editform" :label-width="'100px'" ref="editform" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editform.username" auto-complete="off" disabled style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editform.mobile" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogAllotFormVisible">
      <el-form :model="allotform">
        <el-form-item label="用户名:">
          <!-- <el-input v-model="allotform.name" auto-complete="off" style="width: 200px;"></el-input> -->
          {{allotform.username}}
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="allotform.rid" placeholder="请选择角色" clearable>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, addUser, userStatusChange, updateUser, deleteUser } from '@/api/user_api.js'
import { allotUser, getAllRoleList } from '@/api/role_api.js'
export default {
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      value4: true,
      userlist: [],
      currentpage: 1,
      total: 0,
      form: {
        username: '',
        password: '',
        email: 'example@aa.com',
        mobile: '13168888888'
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      dialogAllotFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur', pattern: /\w+[@]\w+[.]\w{2,3}/ }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[345678]\d{9}$/, message: '请输入11位手机号', trigger: 'blur' }
        ]
      },
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      allotform: {
        username: '',
        id: '',
        rid: ''
      },
      roleList: [],
      deleteId: ''
    }
  },
  mounted() {
    this.init()
      getAllRoleList()
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200)
            this.roleList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    init() {
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res)
          this.userlist = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange(e) {
      this.pagesize = e
      this.pagenum = 1
      this.init()
    },
    handleCurrentChange(r) {
      this.pagenum = r
      this.init()
    },
    search() {
      this.pagenum = 1
      this.init()
    },
    addUser() {
      // 测试和api里的addUser的关系
      this.$refs.userform.validate(valid => {
        if (valid) {
          addUser(this.form)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.dialogFormVisible = false
                this.$refs.userform.resetFields()
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
        } else {
          return false
        }
      })
    },
    changeStatus(uid, type) {
      userStatusChange(uid, type)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(data) {
      this.dialogEditFormVisible = true
      this.editform.username = data.username
      this.editform.email = data.email
      this.editform.mobile = data.mobile
      this.editform.id = data.id
    },
    editsubmit() {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          updateUser(this.editform)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                this.dialogEditFormVisible = false
                this.$refs.editform.resetFields()
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
      })
    },
    handleAllot(data) {
      this.dialogAllotFormVisible = true
      this.allotform.username = data.username
      this.allotform.id = data.id
      this.allotform.rid = data.rid
    },
    allotUserSubmit() {
      if (!this.allotform.rid) {
        this.$message({
          type: 'warning',
          message: '请先选择角色'
        })
        return false
      }
      allotUser(this.allotform.id, this.allotform.rid)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.dialogAllotFormVisible = false
            this.$message({
              type: 'success',
              message: '角色修改成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '角色修改失败'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(data.id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.pagenum = Math.ceil((this.total - 1) / this.pagesize) < this.pagenum ? --this.pagenum : this.pagenum
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
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
    }
  }
}
</script>
<style lang='less' scoped>
</style>
