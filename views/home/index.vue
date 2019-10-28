<template>
  <div>
    <el-container class="mycontainer">
      <el-aside :width="iscollcope? '64px':'200px'" class="myaside">
        <div class="logo" :class="{minilog:iscollcope}">
        </div>
        <el-menu
          default-active="1"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="iscollcope"
          :collapse-transition="false"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="myheader">
          <span>
            <i class="el-icon-s-fold" @click="toggle"></i>
            <span class="text">江苏传智播客科技教育有限公司</span>
          </span>
          <el-dropdown class="mydropdown" placement="bottom" @command="command">
            <span class="el-dropdown-link">
              <img :src="photo" alt="">
              <span class="name">{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item  command="layout"><span class="el-icon-unlock"></span> 退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="mymain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      iscollcope: false,
      name: null,
      photo: null
    }
  },
  created () {
    this.photo = store.getUser().photo
    this.name = store.getUser().name
  },
  methods: {
    command (command) {
      this[command]()
    },
    toggle () {
      this.iscollcope = !this.iscollcope
    },
    setting () {
      this.$router.push('/setting')
    },
    layout () {
      store.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.mycontainer {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    height: 100%;
    width: 200px;
    background: #002033;
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    height: 60px;
    width: 100%;
    // background: white;
    line-height: 60px;
    // vertical-align: middle;;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .mydropdown {
      float: right;
      li {
        float: right;
      }
    }
    img {
      height: 30px;
      width: 30px;
      vertical-align: middle;
    }
    .name {
      font-weight: bold;
      vertical-align: middle;
    }
  }
  .mymain {
    height: 100%;
    width: 100%;
    // background: black;
  }
  .logo {
    height: 60px;
    width: 100%;
    line-height: 80px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center/140px auto;
  }
  .minilog {
    width: 60px;
    background: url(../../assets/images/logo_admin_01.png) no-repeat center;
  }
}
</style>
