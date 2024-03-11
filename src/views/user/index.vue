<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="userProfile.nickName"
        placeholder="昵称"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="userProfile.username"
        placeholder="账号"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="userProfile.email"
        placeholder="邮箱"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="userProfile.phone"
        placeholder="电话号"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="success" @click="resetPassword()">重置密码</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="用户id" width="120" />
      <el-table-column prop="username" label="账号" width="120" />
      <el-table-column label="头像" width="120">
        <template slot-scope="scope">
          <el-image style="width: 120px;height: 80px" :src="scope.row.headImg" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="nickName" label="昵称" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="address" label="地址" show-overflow-tooltip />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getUserList, resetUserPasswordBath } from '@/api/user'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      userProfile: {
        username: '',
        nickName: '',
        email: '',
        phone: '',
        pageNum: 1,
        pageSize: 3
      },
      total: 0,
      pageSize: 5,
      currentPage: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleCurrentChange(newPage) {
      this.userProfile.pageNum = newPage
      this.getData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getData() {
      getUserList(this.userProfile).then(res => {
        this.tableData = res.data.records
        this.total = Number(res.data.total)
        this.currentPage = Number(res.data.current)
      })
    },
    handleFilter() {
      getUserList(this.userProfile).then(res => {
        this.tableData = res.data.records
      })
    },
    resetPassword() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要重置密码的用户')
      } else {
        resetUserPasswordBath(this.multipleSelection).then(res => {
          if (res.code === 20000) {
            this.$message.success('重置密码成功')
          } else {
            this.$message.error('重置密码失败')
          }
          this.getData()
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
