<template>
  <div class="allcontainer">
    <v-container>
      <v-row>
        <v-col cols="6" fluid>
          <v-card class="result-card">
            <p class="noneText" v-if="tid != null">任务---{{ tid }}</p>
            <v-layout class="overflow-visible" style="height: 56px">
              <v-bottom-navigation v-model="value" color="teal" grow elevation="0">
                <v-btn class="custom-btn" elevation="0">
                  <v-layout align-center>
                    <v-flex>
                      <span>color_text</span>
                    </v-flex>
                    <v-flex>
                      <v-avatar size="24">
                        <v-img src="../assets/14934ed0884cf5e98cc492467d3cd55.png"></v-img>
                      </v-avatar>
                    </v-flex>
                  </v-layout>
                </v-btn>

                <v-btn class="custom-btn" elevation="0">
                  <v-layout align-center>
                    <v-flex>
                      <span>color_stroke</span>
                    </v-flex>
                    <v-flex>
                      <v-avatar size="24">
                        <v-img src="../assets/14934ed0884cf5e98cc492467d3cd55.png"></v-img>
                      </v-avatar>
                    </v-flex>
                  </v-layout>
                </v-btn>


                <v-btn class="custom-btn" elevation="0">
                  <v-layout align-center>
                    <v-flex>
                      <span>uncon</span>
                    </v-flex>
                    <v-flex>
                      <v-avatar size="24">
                        <v-img src="../assets/14934ed0884cf5e98cc492467d3cd55.png"></v-img>
                      </v-avatar>
                    </v-flex>
                  </v-layout>
                </v-btn>

                <v-btn class="custom-btn" elevation="0">
                  <v-layout align-center>
                    <v-flex>
                      <span>color_examplar</span>
                    </v-flex>
                    <v-flex>
                      <v-avatar size="24">
                        <v-img src="../assets/14934ed0884cf5e98cc492467d3cd55.png"></v-img>
                      </v-avatar>
                    </v-flex>
                  </v-layout>
                </v-btn>

                <!-- <v-btn> color_stroke </v-btn>

              <v-btn> uncon </v-btn>
              <v-btn> color_examplar </v-btn> -->
              </v-bottom-navigation>
            </v-layout>

            <div v-if="zoomed">
              <div class="zoomed-image-container">
                <div class="close-button-back">
                  <div class="close-button" @click="closeZoom">X</div>
                </div>
                <img ref="myImage" :src="zoomedImage" @click="recordClickPosition" />
                <div class="box" id="box"></div>
              </div>
            </div>

            <div v-if="value === 0">
              <!-- 文本部分 -->
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-card class="upload-card">
                      <v-file-input v-model="selectedFile" @change="upload" accept="image/*" placeholder="上传图片或者直接拖入"
                        v-if="selectedFile === null"></v-file-input>
                      <v-img :src="url_1" v-if="url_1" height="100%" @click="openZoom(url_1)"></v-img>
                    </v-card>
                    <v-card-text class="image-text">参考图</v-card-text>
                  </v-col>

                  <v-col cols="6">
                    <v-card-text class="image-text">画面描述:</v-card-text>
                    <v-textarea clearable clear-icon="mdi-close-circle" :label="InputText" :model-value="InputText"
                      placeholder="请在此输入文本"></v-textarea>
                    <v-card-text>示例:一只戴着帽子的狗</v-card-text>
                  </v-col>
                </v-row>
                <v-textarea clearable clear-icon="mdi-close-circle" :label="InputText" :model-value="InputText"
                  placeholder="请在此输入文本"></v-textarea>
                <v-row style="position: fixed; bottom: 0; left: 55; width: 100%; padding: 40px;">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn color="primary" @click="color_text" class="mx-auto">执行</v-btn>
                    <v-btn color="primary" dark text-color="white" @click="clearJob" class="mx-auto">重做</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </div>

            <div v-if="value === 1">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-card class="upload-card">
                      <v-file-input v-model="selectedFile" @change="upload" accept="image/*" placeholder="上传图片或者直接拖入"
                        v-if="selectedFile === null"></v-file-input>
                      <v-img :src="url_1" v-if="url_1" height="400" style="max-width: 100%; max-height: 100%"
                        @click="openZoom(url_1)"></v-img>
                    </v-card>
                    <v-card-text class="image-text">原图(图片点击放大，可选取坐标)</v-card-text>
                  </v-col>

                  <v-col cols="6">
                    <v-color-picker v-model="selectedColor" />
                  </v-col>
                </v-row>
                <!-- <v-row justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-color-picker v-model="selectedColor" />
                </v-col>
              </v-row> -->
                <v-row style="position: fixed; bottom: 0; left: 55; width: 100%; padding: 40px;">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn color="primary" @click="color_stroke" class="mx-auto">执行</v-btn>
                    <v-btn color="primary" dark text-color="white" @click="clearJob" class="mx-auto">重做</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </div>

            <div v-if="value === 2">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-card class="upload-card">
                      <v-file-input v-model="selectedFile" @change="upload" accept="image/*" placeholder="上传图片或者直接拖入"
                        v-if="selectedFile === null"></v-file-input>
                      <v-img :src="url_1" v-if="url_1" height="400" style="max-width: 100%; max-height: 100%"
                        @click="openZoom(url_1)"></v-img>
                    </v-card>
                    <v-card-text class="image-text">原图</v-card-text>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" sm="6" md="4">
                    <v-color-picker v-model="selectedColor" />
                  </v-col>
                </v-row>
                <v-row style="position: fixed; bottom: 0; left: 55; width: 100%; padding: 40px;">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn color="primary" @click="uncon" class="mx-auto">执行</v-btn>
                    <v-btn color="primary" dark text-color="white" @click="clearJob" class="mx-auto">重做</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </div>

            <div v-if="value === 3">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-card class="upload-card">
                      <v-file-input v-model="selectedFile" @change="upload" accept="image/*" placeholder="上传图片或者直接拖入"
                        v-if="selectedFile === null"></v-file-input>
                      <v-img :src="url_1" v-if="url_1" height="400" style="max-width: 100%; max-height: 100%"
                        @click="openZoom(url_1)"></v-img>
                    </v-card>
                    <v-card-text class="image-text">原图1</v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="upload-card">
                      <v-file-input v-model="selectedExamplar" @change="uploadExample" accept="image/*"
                        placeholder="上传图片或者直接拖入" v-if="selectedExamplar === null"></v-file-input>
                      <v-img :src="url_3" v-if="url_3" height="400" style="max-width: 100%; max-height: 100%"
                        @click="openZoom(url_3)"></v-img>
                    </v-card>
                    <v-card-text class="image-text">原图2</v-card-text>
                  </v-col>
                </v-row>

                <v-row style="position: fixed; bottom: 0; left: 55; width: 100%; padding: 40px;">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn color="primary" @click="color_examplar" class="mx-auto">执行</v-btn>
                    <v-btn color="primary" dark text-color="white" @click="clearJob" class="mx-auto">重做</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </div>
          </v-card>
        </v-col>

        <v-col cols="6" fluid>
          <v-card class="result-card">
            <v-container>
              <v-row>
                <v-col v-for="(image, index) in   images  " :key="index" cols="4">
                  <v-card>
                    <v-img :src="image" height="400" v-if="(isRunning === true && index === 0) || index > 0"></v-img>
                    <div class="loader" v-if="(isRunning === false && index === 0)">
                      <!-- <div class="spinner"></div> -->
                      <img src="./1.gif" height="400" alt="动态图像">
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
      selectedFile1: null,
      selectedColor: "#000000",
      selectedExamplar: null,
      uploadedImage: null,
      uploadedImage1: null,

      value: "0",

      selectedTags: [],
      url_1: "",
      url_2: "",
      url_3: "",
      server_url: "http://127.0.0.1:5003",
      url: "",

      isDrawing: false,
      mouseX: 0,
      mouseY: 0,
      zoomedImage: "",
      zoomed: false,
      timer: null,
      InputText: "",
      images: [

        // 添加更多图片...
      ],
      isRunning: false,
    };
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

    color_text() {
      const text_prompt = this.InputText;
      console.log(text_prompt);
      let file = "";
      let param = new FormData();
      if (typeof this.selectedFile === "string") {
        axios
          .get(this.selectedFile, { responseType: "blob" })
          .then((response) => {
            const blob = response.data;
            const filename = this.selectedFile.match(/\/([^/]+)$/)[1];
            file = new File([blob], filename);
            param.append("file", file, filename);
            console.log(file);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        file = this.selectedFile;
        param.append("file", file, file.name);
        console.log(file);
      }

      param.append("text_prompt", text_prompt);
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("tid", this.tid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift('image.jpg');
      this.isRunning = false;
      axios
        .post(this.server_url + "/color_text", param, config)
        .then((response) => {
          this.url_1 = response.data.image_url;
          this.images.shift();
          this.images.unshift(response.data.draw_url);
          this.isRunning = true;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    color_examplar() {
      const file = this.selectedFile;
      const examplar = this.selectedExamplar;
      if (file) {
        const reader = new FileReader();
        const reader1 = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_1 = reader.result;
        };
        reader1.onload = () => {
          this.uploadedImage = examplar;
        };

        reader.readAsDataURL(file);
        reader1.readAsDataURL(examplar);
      }

      if (examplar) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = examplar;
          this.url_3 = reader.result;
        };

        reader.readAsDataURL(examplar);
      }

      let param = new FormData();
      param.append("file", file, file.name);
      param.append("examplar", examplar, examplar.name);
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("tid", this.tid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift('image.jpg');
      this.isRunning = false;
      axios
        .post(this.server_url + "/color_examplar", param, config)
        .then((response) => {
          this.url_1 = response.data.image_url;
          this.images.shift();
          this.images.unshift(response.data.draw_url);
          this.isRunning = true;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    color_stroke() {
      const file = this.selectedFile;
      const color = this.selectedColor;
      const mouseX = this.mouseX;
      const mouseY = this.mouseY;

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      let param = new FormData();
      param.append("file", file, file.name);
      param.append("color", color);
      console.log(color);
      // console.log(mouseCoordinates['x'])
      // console.log(width)
      // console.log(mouseCoordinates['x']/width)
      param.append("rx", mouseX);
      param.append("ry", mouseY);
      param.append("user_id", localStorage.getItem("user_id"));
      param.append("tid", this.tid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift('image.jpg');
      this.isRunning = false;
      axios
        .post(this.server_url + "/color_stroke", param, config)
        .then((response) => {
          this.url_1 = response.data.image_url;
          this.images.shift();
          this.images.unshift(response.data.draw_url);
          this.isRunning = true;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    uncon() {
      const file = this.selectedFile;
      const color = this.selectedColor;
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage = file;
          this.url_1 = reader.result;
        };

        reader.readAsDataURL(file);
      }
      let param = new FormData();
      param.append("file", file, file.name);
      param.append("color", color);
      param.append("user_id", localStorage.getItem("user_id"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      this.images.unshift('image.jpg');
      this.isRunning = false;
      axios
        .post(this.server_url + "/color_uncon", param, config)
        .then((response) => {
          this.url_1 = response.data.image_url;
          this.images.shift();
          this.images.unshift(response.data.draw_url);
          this.isRunning = true;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    upload() {
      this.url_1 = "";
      this.url_2 = "";
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
      param.append("url_1", this.url_1); //通过append向form对象添加数据
      param.append("type", "2");
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
          console.log("color upload");
          this.$emit("child-event");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadExample() {
      this.url_3 = "";
      const file1 = this.selectedExamplar;
      if (file1) {
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImage1 = file1;
          this.url_3 = reader.result;
        };

        reader.readAsDataURL(file1);
      }
      let param = new FormData(); //创建form对象
      param.append("url_3", this.url_3); //通过append向form对象添加数据
      param.append("type", 3);
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
          this.$emit("child-event");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearJob() {
      this.url_1 = "";
      this.url_2 = "";
      this.url_3 = '';
      this.selectedFile = null;
      this.selectedExamplar = null;
    },
  },
  created() {
    eventBus.$on("updateColor", (tid, url_1, url_2, color, text_prompt, example, stroke, type) => {
      this.tid = tid;
      this.url_1 = url_1;
      this.selectedFile = this.url_1;
      if (this.url_1 == "NULL") {
        this.url_1 = "";
        this.selectedFile = "";
      }
      this.url_3 = example;
      this.selectedExamplar = this.url_3;
      if (this.url_3 == "NULL") {
        this.url_3 = "";
        this.selectedExamplar = "";
      }
      this.url_2 = url_2;
      if (color != "NULL") this.selectedColor = color;
      this.InputText = text_prompt;
      this.value = type;
      console.log('color,', this.tid, this.url_1, this.url_2)
    });
  },
};
</script>

<style scoped>
@import "~vuetify/dist/vuetify.min.css";

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
  /* overflow-y: auto; */
  max-height: 100vh;
  max-width: 100vw;
  /* 设置容器的最大高度 */
  /* overflow-x: hidden; */
  /* 去掉横向滚动条 */
  /* background-color: black; */
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

.custom-btn {
  width: 100%;
}




.spinner {
  width: 56px;
  height: 400px;

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
