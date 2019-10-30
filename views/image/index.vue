<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group
          v-model="reqParams.collect"
          @change="toggleCollect"
          size="small"
          style="margin-bottom:20px;"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right;" @click="open">添加素材</el-button>
      </div>
      <div class="item_img">
        <div class="img_list" v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changPage"
        hide-on-single-page
      ></el-pagination>
       <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name='image'
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon my-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        per_page: 10,
        page: 1
      },
      imgList: null,
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }

    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   上传图片成功事件
    handleSuccess (res) {
      console.log(res)
      this.$message.success('上传成功')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    //   打开弹出框
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    //   分页改变事件
    changPage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },

    //   点击删除图标删除图片
    async delImg (id) {
      await this.$http.delete(`user/images/${id}`)
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages()
        })
        .catch(() => {})
    },
    //   点击星星 切换状态
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      //   console.log(data)

      this.$message({
        type: 'success',
        message: data.collect ? '收藏图片成功' : '取消收藏成功!'
      })
      item.is_collected = data.collect
    },
    //   切换全部与收藏
    toggleCollect () {
      //   console.log(this.reqParams.collect)
      this.reqParams.page = 1
      this.getImages()
    },
    //   获取图片列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data)
      this.imgList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.item_img {
  margin-bottom: 60px;
  .img_list {
    height: 200px;
    width: 200px;
    margin-right: 100px;
    margin-bottom: 20px;
    display: inline-block;
    position: relative;
    text-align: center;
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      span {
        margin-left: 20px;
        color: #fff;
        &.red {
          color: red;
        }
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
