<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8888/file/uploadImage"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <video width="640" height="360" controls>
      <source src="http://localhost:8888/file/images/20240307220500957.mp4" type="video/mp4">
      您的浏览器不支持HTML5 video标签。
    </video>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      // 上传成功后的回调函数
      console.log('上传成功:', response)
      // 这里可以根据服务器返回的response来处理后续逻辑
      // 例如，更新fileList或者显示上传成功的提示
    }
  }
}
</script>

<style scoped>

</style>
