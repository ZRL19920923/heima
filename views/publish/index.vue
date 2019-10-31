<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{activeId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form>
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 放上传图片组件 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label-width="40px">
          <div v-if="!activeId">
            <el-button type="primary" @click="submit(false)">发表文章</el-button>
            <el-button type="success" @click="submit(true)">存为草稿</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="update(false)">修改文章</el-button>
            <el-button type="success" @click="update(true)">存为草稿</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      articleForm: {
        title: null,
        cover: {
          type: 1,
          images: []
        },
        content: '',
        channel_id: null
      },
      activeId: null,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  components: {
    quillEditor
  },
  created () {
    // console.log(this.$route.query.id)
    this.activeId = this.$route.query.id
    if (this.activeId) {
      // console.log(456)
      this.getArticle()
    }
  },
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      // console.log(newVal, oldVal)
      // 从发布文章到的修改文章
      if (newVal) {
        this.activeId = this.$route.query.id
        if (this.activeId) {
          // console.log(456)
          this.getArticle()
        }
        return false
      }
      // 从修改文章到发布文章
      this.articleForm = {
        title: '',
        cover: {
          type: 1,
          images: []
        },
        content: '',
        channel_id: null
      }
      this.activeId = null
    }
  },
  methods: {
    // 当时进行修改是 获取文章数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.activeId)
      // console.log(data)
      this.articleForm = data
    },
    // 改变上传图片类型时 清空图片列表
    changeType () {
      this.articleForm.cover.images = []
      console.log(123)
    },
    // 发送提交请求 传true 为存为草稿  传false为发表
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存为草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.activeId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存为草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
