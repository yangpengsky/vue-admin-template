<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="appointmentRecordVo.productId"
        placeholder="产品id"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="appointmentRecordVo.brandName"
        placeholder="品牌"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="carId" label="车辆编号" width="180"/>
        <el-table-column label="头像" width="120">
          <template slot-scope="scope">
            <el-image style="width: 120px;height: 80px" :src="scope.row.image"/>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="品牌" width="180"/>
        <el-table-column prop="seriesName" label="车系" width="180"/>
        <el-table-column prop="type" label="类型" width="180"/>
        <el-table-column prop="color" label="颜色" width="180"/>
        <el-table-column prop="salePrice" label="售价" width="180"/>
        <el-table-column prop="introduce" label="介绍" width="180"/>
        <el-table-column prop="appointmentTime" label="预约时间" width="180"/>
        <el-table-column prop="signInTime" label="签到时间" width="180"/>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="signIn(scope.row)">签到</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </template>
  </div>
</template>

<script>

import { getAppointmentList, updateAppointmentSignIn } from '@/api/user'

export default {
  name: 'Appointment',
  data() {
    return {
      appointmentRecordVo: {
        brandName: '',
        userId: undefined,
        productId: '',
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      pageSize: 5,
      currentPage: 1

    }
  },

  mounted() {

  },

  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getAppointmentList(this.appointmentRecordVo).then(res => {
        this.tableData = res.data.records
        this.total = Number(res.data.total)
        this.currentPage = Number(res.data.current)
        console.log(res)
      })
    },
    getData() {
      getAppointmentList(this.appointmentRecordVo).then(res => {
        this.tableData = res.data.records
        this.total = Number(res.data.total)
        this.currentPage = Number(res.data.current)
        console.log(res)
      })
    },
    handleCurrentChange(newPage) {
      this.appointmentRecordVo.pageNum = newPage
      this.getData()
    },
    handleFilter() {
      this.appointmentRecordVo.pageNum = 1
      this.getData()
    },
    signIn(row) {
      if (row.signInTime) {
        return this.$message.error('您已经签到过了')
      }
      updateAppointmentSignIn(row.id).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: '签到成功',
            type: 'success'
          })
          this.getData()
        } else {
          this.$message({
            message: '签到失败',
            type: 'error'
          })
          this.getData()
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
