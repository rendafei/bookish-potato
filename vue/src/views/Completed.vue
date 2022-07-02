<template>
  <div>
    <div class="planbox" v-for="(p, index) in Info" :key="index">
      <!-- <div class="planbox2" @click="changeAddDialogFormVisible">
                <span>计划编号:{{Info[index].Id}}</span>
                <br><br>
                <span>发起人：{{Info[index].Sponsor_name}}</span>
                <br><br>
                <span>发起日期：{{Info[index].CreateTime}}</span>
            </div> -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>计划编号:{{ Info[index].Id }}</span>
          <el-button
            style="float: right; padding: 3px 0; font-size: 14px"
            type="text"
            @click="DeleteFile(Info[index].Id)"
            >删除</el-button
          >
          <el-button
            style="float: right; padding: 3px 0; font-size: 14px;margin-right: 10px"
            type="text"
            @click="GetFile(Info[index].Id)"
            >下载</el-button
          >
        </div>
        <div class="text item">
          <!-- <span>计划编号:{{Info[index].Id}}</span> -->
          <span>发起人：{{ Info[index].Sponsor_name }}</span>
          <br /><br />
          <span>发起日期：{{ Info[index].CreateTime }}</span>
          <br /><br />
          <span :style="fontstyle(Info[index].State)"
            >状态：{{ Info[index].State }}</span
          >
        </div>
      </el-card>
    </div>
    <add-dialog
      v-if="AddDialogFormVisible"
      :dialogVisible="AddDialogFormVisible"
      @closeDialog="onCloseDialog"
    ></add-dialog>
  </div>
</template>
<script>
import addDialog from "../components/Dialog.vue";
// import { Get} from '../api/list'
import { GetAgreeData,GetUserFile,DeleteData } from "../api/api";
export default {
  components: { addDialog },
  data() {
    return {
      Info: [],
      AddDialogFormVisible: false,
    };
  },

  created() {
    this.getData();
  },

  computed: {
    username() {
      return this.$store.state.userrole;
  },
    fontstyle() {
      return (_object) => {
        if (_object.indexOf('通过') != -1) {
          return { color: "green" };
        } else {
          return { color: "red" };
        }
      };
    },
  },

  methods: {
    changeAddDialogFormVisible() {
      this.AddDialogFormVisible = true;
    },
    onCloseDialog() {
      this.AddDialogFormVisible = false;
    },
    DeleteFile(Id){
      DeleteData({id:Id}).then((res) => {
        if (res.data == true) {
          this.$message({
            message: "删除审批计划成功！",
            type: "success",
          });
        } else {
          this.$message.error("删除审批计划失败！");
        }
         this.getData();
      });
    },
    GetFile(Id){
      GetUserFile(Id).then((res) => {
         var blob = new Blob([res.data], {
        type: 'text/plain;charset=utf-8',
      });

      // 存在浏览器兼容性
      console.log(res.data);
      let href = URL.createObjectURL(blob);
      let alink = document.createElement('a');
      alink.style.display = 'none';
      alink.download = '改造计划.txt'; //下载后文件名
      alink.href = href;
      document.body.appendChild(alink);
      alink.click();
      document.body.removeChild(alink); //下载完成移除元素
      URL.revokeObjectURL(href); //释放掉blob对象
      })
    },
    getData() {
      const name = this.username;
      GetAgreeData(name).then((res) => {
        this.Info = res.data;
      });  
    },
  },
};
</script scoped>
<style>
.planbox {
  width: 1200px;
  height: 200px;
  padding: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(51, 44, 44);
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 6px;
}
.planbox:hover {
  transform: scale(1.04);
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card {
  width: 1180px;
  height: 180px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>