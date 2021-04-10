<template>
  <v-container>
    <div class="profile">
      <v-img :src="imageLinks.blurryBackground" fluid aspect-ratio="7">
        <v-card outlined class="ma-6">
          <router-link to="/users">
            <v-btn icon class="float-left">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-card-text>
            <p class="display-1 my-7">
              {{ profileData.name }}
            </p>
            <v-avatar size="250"
              ><v-img
                :src="profileData.profileImage"
                v-if="profileData.profileImage"
              />
              <v-icon
                size="150"
                v-if="!profileData.profileImage"
                style="box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.2)"
              >
                mdi-account
              </v-icon>
            </v-avatar>

            <v-container>
              <p class="display-1 my-7">Uploads</p>
              <p v-if="emptyListCheck">
                This fantastic individual hasn't uploaded any content at this
                time.
              </p>
              <SongResults />
            </v-container>
          </v-card-text>
        </v-card>
      </v-img>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import SongResults from "@/components/SongList.vue";

export default {
  name: "profile",
  components: { SongResults },
  data: () => ({
    emptyListCheck: null,
    imageLinks: {
      blurryBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
  }),
  computed: {
    ...mapState(["otherUserProfile"]),
    ...mapState(["songsList"]),
    profileData() {
      return this.otherUserProfile == null
        ? {
            name: "User Not Found",
            profileImage: require("@/assets/bluebg.png"),
          }
        : this.otherUserProfile;
    },
  },
  watch: {
    songsList(newValue, oldValue) {
      newValue.length === 0
        ? (this.emptyListCheck = true)
        : (this.emptyListCheck = false);
    },
  },
  mounted: function () {
    this.$store.dispatch("fetchOtherUserProfile", this.$route.query.user);
    this.$store.dispatch("getSongs", {
      field: "uid",
      uid: this.$route.query.user,
    });
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.vertalignedtext {
  height: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
