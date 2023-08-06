<template>
  <div class="allcontainer">
    <!-- <p class="noneText" v-if="tid === null">选择任务来体验功能吧!</p> -->
    <v-container>
      <v-row>
        <v-col cols="6" fluid>
          <!-- <p class="noneText" v-if="tid != null">任务---{{ tid }}</p> -->

          <div v-if="zoomed">
            <div class="zoomed-image-container">
              <div class="close-button-back">
                <div class="close-button" @click="closeZoom">X</div>
              </div>
              <img
                ref="myImage"
                :src="zoomedImage"
                @click="recordClickPosition"
              />
              <div class="box" id="box"></div>
            </div>
          </div>

          <v-card class="result-card">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-card class="upload-card" @click="handleClick">
                    <v-file-input
                      v-model="selectedFile"
                      @change="update"
                      accept="image/*"
                      placeholder="上传图片或者直接拖入"
                      v-if="selectedFile === null"
                    ></v-file-input>
                    <!-- <viewer :images="images"></viewer> -->
                    <img
                      :src="url_1"
                      v-if="url_1"
                      height="400"
                      style="max-width: 100%; max-height: 100%"
                      @click="aaa(url_1)"
                    />
                  </v-card>
                  <v-card-text class="image-text">原图</v-card-text>
                  <!-- 新建时可以进行图片的新增和删除。修改时只能展示之前上传的图片，点重新上传会将之前上传的图片清空，之后可以进行重新上传图片的新增和删除 -->
                </v-col>
              </v-row>
              <v-row>
                <p style="margin-top: 20px">
                  面具（下列头像仅代表模特类型和性别）
                </p>

                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="(item, index) in PeopleImgList"
                      :key="index"
                      cols="12"
                      md="4"
                      lg="3"
                    >
                      <v-card
                        class="image-card"
                        :class="{ selected: item.selected }"
                        outlined
                        @click="selectPeopleImage(item)"
                      >
                        <v-img :src="item.src" :alt="item.alt"></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- 纸片组 -->
                <v-row justify="space-around">
                  <v-col cols="auto">
                    <v-chip-group multiple v-model="selectedTags">
                      <v-chip
                        v-for="(tag, index) in tags"
                        :key="index"
                        @click="toggleTag(tag)"
                        :class="{ blue: selectedTags.includes(tag) }"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>

                <p style="margin-top: 20px">地点</p>
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="(item, index) in PlaceImgList"
                      :key="index"
                      cols="12"
                      md="4"
                      lg="3"
                    >
                      <v-card
                        class="image-card"
                        :class="{ selected: item.selected }"
                        outlined
                        @click="selectPlaceImage(item)"
                      >
                        <v-img :src="item.src" :alt="item.alt"></v-img>
                        <p style="text-align: center">{{ item.alt }}</p>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-row>

              <v-row
                style="
                  position: fixed;
                  bottom: 0;
                  left: 55;
                  width: 100%;
                  padding: 40px;
                "
              >
                <v-col cols="12" sm="6" md="4">
                  <!-- <v-btn color="primary" @click="color_examplar" class="mx-auto">执行</v-btn> -->
                  <v-btn
                    color="light-green"
                    dark
                    text-color="white"
                    @click="seg"
                    class="mx-auto"
                    >裁切</v-btn
                  >
                  <v-btn
                    color="light-green"
                    dark
                    text-color="white"
                    @click="clearJob"
                    class="mx-auto"
                    >重做</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="6" fluid>
          <v-card class="result-card">
            <v-container>
              <v-row>
                <v-col v-for="(image, index) in images" :key="index" cols="4">
                  <v-card>
                    <v-img
                      :src="image"
                      height="400"
                      v-if="(isRunning === true && index === 0) || index > 0"
                    ></v-img>
                    <div
                      class="loader"
                      v-if="isRunning === false && index === 0"
                    >
                      <img src="./1.gif" height="400" alt="动态图像" />
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card-text class="image-text">结果图</v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../views/EventBus.js";
import axios from "axios";
export default {
  data() {
    return {
      tid: null,
      selectedFile: null,
      resultImageUrl: null,
      value: 0,
      url_1: "",
      url_2: "",
      server_url: "http://127.0.0.1:5003",
      url: "",
      zoomed: false,
      zoomedImage: "",
      isDrawing: false,
      mouseX: 0,
      mouseY: 0,
      PeopleImgList: [
        {
          src: "https://ai-image.weshop.com/2e0ed02c-a340-45e4-94f7-fb673f789bd2.png?w=384",
          alt: "Image 1",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/c9fbbc00-882e-4e62-8ed0-24ae9d9f6dcf.png?w=384",
          alt: "Image 2",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/ea5caebe-cf0a-4afa-8682-d160271ff82e.png?w=384",
          alt: "Image 3",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/3c0aa4b9-3e2f-46ee-b007-d389f5fc7e0e.png?w=384",
          alt: "Image 4",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/19bcc169-61bb-41e6-9271-1db56c286633.png?w=384",
          alt: "Image 5",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/8020f99c-48fa-46fa-93b3-c131db1af65e.png?w=384",
          alt: "Image 6",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/a2c95708-6d76-40e4-96b1-516c41952a49.jpeg?w=384",
          alt: "Image 7",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/7d103f46-1870-45b7-b964-4d87f74904af.png?w=384",
          alt: "Image 8",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/589721bf-57e6-42d4-b5a0-1762943c2529.png?w=384",
          alt: "Image 9",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/4314366b-7fe5-411f-b1aa-242afe676d8b.png?w=384",
          alt: "Image 10",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/05713c25-1d1a-4843-9480-5d8f8c982ecc.png?w=384",
          alt: "Image 11",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/39bf919c-41a2-421c-9aff-3a5ecd1fa284.png?w=384",
          alt: "Image 12",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/1988e7a1-9e09-49a8-aec8-d5578a2ca2c3.png?w=384",
          alt: "Image 13",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/4ba7ccb2-5a4d-4ae4-afd7-076a2a5740c1.png?w=384",
          alt: "Image 14",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/0056c61d-92fe-460c-b88d-934dc59999fc.png?w=384",
          alt: "Image 15",
          selected: false,
        },
        // 添加更多图片...
      ],
      PlaceImgList: [
        {
          src: "https://ai-image.weshop.com/ad30c49b-0c28-458b-be06-4b1f73a10965.png?w=256",
          alt: "海边",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/20c29716-f083-41f1-8c26-db9df6f37135.png?w=256",
          alt: "街拍",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/579f1418-3561-4a20-90e3-8ca85ec4c19a.png?w=256",
          alt: "大笑校园",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/0a0de169-bddf-41ed-97a3-dbc5e69ad3e9.png?w=256",
          alt: "人文建筑景点",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/4d67880e-a8bb-4d23-985e-e66273530adb.png?w=256",
          alt: "公园",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/ed065968-8766-4c52-91a3-98ba85c1a2e4.png?w=256",
          alt: "乡村",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/6802b346-bb70-454f-9699-9816452a9531.png?w=256",
          alt: "郊外",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/42e20f55-06d5-4bac-b809-180fa498e9e8.png?w=256",
          alt: "温泉",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/5f37d2f9-ddbd-412b-8020-49f5ce12c4c9.png?w=256",
          alt: "写字楼",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/b6804c0e-da24-4fee-a356-e767b9a81b26.png?w=256",
          alt: "泳池",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/6cfe6672-9799-4b78-8a43-018fbd7a12df.png?w=256",
          alt: "巷子",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/a4d00110-3070-49b3-980f-31a00b1738d3.png?w=256",
          alt: "树林",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/e620fb0e-78e1-4887-828c-f1f71d510c0d.png?w=256",
          alt: "纯色摄影棚",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/c60bc7c7-34b9-4624-93de-0c8acc28c185.png?w=256",
          alt: "客厅",
          selected: false,
        },
        {
          src: "https://ai-image.weshop.com/35fb463c-980c-42c5-aa37-e8f135751c5f.png?w=256",
          alt: "卧室",
          selected: false,
        },
        // 添加更多图片...
      ],
      tags: [
        "大笑",
        "微笑",
        "时尚高冷",
        "气质",
        "优雅",
        "单纯",
        "婴儿",
        "儿童",
        "大童",
        "少年",
        "青年",
        "中年",
        "老年",
      ],
      selectedTags: [],
      images: [
        // 添加更多图片...
        "https://ai-image.weshop.com/35fb463c-980c-42c5-aa37-e8f135751c5f.png?w=256",
      ],
      isRunning: false,
      viewImages: [],
    };
  },

  methods: {
    aaa(url_1) {
      this.viewImages.push(url_1);
      const $viewer = this.$viewerApi({
        images: this.viewImages.filter((image) => image === url_1),
      });
    },
    selectPeopleImage(item) {
      for (var i = 0; i < this.PeopleImgList.length; i++) {
        this.PeopleImgList[i].selected = false;
      }
      item.selected = !item.selected;
    },
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
      } else {
        this.selectedTags.push(tag);
      }

      console.log(this.selectedTags);
    },
    selectPlaceImage(item) {
      for (var i = 0; i < this.PlaceImgList.length; i++) {
        this.PlaceImgList[i].selected = false;
      }
      item.selected = !item.selected;
    },
    openZoom(imageSrc) {
      this.zoomed = true;
      this.zoomedImage = imageSrc;
    },
    closeZoom() {
      this.zoomed = false;
      this.zoomedImage = "";
    },
    recordClickPosition(event) {
      const rect = event.target.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;

      var box = document.getElementById("box");

      box.style.position = "absolute";
      box.style.top = this.mouseY + "px";
      box.style.left = this.mouseX + "px";
      box.style.width = "50px";
      box.style.height = "50px";
      box.style.border = "2px solid red";

      const width = this.$refs.myImage.clientWidth;
      const height = this.$refs.myImage.clientHeight;
      this.mouseX = this.mouseX / width;
      this.mouseY = this.mouseY / height;
    },
    handleClick() {
      this.$refs.fileInput.click();
    },
    seg() {
      const file = this.selectedFile;

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("tid", this.tid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }; //添加请求头
      this.images.unshift("image.jpg");
      this.isRunning = false;
      axios
        .post(this.server_url + "/seg", param, config)
        .then((response) => {
          this.url_1 = response.data.image_url;
          this.images.shift();
          this.images.unshift(response.data.draw_url);
          this.isRunning = true;
          console.log(this.url_1);
        })
        .catch((error) => {
          this.isRunning = false;
          console.log(error);
        });
    },
    update() {
      const file = this.selectedFile;

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      let param = new FormData(); //创建form对象
      param.append("url_1", this.url_1); //通过append向form对象添加数据
      param.append("type", "1");
      param.append("user_id", localStorage.getItem("user_id"));
      console.log(this.url_1);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }; //添加请求头
      axios
        .post(this.server_url + "/upload", param, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearJob() {
      this.url_1 = "";
      this.url_2 = "";
      this.selectedFile = null;
    },
  },
  created() {
    eventBus.$on("updateSeg", (tid, url_1, url_2) => {
      this.tid = tid;
      this.url_1 = url_1;
      this.selectedFile = this.url_1;
      if (this.url_1 == "NULL") {
        this.url_1 = "";
        this.selectedFile = "";
      }
      this.url_2 = url_2;
      console.log("seg,", this.tid, this.url_1, this.url_2);
    });
  },
};
</script>

<style scoped>
@import "~vuetify/dist/vuetify.min.css";

.noneText {
  text-align: center;
}

.upload-card {
  height: 250px;
  cursor: pointer;
  padding: 20px;
  border: 2px dashed #ccc;
}

.result-card {
  height: 85vh;
  padding: 0px;
  overflow-y: auto;
  overflow-x: hidden;
}

.image-text {
  text-align: center;
}

.list {
  font-size: 13px;
  color: gray;
}

.image-card {
  margin-bottom: 10px;
}

.selected {
  outline: 5px solid blue;
}

.allcontainer {
  overflow-y: auto;
  max-height: 850px;
  /* 设置容器的最大高度 */
  overflow-x: hidden;
  /* 去掉横向滚动条 */
}

.aaa {
  display: flex;
  justify-content: center;
}

.zoomed {
  transform: scale(1);
  /* cursor: zoom-out; */
  z-index: 99999;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* 半透明背景颜色 */
  z-index: 9998;
}

.zoomed-image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 91;
  max-width: 100%;
  max-height: 100%;
}

.zoomed-image-container img {
  cursor: move;
  z-index: 92;
  max-width: 50%;
  max-height: 50%;
}

.close-button-back {
  background-color: white;
  width: 50%;
  height: 20px;
  z-index: 92;
}

.close-button {
  width: 20px;
  height: 20px;
  float: right;
  cursor: pointer;
  z-index: 93;
}

.mx-auto {
  display: block;
  width: 100%;
}

.result {
  height: 80vh;
  padding: 0px;
  border: 2px solid #ccc;
}

.spinner {
  width: 56px;
  height: 200px;

  display: grid;
  border: 4.5px solid #0000;
  border-radius: 50%;
  border-color: #dbdcef #0000;
  animation: spinner-e04l1k 1s infinite linear;
}

.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  margin: 2.2px;
  border: inherit;
  border-radius: 50%;
}

.spinner::before {
  border-color: #474bff #0000;
  animation: inherit;
  animation-duration: 0.5s;
  animation-direction: reverse;
}

.spinner::after {
  margin: 8.9px;
}

@keyframes spinner-e04l1k {
  100% {
    transform: rotate(1turn);
  }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 可选：设置容器的宽度和高度 */
  width: 100%;
  height: 100%;
  /* padding-bottom: 50%; */
}

.selected {
  outline: 5px solid blue;
}
</style>
