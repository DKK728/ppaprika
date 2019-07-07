<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div style="margin: 15px 0;" class="body">
      <el-input
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <!-- 添加商品 -->
      <el-button type="success" plain @click="dialogFormVisible = true">添加商品</el-button>
      <!-- 分页 -->
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
      <el-table :data="goodslist" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="价格" width="180"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="180"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodsform" :label-width="'120px'" ref="goodsform" :rules="rules">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsform.goods_name" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="goods_cat">
          <el-input v-model="goodsform.goods_cat" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="goods_price">
          <el-input v-model="goodsform.goods_price" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goods_number">
          <el-input v-model="goodsform.goods_number" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="goods_weight">
          <el-input v-model="goodsform.goods_weight" auto-complete="off" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllGoods, deleteGoods } from '@/api/goods_api.js'
export default {
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      total: 0,
      goodslist: [],
      deleteId: '',
      dialogFormVisible:false,
      rules: {
        // 未完成
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品分类列表', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_introduce: [],
        pics: [],
        attrs: []
      },
      goodsform: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      }
    }
  },
  methods: {
    search() {
      this.pagenum = 1
      this.init()
    },
    init() {
      getAllGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodslist = res.data.data.goods
            this.total = res.data.data.total
          }
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
    handleDelete(data) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteGoods(data.goods_id)
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
    },
    addGoods() {}
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  background-color: #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
