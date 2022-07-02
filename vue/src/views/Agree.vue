<template>
  <div>
    <div class="planbox1" v-for="(p, index) in Info" :key="index">
      <el-card class="box-card1" shadow="hover">
        <div slot="header" class="clearfix">
          <span>计划编号:{{ Info[index].Id }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="Agree(Info[index])"
            >同意</el-button
          >
          <el-button
            style="float: right; padding: 3px 0; margin-right: 10px"
            type="text"
            @click="Reject(Info[index])"
            >驳回</el-button
          >
          <el-button
            style="float: right; padding: 3px 0"
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
          <el-input
            type="textarea"
            autosize
            placeholder="请输入审批意见"
            maxlength="99"
            v-model="Info[index].Suggest"
            show-word-limit
          >
          </el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {
  GetAdminData,
  GetManageData,
  PassData,
  RejectData,
  GetUserFile,
} from "../api/api";
export default {
  data() {
    return {
      Info: [],
      AddDialogFormVisible: false,
    };
  },
  computed: {
    username() {
      return this.$store.state.userrole;
    },
  },
  created() {
    this.getData();
  },

  methods: {
    Agree(_object) {
      PassData(_object).then((res) => {
        if (res.data == true) {
          this.$message({
            message: "同意审批计划成功！",
            type: "success",
          });
        } else {
          this.$message.error("同意审批计划失败！");
        }
        this.getData();
      });
      this.getData();
    },
    Reject(_object) {
      RejectData(_object).then((res) => {
        if (res.data == true) {
          this.$message({
            message: "驳回审批计划成功！",
            type: "success",
          });
        } else {
          this.$message.error("驳回审批计划失败！");
        }
        this.getData();
      });
      this.getData();
    },
    changeAddDialogFormVisible() {
      this.AddDialogFormVisible = true;
    },
    onCloseDialog() {
      this.AddDialogFormVisible = false;
    },
    GetFile(Id) {
      GetUserFile(Id).then((res) => {
        console.log(res);
        var blob = new Blob([res.data], {
          type: "text/plain;charset=utf-8",
        });

        // 存在浏览器兼容性
        let href = URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.style.display = "none";
        alink.download = "改造计划.docx"; //下载后文件名
        alink.href = href;
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink); //下载完成移除元素
        URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
    getData() {
      const name = this.username;
      if (name === "admin") {
        GetAdminData(name).then((res) => {
          this.Info = res.data;
        });
      } else {
        GetManageData(name).then((res) => {
          this.Info = res.data;
        });
      }
    },
  },
};
</script scoped>
<style>
.planbox1 {
  width: 1200px;
  height: 250px;
  padding: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(51, 44, 44);
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 6px;
}
.planbox1:hover {
  transform: scale(1.04);
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card1 {
  width: 1180px;
  height: 220px;
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