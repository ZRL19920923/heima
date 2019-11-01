<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles">
        <el-table-column label="标题" prop="title" width="300px"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态" v-slot="scope">
            <template>
                {{scope.row.comment_status ? '正常': '关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" v-slot="scope" width="120px">
            <template>
                <el-button type="danger" v-if="scope.row.comment_status" @click="toggleStatus(scope.row)">关闭评论</el-button>
                <el-button type="primary" v-else  @click="toggleStatus(scope.row)">打开评论</el-button>
            </template>
        </el-table-column>
      </el-table>
            <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changPage"
        hide-on-single-page
      ></el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      total: 1000,
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      }
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    //   切换评论状态
    async toggleStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    //   分页改变事件
    changPage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    //   拿取数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
</style>
