import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Music from "../views/Music.vue";
import Chat from "../views/Chat.vue";
import FAQ from "../views/FAQ.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
import Settings from "../views/Settings.vue";
import UsersList from "../views/UsersList.vue";
import UserProfile from "../views/UserProfile.vue";
import UploadSong from "../views/UploadSong.vue";

import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    icon: "mdi-home",
    hidden: false
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
    icon: "mdi-chart-bell-curve",
    hidden: false
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    icon: "mdi-plus-box-outline",
    meta: {
      requiresAuth: true
    },
    hidden: true
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    icon: "mdi-apps",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    icon: "mdi-account",
    hidden: true
  },

  {
    path: "/createaccount",
    name: "Create Account",
    component: CreateAccount,
    icon: "mdi-account",
    hidden: true
  },
  {
    path: "/uploadsong",
    name: "Upload Song",
    component: UploadSong,
    icon: "mdi-song",
    hidden: true
  },

  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    },
    hidden: true
  },
  {
    path: "/users",
    name: "Users List",
    component: UsersList,
    meta: { 
      requiresAuth: true
    },
    hidden: false
  },
  {
    path: "/profile",
    name: "User Profile",
    component: UserProfile,
    meta: {
      requiresAuth: true
    },
    hidden: true
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
