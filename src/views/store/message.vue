<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="车辆编号"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.brandId"
        class="filter-item"
        clearable
        placeholder="品牌"
        style="width: 160px;"
        @change="changeSeries"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in brandOptions" :key="item.brandId" :label="item.brandName" :value="item.brandId"/>
      </el-select>
      <el-select
        v-model="listQuery.seriesId"
        class="filter-item"
        clearable
        placeholder="车系"
        style="width: 160px;"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in seriesOptions" :key="item.seriesId" :label="item.seriesName" :value="item.seriesId"/>
      </el-select>
      <el-select
        v-model="listQuery.status"
        placeholder="状态"
        clearable
        class="filter-item"
        style="width: 110px"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in carStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="车辆编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="品牌/车系/车型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.brandName }}/{{ scope.row.seriesName }}/{{scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="颜色" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.color }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进价" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="售价" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.repertory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <span v-if="scope.row.status == 1">在售</span>
            <span v-else-if="scope.row.status == 0">停售</span>
            <span v-else>缺货</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
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

    <el-dialog :visible.sync="dialogFormVisible" title="修改库存信息">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="品牌 & 车系" prop="series">
          <el-cascader v-model="temp.series" :options="options" placeholder="品牌/车系" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="型号" prop="type">
          <el-input v-model="temp.type"/>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="temp.color"/>
        </el-form-item>
        <el-form-item label="进价" prop="price">
          <el-input v-model.number="temp.price"/>
        </el-form-item>
        <el-form-item label="售价" prop="salePrice">
          <el-input v-model.number="temp.salePrice"/>
        </el-form-item>
        <el-form-item label="数量" prop="repertory">
          <el-input-number v-model="temp.repertory" :min="0"/>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in carStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-pagination {
  text-align: right; /* 这会让分页按钮靠右 */
}

/* 如果你想要整个分页组件的容器靠右，而不是仅仅按钮靠右，可以这样设置 */
.el-pagination-container {
  display: flex;
  justify-content: flex-end; /* 这会让整个分页组件靠父容器的右侧 */
}

</style>

<script>
import { getCars, fetchBrand, fetchSeries } from '@/api/init'
import { getSeriesByBrandId, updateStore } from '@/api/store'

export default {
  data() {
    return {
      listQuery: {
        pageNum: 0,
        pageSize: 5,
        id: undefined,
        brandId: undefined,
        seriesId: undefined,
        status: undefined,
        orderBy: undefined
      },
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的条目数
      total: 0, // 总条目数
      brandOptions: [],
      tableData: [],
      seriesOptions: [],
      carStatusOptions: [
        { key: '0', display_name: '停售' },
        { key: '1', display_name: '在售' },
        { key: '2', display_name: '缺货' }
      ],
      temp: {
        id: undefined,
        series: [],
        seriesId: undefined,
        type: '',
        color: '',
        price: undefined,
        salePrice: undefined,
        repertory: undefined,
        status: undefined
      },
      options: [],
      dialogFormVisible: false,
      rules: {
        seriesId: [
          { required: true, message: '请输入品牌 & 车系' }
        ],
        type: [
          { required: true, message: '请输入车辆型号', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请输入车辆颜色', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入车辆进价', trigger: 'blur' },
          { type: 'number', message: '进价必须为数字值' }
        ],
        salePrice: [
          { required: true, message: '请输入车辆售价', trigger: 'blur' },
          { type: 'number', message: '售价必须为数字值' }
        ],
        repertory: [
          { required: true, message: '请输入车辆库存' }
        ]
      }

    }
  },
  computed: {},
  created() {
    this.getList()
    this.getBrandOpt()
  },
  methods: {
    // 车辆列表
    getList() {
      getCars(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.total = Number(response.data.total)
      })
    },
    // 获取brand
    getBrandOpt() {
      fetchBrand().then(response => {
        this.brandOptions = response.data
      })
    },
    // 获取series
    getSeriesOpt(brandId) {
      getSeriesByBrandId(brandId).then(response => {
        this.seriesOptions = response.data
      })
    },
    changeSeries: function() {
      this.listQuery.seriesId = null
      this.getSeriesOpt(this.listQuery.brandId)
    },
    handleFilter() {
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.listQuery.pageNum = newPage
      this.getList()
    },
    handleEdit(index, row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      fetchSeries().then(response => {
        this.options = response.data
      })
      this.this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.seriesId = this.temp.series[1]
          tempData.createTime = null
          tempData.series = null
          updateStore(tempData).then(response => {
            if (response.code === 20000) {
              if (tempData.seriesId === this.temp.seriesId) {
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
              } else {
                this.getList()
              }
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '错误',
                message: response.data,
                type: 'error',
                duration: 2000
              })
            }
            this.dialogFormVisible = false
          })
        }
      })
    }

  }
}
</script>
