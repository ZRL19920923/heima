<template>
  <div class="img-container">
    <div class="btn_img" @click="open">
      <img :src="value || defaultImg" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材选取" name="image">
          <el-radio-group
            v-model="reqParams.collect"
            @change="toggleCollect"
            size="small"
            style="margin-bottom:20px;"
          >
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="item_img">
            <div
              class="img_list"
              :class="{selected:selectedImgUrl === item.url}"
              v-for="item in imgList"
              :key="item.id"
              @click="selectedImgUrl=item.url"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon my-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImg from '../assets/images/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      imgList: [],
      total: 0,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null,
      selectedImgUrl: null,
      defaultImg
    }
  },
  methods: {
    confirmImg () {
      let src = null
      if (this.activeName === 'image') {
        if (!this.selectedImgUrl) return this.$message.info('请选择素材图片')
        src = this.selectedImgUrl
        this.$emit('input', src)
      } else {
        if (!this.uploadImageUrl) return this.$message.info('请选择上传图片')
        src = this.uploadImageUrl
        this.$emit('input', src)
      }
      this.dialogVisible = false
    },
    changPage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.uploadImageUrl = res.data.url
    },
    open () {
      this.dialogVisible = true
      this.activeName = 'image'
      this.uploadImageUrl = null
      this.selectedImgUrl = null
      this.getImages()
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
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
.img-container {
  display: inline-block;
}
.btn_img {
  width: 160px;
  height: 160px;
  border: 1px dashed #ccc;
  margin-left: 45px;
  img {
    width: 100%;
    height: 100%;
  }
}
.item_img {
  margin-bottom: 60px;
  position: relative;
  .img_list {
    height: 120px;
    width: 160px;
    margin-right: 10px;
    margin-bottom: 20px;
    display: inline-block;
    position: relative;
    text-align: center;
    border: 1px dashed #ccc;
    &.selected {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center/50px 50px;
    }
  }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
