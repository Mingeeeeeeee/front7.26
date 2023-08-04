<template>
  <div>
    <v-app app>
      <TopBar></TopBar>
      <!-- <router-view  :key="$router.fullpath"></router-view> -->
      <!-- <v-navigation-drawer app v-model="drawer" :clipped="$vuetify.breakpoint.width < 1264"  :top="true">
                
                <v-list>
                  <img src="../assets/14934ed0884cf5e98cc492467d3cd55.png" alt="" class="logo" />
                  <v-expansion-panels class="flex-row">
                    <v-expansion-panel v-for="(item, index) in items" :key="index">
                      <v-expansion-panel-header>
                        <v-list-item-avatar>
                          <v-img :src="item.imageUrl"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-btn :color="index === 0
                              ? 'pink'
                              : index === 1
                                ? 'light-green'
                                : index === 2
                                  ? 'blue'
                                  : 'light-blue'
                            " dark @click="showAddSnackbar(index)">
                          <v-icon left>mdi-plus</v-icon>
                          新建任务
                        </v-btn>
                        <v-list>
                          <v-list-item v-for="(subItem, subIndex) in item.subItems" :key="subIndex" link
                            @click="linkTo(index, subIndex)">
                            <v-list-item-avatar>
                              <v-img :src="subItem.imageUrl"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                subItem.name
                              }}</v-list-item-title>
                            </v-list-item-content>
                            
                            <v-menu offset-y>
                              <template v-slot:activator="{ on }">
                                <v-icon small v-on="on">mdi-dots-vertical</v-icon>
                              </template>
                              <v-card>
                                <v-list>
                                  <v-list-item link @click="showDeleteSnackbar(subItem.id)">删除</v-list-item>
                                </v-list>
                              </v-card>
                            </v-menu>
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list>
              </v-navigation-drawer> -->
      <v-main class="grey lighten-3">
        
        <v-row>
          <v-col cols="12" fluid>
            <v-sheet max-width="100vw" min-height="100vh" rounded="lg">
              <router-view :key="$router.path"></router-view>
            </v-sheet>
          </v-col>
          <!-- <v-col cols="8" fluid>
            <v-sheet max-width="90vw" min-height="85vh" rounded="lg">
              <Result></Result>
            </v-sheet>
          </v-col> -->
          <!-- <router-view :key="$router.path"></router-view>
          <Result></Result> -->
        </v-row>
      </v-main>

      <!-- <Footer></Footer> -->
    </v-app>
  </div>
</template>

<script>
import { eventBus } from './EventBus.js';
import TopBar from "../components/TopBar.vue";
import Result from "../components/Result.vue";
import axios from "axios";
export default {
  components: {
    TopBar,
    Result,
  },
  data() {
    return {
      tid: null,
      server_url: "http://127.0.0.1:5003",
      items: [
        {
          imageUrl:
            "https://pic4.zhimg.com/80/v2-3567bf270cf3dac2e46e3efe7255645f_720w.webp",
          title: "SD",
          subItems: [
            { imageUrl: "...", title: "任务 1", id: 435654 },
            { imageUrl: "...", title: "任务 2", id: 543665 },
            // 其他子项...
          ],
        },
        {
          imageUrl:
            "https://www.weshop.com/_next/image?url=%2Freal.png&w=96&q=75",
          title: "Seg",
          subItems: [
            { imageUrl: "...", title: "任务 1", id: 435654 },
            { imageUrl: "...", title: "任务 2", id: 543665 },
            // 其他子项...
          ],
        },
        {
          imageUrl:
            "https://www.weshop.com/_next/image?url=%2Fproduct.png&w=96&q=75",
          title: "Color",
          subItems: [
            { imageUrl: "...", title: "任务 1", id: 435654 },
            { imageUrl: "...", title: "任务 2", id: 543665 },
            // 其他子项...
          ],
        },
        {
          imageUrl:
            "https://tse4-mm.cn.bing.net/th/id/OIP-C.o3IeWeSSkrhLv4mDMwlSUQAAAA?w=161&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          title: "一键抠图",
          subItems: [
            { imageUrl: "...", title: "任务 1", id: 435654 },
            { imageUrl: "...", title: "任务 2", id: 543665 },
            // 其他子项...
          ],
        },
        {
          imageUrl:
            "https://tse4-mm.cn.bing.net/th/id/OIP-C.lOvHihIDjYOMQPeWvsBz2gHaEl?w=203&h=126&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          title: "AI换脸",
          subItems: [
            { imageUrl: "...", title: "任务 1", id: 435654 },
            { imageUrl: "...", title: "任务 2", id: 543665 },
            // 其他子项...
          ],
        },
      ],
    };
  },
  created() {
    this.updateTask();
    console.log("updateTask!!");
  },
  mounted() {
  },
  methods: {
    linkTo(index, subIndex) {
      if (index === 0) {
        let item = this.items[index].subItems[subIndex];
        console.log(item)
        eventBus.$emit("updateSd", item.id, item.url_1, item.url_2, item.mask);
        this.$router.push("/home/sd/" + subIndex);

      }
      if (index === 1) {
        let item = this.items[index].subItems[subIndex];
        console.log(item.id, item.url_1, item.url_2);
        eventBus.$emit("updateSeg", item.id, item.url_1, item.url_2);
        this.$router.push("/home/seg/" + subIndex);

      }
      if (index === 2) {
        let item = this.items[index].subItems[subIndex];
        console.log(item)
        eventBus.$emit("updateColor", item.id, item.url_1, item.url_2, item.color, item.text_prompt, item.example, item.stroke, item.type);
        this.$router.push("/home/color/" + subIndex);


      }

    },
    updateTask() {
      const user_id = localStorage.getItem("user_id");
      let param = new FormData();
      param.append("user_id", user_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/api/task", param, config)
        .then((response) => {
          this.items[0].subItems = response.data.tasks0;
          this.items[1].subItems = response.data.tasks1;
          this.items[2].subItems = response.data.tasks2;
          // this.items[3].subItems = response.data.tasks3;
          // this.items[4].subItems = response.data.tasks4;
          console.log(this.items[0].subItems);
          console.log(this.items[1].subItems);
          console.log(this.items[2].subItems);

        })
        .catch((error) => {
          console.error(error);
        });
    },
    async showDeleteSnackbar(tid) {
      console.log("删除", tid);
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      let param = new FormData();
      param.append("user_id", user_id);
      param.append("tid", tid);
      let type = "0";
      if (String(this.$route.path).indexOf("sd") != -1) type = "0";
      else if (String(this.$route.path).indexOf("seg") != -1) type = "1";
      else if (String(this.$route.path).indexOf("color") != -1) type = "2";
      param.append("type", type);
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
      this.updateTask();
      console.log("updateTask!!");
    },
    async showAddSnackbar() {
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      let param = new FormData();
      param.append("user_id", user_id);
      let type = "0";
      if (String(this.$route.path).indexOf("sd") != -1) type = "0";
      else if (String(this.$route.path).indexOf("seg") != -1) type = "1";
      else if (String(this.$route.path).indexOf("color") != -1) { type = "2"; console.log('delete color!') };
      param.append("type", type);
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
      this.updateTask();
      console.log("updateTask!!");
    },
  },
};
</script>

<style scoped>
.logo {
  padding-bottom: 20px;
}
</style>
