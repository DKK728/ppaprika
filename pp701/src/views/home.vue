<template>
  <div class='home'>
    <el-container>
      <el-aside width='200px'>
        <div class='logo'></div>
        <el-menu
          :router='true'
          :unique-opened='true'
          :default-active="'1-1'"
          class='el-menu-vertical-demo'
          background-color='#c6c6c6'
          text-color='aqua'
          active-text-color='#ffffff'
        >
          <el-submenu :index="first.id + ''" v-for="first in menulist" :key='first.id'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item :index="'/home/'+second.path" v-for='second in first.children' :key='second.id'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>{{second.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index='2'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index='/home/userlist'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index='/home/authoritylist'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index='3'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index='/home/goods'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index='/home/classparameter'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index='/home/goodsclass'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index='4'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index='#'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index='5'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index='#'>
              <template slot='title'>
                <i class='el-icon-location'></i>
                <span>罗德岛</span>
              </template>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class='myicon myicon-menu toggle-btn'></span>
          <h1 class='system-title'>电商后台管理系统</h1>
          <a href='javascript:;' class='welcome'>退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenuList } from '@/api/authority_api.js'
export default {
  data () {
    return {
      menulist: []
    }
  },
  mounted () {
    getMenuList()
    .then(res => {
      console.log(res)
      if(res.data.meta.status ===200 ) {
        this.menulist = res.data.data
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang='less' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
    height : 100%;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: orange;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: orange;
  }
  .welcome {
    color: white;
  }
}
</style>
