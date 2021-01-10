<template>
  <v-form @submit.prevent="getSongList(searchType, searchTerm)">
    <v-row>
      <v-col cols="3">
        <v-select
          :items="searchTypeList"
          v-model="searchTypeSelected"
          label="Search By"
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          label="Search"
          append-icon="mdi-magnify"
          v-model="searchTerm"
          @click:append="getSongList(searchType, searchTerm)"
          @keydown.enter="getSongList(searchType, searchTerm)"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "querysongs",
  components: {},
  data: () => ({
    link: "",
    artist: "",
    song: "",
    searchTerm: "",
    searchTypeSelected: "Artist",
    searchTypeList: ["Artist", "Song"],
    scrollInvoked: null,
  }),
  computed: {
    ...mapState(["songsList"]),
    searchType() {
      let x;
      if (this.searchTypeSelected === "Artist") {
        x = "artistNameLower";
      } else {
        x = "songNameLower";
      }
      return x;
    },
  },
  methods: {
    getSongList(searchtype, searchterm) {
      this.$store.dispatch("getSongs", {
        field: searchtype,
        value: searchterm,
      });
    },
  },
};
</script>