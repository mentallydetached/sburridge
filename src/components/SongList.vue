<template>
  <div class="querysongs">
    <v-row>
      <v-col
        v-for="song in songsList"
        :key="song.songURL"
        class="col-12 col-sm-6 col-md-4"
      >
        <v-card
          class="mx-auto text-left"
          style="overflow: hidden"
          outlined
          max-width="400"
          @click="
            updateMusicPlayer(
              song.songURL,
              song.artistName,
              song.songName,
              song.likedSong,
              song.songNameLower,
              song.uid
            )
          "
        >
          <v-rating
            v-if="userProfile.uid"
            empty-icon="mdi-heart-outline"
            full-icon="mdi-heart"
            length="1"
            size="16"
            color="red lighten-3"
            class="text-right float-right"
            @input="likeSong($event, song)"
            v-model="song.likedSong"
            clearable
          >
          </v-rating>
          <v-card-text class="ma-0 pa-0">
            <v-list-item two-line class="mb-2">
              <v-list-item-avatar
                class="headline white--text"
                style="background-size: cover; text-shadow: 0px 0px 7px #000"
                :style="{
                  backgroundImage:
                    'url(' +
                    require('@/assets/blurrybackgroundsquare.png') +
                    ')',
                }"
                >{{ songTitleFirstLetter(song.songName) }}</v-list-item-avatar
              >

              <v-list-item-content>
                <v-list-item-subtitle>{{
                  song.artistName
                }}</v-list-item-subtitle>
                <v-list-item-title class="title" color="primary" dark>
                  {{ song.songName }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-row>
              <!--   <v-col
              class="py-0 mb-1 mx-4"
              
            >
                          <v-rating background-color="primary" small></v-rating> 
            </v-col>-->
              <v-col
                class="ma-0 pa-1"
                style="overflow: none"
                :style="
                  'background-image: linear-gradient(36deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url(' +
                  imageLink +
                  ')'
                "
              >
                <div class="caption text-right white--text mb-3 mx-4">
                  <span v-for="genre in song.genre" :key="genre.id">
                    {{ genre }}
                  </span>
                  &nbsp;
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "querysongs",
  components: {},
  data: () => ({
    searchTerm: "",
    rating: null,
    imageLink: require("@/assets/bluebg.png"),
    likeList: [],
  }),
  mounted() {
    this.getSongList("artistNameLower", "Mentally Detached");
  },
  computed: {
    ...mapState(["userProfile"]),
    ...mapState(["songsList"]),
    ...mapState(["searchTerms"]),
  },
  methods: {
    getSongList(searchtype, searchterm) {
      this.$store.dispatch("getSongs", {
        field: searchtype,
        value: searchterm,
      });
    },
    likeSong(value, song) {
      this.$store.dispatch("likeSong", { song });
    },
    songTitleFirstLetter(name) {
      return name.charAt(0);
    },
    updateMusicPlayer(link, artist, song, likedSong, songNameLower, uid) {
      this.$store.dispatch("setPlayerData", {
        link: link,
        artist: artist,
        song: song,
        likedSong: likedSong,
        songNameLower: songNameLower,
        uid: uid,
      });
    },
  },
};
</script>
