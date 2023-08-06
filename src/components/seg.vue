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
                    <img
                      :src="url_1"
                      v-if="url_1"
                      style="max-width: 100%; max-height: 100%"
                      @click="lookInViewer(url_1)"
                    />
                  </v-card>
                  <v-card-text class="image-text">原图</v-card-text>
                </v-col>

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
                      @click="lookInViewer(image)"
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



      images: [
        // 添加更多图片...
      ],
      viewerImages: [],
      isRunning: false,
    };
  },
  methods: {

    lookInViewer(url_1) {
      console.log("aaa");
      this.viewerImages.push(url_1);

      const $viewer = this.$viewerApi({
        images: this.viewerImages.filter((image) => image === url_1),
      });
    },
    loadHistory() {
      let param = new FormData();
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("type", 2);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift("image.jpg");
      this.isRunning = false;
      axios
        .post(this.server_url + "/load", param, config)
        .then((response) => {
          console.log(response.data.urls);
          let array;
          if (response.data.urls != "") {
            array = JSON.parse(response.data.urls);
            console.log(array);
            this.images.shift();
            if (array.length > 0) {
              for (let i = 0; i < array.length - 1; i++) {
                this.images.unshift(array[i]);
              }
            }
          } else {
            this.images.shift();
          }


          this.isRunning = true;
          console.log(this.images);
        })
        .catch((error) => {
          console.log(error);
        });
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

      this.images.unshift("1.gif");

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
    },
    clearJob() {
      this.url_1 = "";
      this.url_2 = "";
      this.selectedFile = null;
    },
  },
  created() {
    this.loadHistory();
  },
};
</script>

<style scoped>
@import "~vuetify/dist/vuetify.min.css";

.noneText {
  text-align: center;
}

.upload-card {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-height: 90%;
  padding: 20px;
  border: 2px dashed #ccc;
}

.upload-card img {
  object-fit: contain;
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
