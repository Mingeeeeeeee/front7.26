<template>
  <div class="container">
    <v-card class="mx-auto" max-width="500">
      <v-col>
        <div class="ma-3">{{ taskName[id].name }}</div>
        <div class="ma-3">{{ taskName[id].text }}</div>
      </v-col>
      <v-divider color="indigo"> </v-divider>

      <v-list nav dense>
        <div class="center-button">
          <v-btn color="light-blue" dark @click="showAddSnackbar()">
            <v-icon left>mdi-plus</v-icon>
            新建任务
          </v-btn>
        </div>

        <v-list-item
          v-for="(item, index) in taskList"
          :key="index"
          link
          @click="getTaskId(item.id, item.index)"
        >
          <v-list-item-avatar>
            <v-img
              src="https://www.weshop.com/_next/image?url=%2Fmodel.png&w=96&q=75"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <!-- 三个小点start -->
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-icon small v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-card>
              <v-list>
                <v-list-item link @click="showDeleteSnackbar(item.id)"
                  >删除</v-list-item
                >
              </v-list>
            </v-card>
          </v-menu>
        </v-list-item>

        <!-- 折叠面板内容 -->
        <v-dialog
          v-model="showPanelDialog"
          max-width="1500"
          :persistent="false"
          style="overflow-y: hidden"
        >
          <v-card>
            <v-divider></v-divider>

            <Sd
              @child-event="updateTask"
              v-bind:url1="url_1"
              v-bind:url2="url_2"
              v-bind:mask="mask"
              v-if="this.$route.path == '/home/0'"
            >
            </Sd>
            <seg
              @child-event="updateTask"
              v-bind:url1="url_1"
              v-bind:url2="url_2"
              v-if="this.$route.path == '/home/1'"
            >
            </seg>
            <color
              @child-event="updateTask"
              v-bind:url1="url_1"
              v-bind:url2="url_2"
              v-bind:url3="url_3"
              v-bind:color="col"
              v-bind:text="prompt"
              v-bind:example="exp"
              v-bind:stroke="rxry"
              v-bind:type="val"
              v-if="this.$route.path == '/home/2'"
            >
            </color>
          </v-card>
        </v-dialog>

        <!-- 提示消除成功 -->
      </v-list>
    </v-card>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { eventBus } from "./EventBus.js";
import Sd from "../components/Sd.vue";
import seg from "../components/seg.vue";
import color from "../components/Color.vue";
import axios from "axios";
export default {
  components: {
    Sd,
    seg,
    color,
  },
  props: [
    "id",
    "url1",
    "url2",
    "url3",
    "mask",
    "example",
    "type",
    "text",
    "color",
    "stroke",
  ],
  data() {
    return {
      server_url: "http://127.0.0.1:5003",
      url_1: "",
      url_2: "",
      url_3: "",
      col: "",
      prompt: "",
      exp: "",
      rxry: "",
      val: "",
      mask: "",
      taskList: [{ name: "111", id: 1 }],
      taskName: [
        {
          name: "人台图",
          text: "只需要将服装穿到人台上，即可用符合品牌调性的各类型真人模特展示服装。",
        },
        {
          name: "真人图",
          text: "只需要任意真人模特图，即可切换适合世界各地市场的拍摄场景和模特类型。",
        },
        {
          name: "玩具图",
          text: "只需要简单的商品图，就可以生成商业摄影效果的产品主图。",
        },
        { name: "商品图", text: "将玩具放置在简单背景下，即可生成潮玩场景。" },
      ],
      showPanelDialog: false,
      selectedTaskId: null,

      snackbar: {
        show: false,
        message: "",
        timeout: 3000, // 消息显示时间，单位为毫秒
        color: "", // 消息颜色，可以是 Vuetify 预定义的颜色或自定义颜色
      },
    };
  },
  created() {
    this.updateTask();
  },
  mounted() {
    this.updateTask();
  },
  methods: {
    updateTask() {
      const user_id = localStorage.getItem("user_id");
      let param = new FormData();
      param.append("user_id", user_id);
      param.append("type", String(this.$route.path).substr(-1, 1));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/api/task", param, config)
        .then((response) => {
          this.taskList = response.data.tasks;
          console.log(this.taskList);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async deleteTask(tid) {
      //console.log(tid)
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      let param = new FormData();
      param.append("user_id", user_id);
      param.append("id", this.selectedTaskId);
      param.append("type", String(this.$route.path).substr(-1, 1));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/deleteJob", param, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.snackbar.show = true;
      this.snackbar.message = "删除任务成功"; // 自定义要显示的消息文本
      this.snackbar.color = "success"; // 自定义消息的颜色
    },
    getTaskId(tid, index) {
      console.log("tid:", tid, "  index:", index);
      eventBus.$emit("updateStatus", tid);

      this.selectedTaskId = tid;
      console.log(this.taskList);
      this.url_1 = this.taskList[index].url_1;
      this.url_2 = this.taskList[index].url_2;
      this.url_3 = this.taskList[index].example;
      this.mask = this.taskList[index].mask;
      console.log("发送", this.url_1, this.url_2);

      this.col = this.taskList[index].color;
      this.prompt = this.taskList[index].text_prompt;
      this.exp = this.taskList[index].example;
      this.rxry = this.taskList[index].stroke;
      this.val = this.taskList[index].type;
      this.showPanelDialog = true;
      console.log("value", this.val);
    },
    closePanel() {
      this.showPanelDialog = false;
      this.url_1 = "";
      this.url_2 = "";
    },
    async showDeleteSnackbar(tid) {
      console.log("删除", tid);
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      let param = new FormData();
      param.append("user_id", user_id);
      param.append("tid", tid);
      param.append("type", String(this.$route.path).substr(-1, 1));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/deleteJob", param, config)
        .then((response) => {
          console.log(response);
          // this.$router.go(Number((this.$route.path).substr(-1, 1)));
          // console.log('router  home/', Number((this.$route.path).substr(-1, 1)));
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      this.snackbar.show = true;
      this.snackbar.message = "删除任务成功"; // 自定义要显示的消息文本
      this.snackbar.color = "success"; // 自定义消息的颜色
    },
    async showAddSnackbar() {
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      let param = new FormData();
      param.append("user_id", user_id);
      param.append("type", String(this.$route.path).substr(-1, 1));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/addJob", param, config)
        .then((response) => {
          console.log(response);
          // this.$router.go(Number((this.$route.path).substr(-1, 1)));
          // console.log('router  home/', Number((this.$route.path).substr(-1, 1)));
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      this.snackbar.show = true;
      this.snackbar.message = "新增任务成功"; // 自定义要显示的消息文本
      this.snackbar.color = "success"; // 自定义消息的颜色
    },
  },
};
</script>

<style scoped>
.center-button {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

.container {
  overflow-y: auto;
  max-height: 850px;
  /* 设置容器的最大高度 */
}
</style>
