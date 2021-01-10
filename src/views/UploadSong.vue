<template>
  <v-container>
    <div class="login">
      <v-img :src="imageLinks.parallaxBackground" fluid aspect-ratio="7">
        <v-card outlined class="ma-6">
          <v-card-text>
            <UploadSongForm />
          </v-card-text>
        </v-card>
      </v-img>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import UploadSongForm from "@/components/UploadSongForm.vue";

export default {
  name: "login",
  components: { UploadSongForm },
  data: () => ({
    imageLinks: {
      parallaxBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
  }),
  methods: {},
};
</script>