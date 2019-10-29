<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channelId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template v-slot="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:160px;height:160px" fit="cover">
              <div slot="error" class="image-slot">
                <img
                  src="../../assets/images/error.gif"
                  alt
                  style="width:160px;height:160px"
                  fit="cover"
                />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="info" v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="$router.push('/publish?'+scope.row.id)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '@/components/my-bread'
export default {
  data () {
    return {
      tableData: [],
      reqParams: {
        status: null,
        channelId: null,
        page: 1,
        per_page: 20,
        begin_pubdate: null,
        end_pubdate: null
      },
      dateArr: [],
      options: [],
      total: 0
    }
  },
  created () {
    this.getChannel()
    this.getArticles()
  },
  methods: {
    //   改变日期的事件
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    //   帅选查找
    search () {
      // 每次查找都将页数为第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    //   删除文章
    async delArticle (id) {
      this.$http.delete('articles/' + id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //   分页改变页码事件
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    //   获得表格数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      //   console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    },
    // 获得频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
.footer {
  text-align: center;
}
</style>
