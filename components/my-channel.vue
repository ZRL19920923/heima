<template>
  <el-select :value="value" placeholder="请选择" @change="change" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   channelId: null,
      options: []
    }
  },
  methods: {
    //   组件值发生改变触发的事件
    change (val) {
      // 如果利用clearable 清空 数值会变成""
      if (val === '') val = null
      this.$emit('input', val)
    },
    // 获得频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(data)
      this.options = data.channels
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style scoped lang="less">
</style>
