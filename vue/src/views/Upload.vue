<template>
  <div>
    <el-container>
      <!-- <el-header height="45px"> -->
      <!-- Header content -->
      <!-- <span>您好，欢迎使用，请在下方进行操作</span>
                <el-dropdown @command="HandleDropDownListCommand">
                        <span class="el-dropdown-link">
                            更多
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout"
                                >退出</el-dropdown-item
                            >   
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-header> -->

      <el-container>
        <el-main>
          <!-- Main content -->
          <div class="uploadbox">
            <el-col :span="24" class="toolbox"
              >&nbsp;&nbsp;
              <el-input style="width: 200px" placeholder="搜索名称"> </el-input
              >&nbsp;&nbsp;
              <el-button type="warning">查询</el-button>
              <el-button type="danger" @click="ReGet">刷新</el-button>
              <el-button type="primary" @click="changeAddDialogFormVisible"
                >上传</el-button
              >
            </el-col>
          </div>
          <div class="planbox3" v-for="(p, index) in Info" :key="index">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>计划编号:{{ Info[index].Id }}</span>
                <el-button
                  style="float: right; padding: 3px 0; font-size: 20px"
                  type="text"
                  >删除</el-button
                >
              </div>
              <div class="text item">
                <!-- <span>计划编号:{{Info[index].Id}}</span> -->
                <span>发起人：{{ Info[index].Sponsor_name }}</span>
                <br /><br />
                <span>发起日期：{{ Info[index].CreateTime }}</span>
                <br /><br />
                <span :style="fontstyle(Info[index].State)"
                  >状态：{{ Info[index].State }}</span>
                <br /><br />
                <span>审批者意见：{{Info[index].Suggest}}</span>
              </div>
            </el-card>
          </div>
          <add-dialog
            v-if="AddDialogFormVisible"
            :dialogVisible="AddDialogFormVisible"
            @closeDialog="onCloseDialog"
          ></add-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import addDialog from "../components/Dialog";
import { GetUserData } from "../api/api";
//import { Get } from "../api/list";
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
      return this.$store.state.name;
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
    HandleDropDownListCommand(command) {
      switch (command) {
        case "logout": {
          this.Logout();
        }
      }
      // this.$message('click on item ' + command);
    },

    //退出登陆
    Logout() {
      this.$message({
        message: "账户退出成功！",
        type: "success",
      });
      this.$router.push({
        path: "../login",
      });
    },

    getData() {
      const rolename = this.username;
      GetUserData(rolename).then((res) => {
        this.Info = res.data;
      });
    },
    ReGet(){
        this.getData();
    }
  },
};
</script>
<style scoped>
.toolbox {
  margin-top: 20px;
}
.uploadbox {
  margin-bottom: 80px;
  margin-left: 11px;
}
.planbox3 {
  width: 1200px;
  height: 230px;
  padding: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(51, 44, 44);
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 6px;
}
.planbox3:hover {
  transform: scale(1.04);
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 23 px;
}
.box-card {
  width: 1180px;
  height: 230px;
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