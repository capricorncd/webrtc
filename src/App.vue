<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item
          v-for="(item, i) in menuItems"
          :key="i"
          :index="i + ''"
          @click="handleMenuClick(item)">{{item.text}}</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      const menuItems = [
        { path: '/', text: 'Home' },
        { path: '/peer-connection', text: 'PeerConnection' },
        { path: '/live', text: 'Live' },
        { path: '/chat-room', text: 'ChatRoom' }
      ]
      const path = this.$route.path
      return {
        activeIndex: menuItems.findIndex(item => item.path === path) + '',
        menuItems
      }
    },
    methods: {
      handleMenuClick(item) {
        this.$router.push(item.path)
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .el-header {
    background: #545c64;
  }
</style>
