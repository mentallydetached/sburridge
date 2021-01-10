<template>
  <v-app>
    <div :class="appBG">
      <v-container class="pa-0">
        <br class="d-none d-md-flex" />
        <v-card outlined class="pa-3 lifted" tile>
          <v-img
            :src="imageLinks.siteBanner"
            class="d-xl-none"
            v-if="!this.$vuetify.theme.dark"
          ></v-img>
          <v-img
            :src="imageLinks.siteBannerDark"
            class="d-xl-none"
            v-if="this.$vuetify.theme.dark"
          ></v-img>
          <v-app-bar
            class="d-none d-xl-flex elevation-0"
            color="#1F4565"
            dark
            prominent
            :src="imageLinks.blurryBackground"
            ><v-app-bar-title class="text-h3 text-uppercase"
              >Spencer Burridge</v-app-bar-title
            >
          </v-app-bar>
          <v-container>
            <v-tabs grow :value="tabIndex">
              <v-tab
                class="pa-0 ma-0"
                style="min-width: 0px; max-width: 0px; display: none"
              />
              <v-tab
                v-for="route in routeCalculation"
                :key="route.path"
                :to="route.path"
                >{{ route.name }}
              </v-tab>

              <v-menu bottom left :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    class="mr-4"
                    style="min-width: 46px; width: 46px; height: 46px"
                    v-on="on"
                  >
                    <v-icon v-if="!loggedIn || !userProfile.profileImage"
                      >mdi-account</v-icon
                    >
                    <v-avatar
                      v-if="loggedIn && userProfile.profileImage"
                      size="46"
                    >
                      <v-img :src="userProfile.profileImage" />
                    </v-avatar>
                  </v-btn>
                </template>

                <v-list style="width: 270px">
                  <div v-if="!loggedIn">
                    <LoginForm />
                    <div class="pt-4">Don't have an account?</div>
                    <v-btn outlined class="ma-2" href="/createaccount"
                      >Create an Account</v-btn
                    >
                  </div>
                  <v-btn text block v-if="loggedIn" to="/settings"
                    >Account</v-btn
                  >
                  <v-btn text block v-if="loggedIn" @click="logout"
                    >Log out</v-btn
                  >
                </v-list>
              </v-menu>
            </v-tabs>
          </v-container>
          <router-view />
          <div class="py-10 d-flex d-md-none">&nbsp;</div>
          <div class="py-3 d-flex d-md-none">&nbsp;</div>
        </v-card>
        <div class="py-10 d-none d-md-flex">&nbsp;</div>
        <div class="py-8 d-none d-md-flex">&nbsp;</div>
        <div
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: 1.0,
            },
          }"
          class="d-none d-md-flex"
        >
          &nbsp;
        </div>
        <MusicPlayer
          :link="musicPlayerData.link"
          :artist="musicPlayerData.artist"
          :song="musicPlayerData.song"
          v-if="musicPlayerData.link"
          @close="closePlayer"
          id="musicPlayer"
          class="ma-0 py-0"
          :class="{ musicPlayerFooter: isIntersecting }"
        />
      </v-container>
    </div>

    <v-footer
      padless
      class="hiddenFooter d-none d-md-flex"
      v-bind:class="{ footer: isIntersecting }"
    >
      <v-card tile class="text-center" style="width: 100vw" outlined>
        <v-card-text class="pa-0">
          <v-row align="center" justify="center">
            <v-col cols="2">
              <v-btn
                icon
                @click="changeTheme()"
                style="cursor: pointer; user-select: none"
              >
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-btn>
              <v-btn
                icon
                style="cursor: pointer; user-select: none"
                :to="!loggedIn ? '/login' : '/settings'"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-col>
            <v-col class="overline">
              <span v-for="(route, index) in routeCalculation" :key="index">
                <a :href="route.path">{{ route.name }}</a>
                <span v-if="index + 1 < routeCalculation.length"> | </span>
              </span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="pa-2">
          {{ new Date().getFullYear() }} —
          <strong>Spencer Burridge</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>


<script>
import { mapState } from "vuex";
import MusicPlayer from "@/components/MusicPlayer";

export default {
  name: "App",
  components: { MusicPlayer },
  data: () => ({
    flag: false,
    menuToggle: false,
    isIntersecting: false,
    appBG: "brightBG" /*"blue-grey lighten-5"*/,
    imageLinks: {
      siteBanner: require("@/assets/banner.png"),
      siteBannerDark: require("@/assets/bannerdark.png"),
      blurryBackground: require("@/assets/blurrybackgroundsquare.png"),
      defaultProfile: require("@/assets/bluebg.png"),
    },
  }),
  methods: {
    close: function () {
      this.flag = false;
    },
    openEgg: function () {
      this.flag = true;
    },
    onClickInside() {
      this.menuToggle = true;
    },
    onClickOutside() {
      this.active = false;
    },
    onIntersect(entries) {
      this.isIntersecting = entries[0].intersectionRatio >= 1.0;
    },
    changeTheme() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        this.appBG = "brightBG";
      } else {
        this.$vuetify.theme.dark = true;
        this.appBG = "darkBG";
      }
    },
    toggleBG() {
      if (this.appBG === "brightBG" || this.appBG === "darkBG") {
        this.appBG = "";
      } else {
        if (this.$vuetify.theme.dark) {
          this.appBG = "darkBG";
        } else {
          this.appBG = "brightBG";
        }
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
    closePlayer() {
      this.$store.dispatch("setPlayerData", {
        link: "",
        artist: "",
        song: "",
      });
    },
  },
  mounted() {},
  computed: {
    ...mapState(["userProfile"]),
    ...mapState(["musicPlayerData"]),
    loggedIn() {
      let email;
      try {
        email = this.userProfile.email;
      } catch (err) {
        this.logout();
      }
      if (email) {
        return true;
      } else {
        return false;
      }
    },
    routeCalculation() {
      return this.$router.options.routes.filter((item) => {
        return this.$router.options.routes.every(() => !item.hidden);
      });
    },
    routeValid() {
      let currentPage = this.$route.path;
      let valObj = this.routeCalculation.filter(function (elem) {
        return elem.path === currentPage ? elem : null;
      });
      return valObj.length !== 0 ? true : false;
    },
    tabIndex() {
      if (!this.routeValid) {
        return 1;
      } else {
        return this.$route.index;
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap");

#title {
  font-family: "Manrope", "Avenir", Helvetica, Arial, sans-serif;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
#fsegg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}
#close {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
#musicPlayer {
  position: fixed;
  padding-left: 0 !important;
  bottom: 0;
  z-index: 1;
  transition: bottom 0.5s;
}

.musicPlayerFooter {
  bottom: 4.7rem !important;
}
.footer {
  bottom: 0px !important;
  z-index: 2;
}
.hiddenFooter {
  transition: bottom 0.5s;
  position: fixed;
  left: 0;
  right: 0;
  bottom: -100px;
}
.v-slide-group__prev {
  display: none !important;
}
.brightBG {
  background-color: #f5f5f5 !important;
  background-image: linear-gradient(
      30deg,
      #f1f1f1 12%,
      transparent 12.5%,
      transparent 87%,
      #f1f1f1 87.5%,
      #f1f1f1
    ),
    linear-gradient(
        150deg,
        #f1f1f1 12%,
        transparent 12.5%,
        transparent 87%,
        #f1f1f1 87.5%,
        #f1f1f1
      ),
      linear-gradient(
          30deg,
          #f1f1f1 12%,
          transparent 12.5%,
          transparent 87%,
          #f1f1f1 87.5%,
          #f1f1f1
        ),
        linear-gradient(
            150deg,
            #f1f1f1 12%,
            transparent 12.5%,
            transparent 87%,
            #f1f1f1 87.5%,
            #f1f1f1
          ),
          linear-gradient(
              60deg,
              #f7f7f7 25%,
              transparent 25.5%,
              transparent 75%,
              #f7f7f7 75%,
              #f7f7f7
            ),
            linear-gradient(
              60deg,
              #f7f7f7 25%,
              transparent 25.5%,
              transparent 75%,
              #f7f7f7 75%,
              #f7f7f7
            ) !important;
  background-size: 80px 140px !important;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px !important;
  background-repeat: repeat;
  min-height: 100vh;
}
.darkBG {
  background-color: #000000 !important;
  background-image: linear-gradient(
      30deg,
      #0A0A0A 12%,
      transparent 12.5%,
      transparent 87%,
      #0A0A0A 87.5%,
      #0A0A0A
    ),
    linear-gradient(
        150deg,
        #0A0A0A 12%,
        transparent 12.5%,
        transparent 87%,
        #0A0A0A 87.5%,
        #0A0A0A
      ),
      linear-gradient(
          30deg,
          #0A0A0A 12%,
          transparent 12.5%,
          transparent 87%,
          #0A0A0A 87.5%,
          #0A0A0A
        ),
        linear-gradient(
            150deg,
            #0A0A0A 12%,
            transparent 12.5%,
            transparent 87%,
            #0A0A0A 87.5%,
            #0A0A0A
          ),
          linear-gradient(
              60deg,
              #070707 25%,
              transparent 25.5%,
              transparent 75%,
              #070707 75%,
              #070707
            ),
            linear-gradient(
              60deg,
              #070707 25%,
              transparent 25.5%,
              transparent 75%,
              #070707 75%,
              #070707
            ) !important;
  background-size: 80px 140px !important;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px !important;
  background-repeat: repeat;
  min-height: 100vh;
}
.brightBG:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  box-shadow: inset 0 0 100px 80px #f1f1f1;
}
.lifted {
  z-index: 1;
}
.hyperlink {
  background: transparent !important;
  cursor: pointer !important;
}
.hyperlink:hover {
  text-decoration: underline;
}
</style>
