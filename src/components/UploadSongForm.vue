<template>
  <v-container>
    <div class="uploadsongform">
      <v-form @submit.prevent="uploadSong()" ref="addsong">
        <h3>Upload Song</h3>
        <v-alert type="success" v-if="showSuccess">Track submitted</v-alert>
        <v-alert type="error" v-if="showFail">Error submitting track</v-alert>

        <div>
          <v-text-field
            type="text"
            label="Song Name"
            :rules="songNameRules"
            :disabled="disableInputs"
            v-model.trim="songName"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Artist Name"
            :rules="artistNameRules"
            :disabled="disableInputs"
            v-model.trim="artistName"
          ></v-text-field>

          <v-combobox
            v-model="songGenre"
            :items="items"
            :search-input.sync="search"
            :disabled="disableInputs"
            label="Genre"
            hint="Maximum of 5 tags"
            multiple
            chips
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>

            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ search }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

          <v-file-input
            show-size
            :rules="rules"
            :disabled="disableInputs"
            v-model="file"
            accept="audio/*"
            prepend-icon="mdi-music-note"
            label="Audio File"
          ></v-file-input>

          <v-btn
            outlined
            :loading="loading"
            class="button primary white--text"
            @click="uploadSong()"
            >Upload Track</v-btn
          >
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "uploadsongform",
  components: {},
  data: () => ({
    showSuccess: false,
    showFail: false,
    songName: "",
    artistName: "",
    disableInputs: false,
    items: [
      "Classical",
      "Country",
      "Hip-Hop",
      "Rap",
      "R&B",
      "Indie",
      "Jazz",
      "Rock",
      "EDM",
      "Techno",
      "Pop",
    ],
    songGenre: [],
    file: null,

    search: null,
    rules: [
      (value) => !!value || "Song file is a required field.",
      (value) =>
        !value ||
        value.size < 10000000 ||
        "Profile file size should be less than 10 MB.",
      (value) =>
        !value ||
        [
          "audio/mpeg",
          "audio/mp4",
          "audio/mp3",
          "audio/ogg",
          "audio/x-aiff",
        ].includes(value.type) ||
        "Only compressed music files are supported at this time.",
    ],
    songNameRules: [
      (value) => value !== "" || "Song name is a required field.",
    ],
    artistNameRules: [
      (value) => value !== "" || "Artist name is a required field.",
    ],
  }),
  methods: {
    uploadSong() {
      this.showFail = false;
      if (this.$refs.addsong.validate()) {
        if (!this.isDisabled) {
          this.$store.dispatch("uploadSong", {
            songName: this.songName,
            artistName: this.artistName,
            songGenre: this.songGenre,
            songFile: this.file,
          });
          this.disableInputs = true;
        } else {
          this.showFail = true;
          this.disableInputs = false;
        }
      }
    },
  },
  watch: {
    songGenre(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.songGenre.pop());
      }
    },
    loading(val) {
      if (val === false) {
        this.showSuccess = true;
        this.songName = "";
        this.artistName = "";
        this.songGenre = [];
        this.file = null;
        this.disableInputs = false;
        this.$refs.addsong.resetValidation();
        setTimeout(() => {
          this.showSuccess = false;
        }, 2000);
      }
    },
  },
  computed: {
    ...mapState(["uploadStatus"]),
    loading() {
      return this.uploadStatus === "uploading" ? true : false;
    },
  },
};
</script>