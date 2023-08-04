<template>
  <div>
    <v-app-bar app color="white" flat>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <!-- <v-avatar class="mx-12" size="40" color="grey" v-on="on">
            <img src="../assets/14934ed0884cf5e98cc492467d3cd55.png" />
          </v-avatar> -->
          <img src="../assets/14934ed0884cf5e98cc492467d3cd55.png" />
        </template>
        <v-card>
          <v-list>
            <v-list-item link>我的算力</v-list-item>
            <v-list-item link>我的订单</v-list-item>
            <v-list-item link>退出登陆</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-container class="py-0 fill-height" @click="$router.go(0)">
        <v-btn text color="black" @click="$router.push(`/home/sd/0`)">款式AI</v-btn>
        <v-btn text color="black" @click="$router.push(`/home/seg/0`)"
          >模特AI</v-btn
        >
        <v-btn text color="black" @click="$router.push(`/home/color/0`)"
          >图案AI</v-btn
        >
        <v-btn text color="black" @click="$router.push(`/home/sd/0`)"
          >关于我们</v-btn
        >
      </v-container>
      <v-btn color="error" @click.prevent="loginOut">退出</v-btn>
      <!-- <v-responsive max-width="260" color="white">
                        <v-text-field dense flag hide-details rounded solo-inverted>

                        </v-text-field>
                </v-responsive> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Catelist: [],
      profileInfo: {},
    };
  },
  created() {
    this.getCateList();
    this.getProfile();
  },
  methods: {
    //获取分类
    //获取分类列表
    async getCateList() {
      const { data: result } = await this.$http.get("category");
      if (result.status != 200) return;
      this.Catelist = result.data;
    },
    async getProfile() {
      const { data: result } = await this.$http.get(`profile`);
      if (result.status != 200) return;
      this.profileInfo = result.data;
      console.log(this.profileInfo);
    },
    loginOut() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
