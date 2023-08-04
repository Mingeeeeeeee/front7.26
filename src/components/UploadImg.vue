  <div class="flex flex-y-center">
    <el-upload
      ref="upload"
      :action="actionUrl"
      :class="{ hide: hide }"
      list-type="picture-card"
      :name="paramsName"
      :data="uploadParams"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :headers="uploadHeader"
      :file-list="filesList"
      :multiple="!isSingle"
      :on-change="handleChange"
      :limit="maxlimit"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <img width="100%" :src="goodsImgUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import * as imageConversion from 'image-conversion'
import { getToken } from '@/utils/auth'

export default {
  name: 'ImgUpload',
  props: {
    // 上传接口地址
    uploadUrl: {
      type: String,
      default: () => ''
    },
    // 上传额外参数
    otherParams: {
      type: Object,
      default: () => {}
    },
    // 张数限制
    limit: {
      type: Number,
      default: () => 1
    },
    // 固定参数名修改
    paramsName: {
      type: String,
      default: () => 'image'
    },
    // 已上传文件list
    fileList: {
      type: Array,
      default: () => []
    },
    // 是否需要隐藏上传icon
    isHide: {
      type: Boolean,
      default: () => false
    },
    // 是否是单图上传
    isSingle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      goodsImgUrl: '',
      hide: this.isHide,
      actionUrl: this.uploadUrl,
      uploadParams: this.otherParams,
      filesList: this.fileList,
      maxlimit: this.limit,
      defaultParams: this.paramsName
    }
  },
  computed: {
    uploadHeader() {
      return {
        Token: getToken()
      }
    }
  },
  watch: {
    uploadUrl: {
      handler(newVal) {
        this.actionUrl = newVal
      }
    },
    otherParams: {
      handler(newVal) {
        this.uploadParams = newVal
      },
      deep: true,
      immediate: true
    },
    limit: {
      handler(newVal) {
        this.maxlimit = newVal
      }
    },
    paramsName: {
      handler(newVal) {
        this.defaultParams = newVal
      }
    },
    fileList: {
      handler(newVal) {
        this.filesList = newVal
      },
      deep: true,
      immediate: true
    },
    isHide: {
      handler(newVal) {
        this.hide = newVal
      }
    }
  },
  methods: {
    beforeUpload(file) {
      return new Promise((resolve) => {
        imageConversion.compress(file, 0.9).then((res) => {
          resolve(res)
        })
      })
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.goodsImgUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传改变
    handleChange(file) {
      this.$emit('handleChange', file, this.isSingle)
      this.hide = this.fileList.length >= this.maxlimit
    },
    // 图片移除
    handleRemove(file) {
      const arr = this.$refs.upload.uploadFiles
      const index = arr.indexOf(file)
      this.filesList.splice(index, 1)
      let num = 0
      this.$refs.upload.uploadFiles.map((item) => {
        if (item.uid === file.uid) {
          this.$refs.upload.uploadFiles.splice(num, 1)
        }
        num++
      })
      this.hide = this.fileList.length >= this.maxlimit
      this.$emit('handleRemove', this.filesList, this.isSingle)
    },
    // 图片上传
    handleSuccess(res, file, filesList) {
      if (res.code === 200) {
        if (this.isSingle) {
          this.filesList.push(file)
          this.$emit('handleSuccess', this.filesList, 'single')
          if (this.$refs.upload.uploadFiles.length === this.maxlimit) {
            this.hide = true
          }
        } else {
          this.filesList.push(file)
          this.$emit('handleSuccess', this.filesList, 'group')
          if (this.$refs.upload.uploadFiles.length === this.maxlimit) {
            this.hide = true
          }
        }
      } else {
        this.filesList = []
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>

