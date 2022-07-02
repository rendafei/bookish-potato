<template>
  <div>
    <el-dialog
      title="上传计划"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :before-close="closeDialog"
      width="30%"
    >
      <el-form ref="fromRef" :model="from" label-width="120px">
        <el-form-item label="申请流程">
          <el-select v-model="from.Flow_no" placeholder="请选择申请流程">
            <el-option label="流程一" value="1"></el-option>
            <el-option label="流程二" value="2"></el-option>
          </el-select>
        </el-form-item>

        <!-- 时间信息 -->
        <el-form-item label="申请时间" prop="CreateTime">
          <el-col :span="5">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="from.CreateTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <!-- 文件信息 -->
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:5002/Programs/AutoLeadin"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>

        <!-- 提交和撤销 -->
        <el-form-item>
          <el-button type="primary" @click="Upload">提交</el-button>
          <el-button type="revocation" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Upload } from "../api/api";
export default {
  data() {
    // var checkName = (rule,value,callback) => {
    //     if(!value){
    //         return callback(new error('姓名不能为空'));
    //     }
    // };
    return {
      from: {
        Flow_no: "",
        Sponsor_name: "",
        CreateTime: "",
        ProgramsPath: "",
        // upload: "",
      },

      // rules:{
      //     name:[
      //         {required:true,message:'请输入姓名',tigger:'blur'},{validator:checkName,trigger:'blur'}
      //     ]
      // },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.from.Sponsor_name = this.$store.state.name;
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    Upload(res) {
      console.log(this.username);
      const From = this.from;
      Upload(From).then((res) => {
        if (res.data != 0) {
          alert("上传成功");
        } else {
          alert("上传失败");
        }
        this.$emit("closeDialog");
        this.update();
      });
    },
    update(){
      location.reload()
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res) {
      this.from.ProgramsPath = res.Data;
    },
  },
};
</script>



<style>
</style>