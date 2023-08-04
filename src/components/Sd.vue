<style></style>
<template>
  <div class="allcontainer">


    <v-container>
      <v-row>
        <v-col cols="6" fluid>


          <v-card class="result-card">
            <!-- <p class="noneText" v-if="tid != null">任务---{{ tid }}</p> -->
            <v-item-group mandatory>
              <v-container>
                <v-row>
                  <v-col v-for="n in 3" :key="n" cols="12" md="4">
                    <v-item v-slot="{ active, toggle }">
                      <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center" dark height="200"
                        @click="toggle">
                        <v-card-text class="image-text" v-if="active === false">yuan</v-card-text>
                        <v-scroll-y-transition>
                          <div v-if="active" class="text-h2 flex-grow-1 text-center">
                            Active
                          </div>
                        </v-scroll-y-transition>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
            <div v-if="zoomed">
              <div class="zoomed-image-container">
                <div class="close-button-back">
                  <div class="close-button" @click="closeZoom">X</div>
                </div>
                <img ref="myImage" :src="zoomedImage" />
              </div>
            </div>

            <div v-if="showCanvas">
              <canvas class="canvas" ref="canvas" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
                :style="canvasStyle"></canvas>
              <v-card-text class="image-text">原图</v-card-text>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-btn color="pink" dark text-color="white" @click="maskDone" class="mx-auto">完成</v-btn>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-btn color="pink" dark text-color="white" @click="restoreCanvas" class="mx-auto">返回</v-btn>
                </v-col>
              </v-row>
            </div>

            <div v-else>
              <v-row>
                <v-col cols="6">
                  <v-card class="upload-card">
                    <v-file-input v-model="selectedFile" @change="openImage" accept="image/*" placeholder="上传图片或者直接拖入"
                      v-if="selectedFile === null"></v-file-input>
                    <v-img :src="url_1" v-if="url_1" height="100%" @click="openZoom(url_1)"></v-img>
                  </v-card>
                  <v-card-text class="image-text">原图</v-card-text>
                </v-col>
                <v-col cols="6">
                  <v-card class="upload-card">
                    <v-file-input v-model="selectedFile" accept="image/*" placeholder="上传图片或者直接拖入"
                      v-if="selectedFile2 === null"></v-file-input>
                    <v-img :src="url_2" v-if="url_2" height="100%" @click="openZoom(url_2)"></v-img>
                  </v-card>
                  <v-card-text class="image-text">蒙版</v-card-text>
                </v-col>
              </v-row>

              <v-row>

              </v-row>

              <v-row justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-btn v-if="url_1 && url_2" color="pink" dark text-color="white" @click="generateImg"
                    class="mx-auto">生成</v-btn>
                </v-col>
              </v-row>

              <v-row style="position: fixed; bottom: 0; left: 55; width: 100%; padding: 40px;">
                <v-col cols="12" sm="6" md="4">
                  <v-btn color="pink" dark text-color="white" @click="showCanvas = true" class="mx-auto">蒙版</v-btn>
                </v-col>
              </v-row>

              <!-- <v-row>
        <v-col cols="12">
          <v-card class="result-card">
            <v-img
              :src="url_3"
              v-if="url_3 != ''"
              style="max-width: 100%; max-height: 100%"
              @click="openZoom(url_3)"
            ></v-img>
          </v-card>
          <v-card-text class="image-text">结果图</v-card-text>
        </v-col>
      </v-row> -->
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" fluid>
          <v-card class="result-card">
            <v-container>
              <v-row>
                <v-col v-for="(image, index) in images" :key="index" cols="4">
                  <v-card>
                    <v-img :src="image" height="400" v-if="(isRunning === true && index === 0) || index > 0"></v-img>
                    <div class="loader" v-if="(isRunning === false && index === 0)">
                      <img src="./1.gif" height="400" alt="动态图像">
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-img :src="url_3" v-if="url_3 != ''" style="max-width: 100%; max-height: 100%"
              @click="openZoom(url_3)"></v-img> -->
            <!-- <div style="display: flex; justify-content: center; align-items: center; width:600px; height:600px"> 
                <div id="wifi-loader" >
    <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Searching"></div>
</div>
              </div> -->
          </v-card>
          <v-card-text class="image-text">结果图</v-card-text>
          <!-- <v-card v-for="item in cardList" :key="item.id">
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
      </v-card> -->
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
      image: null,
      canvas: null,
      context: null,
      mouseDown: false,
      selectedFile: null,
      showCanvas: false,
      canvasScale: 1.5,
      canvasStyle: "", // 新增canvasStyle变量
      canvasHeight: null,
      canvasWidth: null,
      url_1: "",
      url_2: "",
      url_3: "",
      url1: "",
      server_url: "http://127.0.0.1:5003",
      mouseCoordinates: { x: 0, y: 0 },
      zoomedImage: "",
      zoomed: false,
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

      ],
      images: [

        // 添加更多图片...
      ],
      isRunning: false,
    };
  },
  created() {
    eventBus.$on("updateSd", (tid, url_1, url_2, mask) => {
      this.tid = tid;
      this.url_1 = url_1;
      this.url_3 = url_2;
      this.url_2 = mask;
    });
    this.$watch("showCanvas", (newValue) => {
      if (newValue) {
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.image.width; // 更新 Canvas 的宽度
        this.canvas.height = this.image.height; // 更新 Canvas 的高度
        this.context.drawImage(this.image, 0, 0);
        document.body.style.overflow = "hidden"; // 禁用滚动
      } else {
        this.canvasStyle = "";
        document.body.style.overflow = "auto"; // 启用滚动
      }
    });
  },

  methods: {
    openZoom(imageSrc) {
      this.zoomed = true;
      this.zoomedImage = imageSrc;
    },
    closeZoom() {
      this.zoomed = false;
      this.zoomedImage = "";
    },
    restoreCanvas() {
      this.showCanvas = false;
      document.body.style.overflow = "auto";
    },
    openImage() {
      const file = this.selectedFile;
      const reader = new FileReader();
      reader.onload = () => {
        this.image = new Image();
        this.image.src = reader.result;
        this.canvasWidth = this.image.width;
        this.url_1 = reader.result;
      };
      reader.readAsDataURL(file);
      let param = new FormData(); //创建form对象
      param.append("url_1", this.url_1); //通过append向form对象添加数据
      param.append("type", "0");
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("tid", this.tid);
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
    handleMouseDown(event) {
      this.mouseDown = true;
      this.mouseCoordinates.x = event.offsetX;
      this.mouseCoordinates.y = event.offsetY;
    },
    handleMouseUp(event) {
      if (this.mouseDown) {
        this.mouseDown = false;
        const x = event.offsetX;
        const y = event.offsetY;
        let flag;
        if (event.button === 0) {
          flag = 1;
        } else if (event.button === 2) {
          flag = 0;
        }
        // Send the mouse click coordinates to the backend
        this.sendCoordinatesToBackend(x, y, flag);
      }
    },
    maskDone() {
      this.sendCoordinatesToBackend(0, 0, 2);
    },
    drawImageOnCanvas() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");
      const image = new Image();
      image.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // 清空 Canvas
        this.context.drawImage(image, 0, 0); // 绘制图像到 Canvas
      };
      image.src = this.url_1;
    },
    sendCoordinatesToBackend(x, y, flag) {
      if (flag != 2) {
        this.url_1 = "";
        this.url_2 = "";
      }

      console.log(x, y, flag);
      const file = this.selectedFile;
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      param.append("x", x);
      param.append("y", y);
      param.append("flag", flag);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      axios
        .post(this.server_url + "/mask", param, config)
        .then((response) => {
          // Handle the response from the backend
          if (response.data.display_url != null)
            this.url_1 = response.data.display_url;
          if (flag == 2) {
            this.url_2 = response.data.mask_url;
            this.showCanvas = false;
          }

          if (flag != 2) this.drawImageOnCanvas();
          console.log(response);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
    },
    generateImg() {
      const file = this.selectedFile;
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      const file2 = this.selectedFile2;
      if (file2) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_2 = reader.result;
        };

        reader.readAsDataURL(file2);
      }
      let param = new FormData();
      param.append("file", file, file.name);
      param.append("mask", file2, file2.name);
      console.log(this.url_2);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift('image.jpg');
      this.isRunning = false;
      axios
        .post(this.server_url + "/generate1", param, config)
        .then((response) => {
          console.log(this.url_2);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@import "~vuetify/dist/vuetify.min.css";

.canvas {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);

  cursor: pointer;
  padding: 20px;
  border: 2px dashed #ccc;

  max-width: 100%;
  max-height: 100%;
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

.noneText {
  text-align: center;
}

.upload-card {
  height: 25vh;
  cursor: pointer;
  padding: 20px;
  border: 2px dashed #ccc;
}

.result-card {
  height: 85vh;
  padding: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  /* border: 2px solid #ccc; */
}

.image-text {
  text-align: center;
}

.list {
  font-size: 13px;
  color: gray;
}

.image-card {
  margin-bottom: 20px;
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

.mx-auto {
  display: block;
  width: 100%;
}



.spinner {
  width: 56px;
  height: 56px;

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
</style>
