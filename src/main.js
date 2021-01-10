import Vue from "vue";
import store from "@/store";
import App from "@/App.vue";
import router from "@/router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import LoginForm from "@/components/LoginForm.vue";
import { auth } from "@/firebase";

Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.component("LoginForm", LoginForm);

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify: new Vuetify({
        theme: {
          dark: false,
          themes: {
            dark: {
              primary: "#2179bf",
              accent: "#FAA22D",
              secondary: "#7E8B95",
              success: "#168B0F",
              info: "#352654",
              warning: "#F3D449",
              error: "#CB5E68"
            },
            light: {
              primary: "#0e5e9e",
              accent: "#208c19",
              secondary: "#a80c10",
              success: "#1d8a39",
              info: "#959595",
              warning: "#c9b112",
              error: "#a10a17"
            }
          }
        },
        breakpoint: {
          thresholds: {
            xs: 340,
            sm: 540,
            md: 800,
            lg: 1280
          }
        }
      }),
      render: (h) => h(App)
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});
