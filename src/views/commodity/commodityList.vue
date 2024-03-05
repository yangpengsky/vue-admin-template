<template>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="活动名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="上架" value="1"/>
            <el-option label="下架" value="0"/>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { getProductDisplay } from '@/api/commodity'

export default {
  name: 'CommodityList',
  data() {
    return {
      product: {
        pageNum: 1,
        pagesize: 5

      },
      dialogVisible: false,
      tableData: [],
      form: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getProductDisplay(this.product).then(res => {
        this.tableData = res.data.records
        console.log(res)
      })
    },
    handleEdit(index, row) {
      console.log(index)
      console.log(row)
      this.form = row
      this.dialogVisible = true
    },
    handleClose() {

    }
  }
}
</script>

<style scoped>

</style>
