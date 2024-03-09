<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="product.id"
        placeholder="商品编号"
        clearable
        style="width: 160px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="product.brandId"
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
        v-model="product.seriesId"
        class="filter-item"
        clearable
        placeholder="车系"
        style="width: 160px;"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in seriesOptions" :key="item.seriesId" :label="item.seriesName" :value="item.seriesId"/>
      </el-select>
      <el-select
        v-model="product.status"
        placeholder="状态"
        clearable
        class="filter-item"
        style="width: 110px"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in carStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="success" @click="addProduct()">新增商品</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 160px;height: 90px"
              :src="scope.row.image"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌/车系/车型" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.brandName }}/{{ scope.row.seriesName }}/{{
                scope.row.type
              }}</span>
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
        <el-table-column label="介绍" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.introduce }}</span>
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
              <span v-if="scope.row.listing == 1">上架</span>
              <span v-else-if="scope.row.listing == 0">未上架</span>
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
    </div>
    <el-dialog
      :title="dialogTitle"
      width="30%"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="车辆信息">
          <el-select v-model="form.carId" filterable placeholder="请选择" style="width: 400px">
            <el-option
              v-for="item in optionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车辆类型">
          <el-select v-model="form.carType" placeholder="车辆类型">
            <el-option
              v-for="item in carTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.listing" placeholder="状态">
            <el-option
              v-for="item in listingList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="汽车图片或者视频">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/file/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <video v-if="imageUrl != '' && videoFlag == false" :src="imageUrl" width="480" height="320" controls>
            <!--            <source type="video/mp4">-->
            您的浏览器不支持HTML5 video标签。
          </video>
        </el-form-item>
        <el-form-item label="汽车描述">
          <el-input v-model="form.introduce"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { getProductDisplay, updateProductDisplay, insertProductDisplay } from '@/api/commodity'
import { fetchBrand, getSpecifyStoreList } from '@/api/init'
import { getSeriesByBrandId } from '@/api/store'

export default {
  name: 'CommodityList',
  data() {
    return {
      product: {
        pageNum: 1,
        pagesize: 5,
        id: undefined,
        brandId: undefined,
        seriesId: undefined,
        status: undefined

      },
      fileList: [],
      dialogVisible: false,
      tableData: [],
      form: {
        id: undefined,
        carId: undefined,
        introduce: undefined,
        image: undefined,
        video: undefined,
        carType: undefined,
        listing: undefined
      },
      brandOptions: [],
      seriesOptions: [],
      carStatusOptions: [
        { key: '0', display_name: '下架' },
        { key: '1', display_name: '上架' }
      ],
      optionsList: [],
      carTypeList: [
        { value: 0, label: '轿车' },
        { value: 1, label: 'SUV' },
        { value: 2, label: 'MPV' },
        { value: 3, label: '跑车' },
        { value: 4, label: '微面' }
      ],
      listingList: [
        { value: 0, label: '下架' },
        { value: 1, label: '上架' }
      ],
      value: 0,
      list: [],
      videoUrl: '',
      imageUrl: '',
      videoFlag: false,
      dialogTitle: '',
      total: 0,
      pageSize: 5,
      currentPage: 1

    }
  },
  created() {
    this.getData()
    this.getBrandOpt()
    this.getSeriesOpt()
    this.getSpecifyStoreList()
  },
  methods: {
    getData() {
      getProductDisplay(this.product).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = Number(res.data.total)
        this.currentPage = Number(res.data.current)
      })
    },
    handleEdit(index, row) {
      this.fileList = []
      this.dialogTitle = '编辑'
      this.form.id = row.id
      this.form.carId = row.carId
      this.dialogVisible = true
      this.form.listing = row.listing
      this.form.carType = row.carType
      this.form.introduce = row.introduce
      this.optionsList.forEach(item => {
        if (item.value === row.carId) {
          this.value = item.value
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
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
      this.product.seriesId = null
      this.getSeriesOpt(this.product.brandId)
    },
    handleFilter() {
      this.getData()
    },
    getSpecifyStoreList() {
      getSpecifyStoreList().then(res => {
        this.list = res.data
        this.list.forEach(item => {
          this.optionsList.push({
            value: item.id,
            label: `${item.brandName}/${item.seriesName}/${item.type}/${item.color} `
          })
        })
      })
    },
    addProduct() {
      this.dialogTitle = '新增'
      this.form = {}
      this.dialogVisible = true
      this.fileList = []
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      // 上传成功后的回调函数
      console.log('上传成功:', response)
      if (response.code === 2002) {
        // 上传图片
        this.form.image = response.data
      }
      if (response.code === 2001) {
        this.form.video = response.data
        this.videoUrl = response.data
        this.videoFlag = true
      }
      console.log(this.form)
    },
    submit() {
      if (this.form.id != null) {
        updateProductDisplay(this.form).then(res => {
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.dialogVisible = false
            this.getData()
          } else {
            this.$message
              .error('修改失败!')
            this.dialogVisible = false
            this.getData()
          }
        })
      } else {
        // 插入
        insertProductDisplay(this.form).then(res => {
          if (res.code === 20000) {
            this.$message
              .success('添加成功')
            this.dialogVisible = false
            this.getData()
          } else {
            this.$message.error(res.message)
            this.dialogVisible = false
            this.getData()
          }
        })
      }
    },
    handleCurrentChange(newPage) {
      this.product.pageNum = newPage
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
