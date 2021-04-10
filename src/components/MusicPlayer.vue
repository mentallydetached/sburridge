<template>
  <v-container class="ma-0 pa-0">
    <v-row align="center" justify="center">
      <v-col>
        <v-card outlined style="padding: 10px; height: 102px; min-width: 350px">
          <v-card-text class="ma-0 pa-0">
            <v-btn
              icon
              small
              class="ma-0 pa-0 float-right"
              style="position: absolute; top: 0; right: 0"
              @click="close()"
              ><v-icon size="1rem">mdi-close</v-icon></v-btn
            >
            <div class="mt-2">
              <v-row>
                <v-col class="text-center">
                  <v-row class="overline" style="line-height: 0.5rem">
                    <v-col class="text-center"> {{ artist }}</v-col>
                  </v-row>
                  <v-row
                    no-gutters
                    class="overline"
                    style="line-height: 1.4rem"
                  >
                    <v-col>
                      <div class="float-left">
                        {{ currentTime }}
                      </div>
                    </v-col>
                    <v-col>
                      <div>{{ song }}</div>
                    </v-col>
                    <v-col>
                      <div class="float-right">
                        {{ duration }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <v-progress-linear
                        v-model="percentage"
                        height="9"
                        style="
                          margin-top: 0px;
                          margin-bottom: 0px;
                          border-radius: 7px;
                        "
                        color="primary"
                        @click.native="setPosition()"
                        :disabled="!loaded"
                      ></v-progress-linear>
                      <audio
                        id="player"
                        ref="player"
                        v-on:ended="ended"
                        v-on:canplay="canPlay"
                        :src="link"
                      ></audio>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="mt-1">
                      <v-btn
                        icon
                        @click.native="playing ? pause() : play()"
                        :disabled="!loaded"
                      >
                        <v-icon v-if="!playing || paused">mdi-play</v-icon>
                        <v-icon v-else>mdi-pause</v-icon>
                      </v-btn>
                      <v-btn icon @click.native="stop()" :disabled="!loaded">
                        <v-icon>mdi-stop</v-icon>
                      </v-btn>
                      <v-btn icon v-if="!loaded" @click.native="reload()">
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                      <v-btn icon @click.native="likeSong()">
                        <v-icon v-if="!likedSong">mdi-heart-outline</v-icon>
                        <v-icon v-if="likedSong">mdi-heart</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const formatTime = (second) =>
  new Date(second * 1000)
    .toTimeString()
    .replace(/.*\d{2}:(\d{2}:\d{2}).*/, "$1");
export default {
  name: "MusicPlayer",
  props: {
    link: {
      type: String,
      default: null,
    },
    songNameLower: {
      type: String,
      default: null,
    },
    uid: {
      type: String,
      default: null,
    },
    artist: {
      type: String,
      default: null,
    },
    song: {
      type: String,
      default: null,
    },

    autoPlay: {
      type: Boolean,
      default: false,
    },
    ended: {
      type: Function,
      default: () => {},
    },
    canPlay: {
      type: Function,
      default: () => {},
    },
    likedSong: {
      type: Number,
      default: () => null,
    },
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : "";
    },
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: true,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: "00:00",
      audio: undefined,
      totalDuration: 0,
    };
  },
  methods: {
    likeSong() {
      let song = {
        songURL: this.link,
        uid: this.uid,
        songNameLower: this.songNameLower,
      };
      this.$store.dispatch("likeSong", { song });
      this.$emit("toggleLike");
    },
    close() {
      this.$emit("close");
    },
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100) * this.percentage,
        10
      );
    },
    stop() {
      this.paused = this.playing = false;
      this.audio.pause();
      this.audio.currentTime = 0;
      this.init();
    },
    play() {
      if (this.playing) return;
      this.paused = false;
      this.audio.play().then((_) => (this.playing = true));
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    download() {
      this.audio.pause();
      window.open(this.file, "download");
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.volumeValue = this.isMuted ? 0 : 75;
    },
    reload() {
      this.audio.load();
    },
    _handleLoaded: function () {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          // Fix duration for streamed audio source or blob based
          // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration, 10);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration, 10);
          this.loaded = true;
        }
        if (this.autoPlay) this.audio.play();
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function (e) {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
    },
    _handlePlayPause: function (e) {
      if (e.type === "play" && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00";
      }
    },
    _handleEnded() {
      this.paused = this.playing = false;
    },
    init: function () {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
    },
  },
  mounted() {
    this.audio = this.$refs.player;
    this.init();
  },
  beforeDestroy() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  },
  watch: {
    song: function () {
      this.stop();
      this.percentage = 0;
    },
  },
};
</script>

