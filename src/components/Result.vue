<template>
  <div class="container">
    <v-container fluid>
      <v-card v-for="item in cardList" :key="item.id">
        <v-card-actions>
          <v-avatar color="grey lighten-1" size="40">
            <v-img src="@/assets/my4.jpg" @click="zoomImage(image)" />
          </v-avatar>
          <div class="ml-2">{{ item.name }}</div>
          <div class="flex-grow-1"></div>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-text>
          <v-row>
            <v-col v-for="(image, index) in item.images" :key="index" cols="3">
              <v-img :src="image" @click="zoomImage(image)" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-subtitle>{{ item.datetime }}</v-card-subtitle>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "./EventBus.js";
export default {
  created() {},
  data() {
    return {
      cardList: [
        {
          id: 1,
          name: "John Doe",
          datetime: "2023-07-01 10:00 AM",
          images: [
            require("@/assets/my4.jpg"),
            require("@/assets/my4.jpg"),
            require("@/assets/my4.jpg"),
            require("@/assets/my4.jpg"),
          ],
        },
        // {
        //   id: 2,
        //   name: "John Doe",
        //   datetime: "2023-07-01 10:00 AM",
        //   images: [
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //   ],
        // },
        // {
        //   id: 3,
        //   name: "John Doe",
        //   datetime: "2023-07-01 10:00 AM",
        //   images: [
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //   ],
        // },
        // {
        //   id: 4,
        //   name: "John Doe",
        //   datetime: "2023-07-01 10:00 AM",
        //   images: [
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //     require("@/assets/my4.jpg"),
        //   ],
        // },
        // Add more card items here
      ],
      tid: null,
    };
  },
  methods: {
    zoomImage(image) {
      // Code to enlarge the clicked image goes here
      // You can use a modal or any other method to display the enlarged image
      console.log(image);
    },
    async GetTaskResult() {
      //这里获取该任务的结果数组，保存到cardlist里面
    },
  },
  mounted() {
    // 监听事件并更新状态
    eventBus.$on("updateStatus", (status) => {
      this.tid = status;
    });
  },
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  max-height: 850px;
  /* 设置容器的最大高度 */
}
</style>
