<template>
  <v-container>
    <div class="music">
      <v-sheet
        :style="
          'background: url(' +
          imageLinks.parallaxBackground +
          ') no-repeat; background-size: 100%;'
        "
        class="mb-6"
        tile
        dark
      >
        <v-container class="px-6 pt-6">
          <SongSearch />
        </v-container>
      </v-sheet>
      <SongResults />
      <v-container v-if="loggedIn">
        <div class="text-body-2 pb-2 pt-5" v-if="!uploadVisible">
          Not enough music for you?
        </div>
        <div class="text-body-2 pb-2 pt-5" v-if="uploadVisible">
          Changed your mind?
        </div>

        <v-btn outlined @click="toggleUpload()" v-if="!uploadVisible"
          >Upload your own track</v-btn
        >
        <v-btn outlined @click="toggleUpload()" v-if="uploadVisible"
          >Nah, that's whack</v-btn
        >
        <UploadSongForm v-if="uploadVisible" />
      </v-container>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import reportBackground from "@/assets/blurrybackground.png";
import UploadSongForm from "@/components/UploadSongForm.vue";
import SongSearch from "@/components/QuerySongs.vue";
import SongResults from "@/components/SongList.vue";
import { mapState } from "vuex";

export default {
  name: "music",
  components: { SongSearch, SongResults, UploadSongForm },
  data: () => ({
    uploadVisible: false,
    charts: [
      {
        name: "Music production in 2020",
        value: [70, 10, 15, 1, 23, 1, 9, 60, 9, 7],
        datalabels: [
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    ],
    imageLinks: {
      parallaxBackground: reportBackground,
    },
  }),
  methods: {
    NavigatePage(link) {
      window.location.href = link;
    },
    randImg(num) {
      return "https://picsum.photos/200/100?grayscale&random=" + num;
    },
    toggleUpload() {
      this.uploadVisible = !this.uploadVisible;
    },
  },
  computed: {
    ...mapState(["userProfile"]),
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
  },
};
</script>
