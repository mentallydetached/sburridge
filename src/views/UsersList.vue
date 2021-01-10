<template>
  <v-container>
    <div class="userslist">
      <v-img :src="imageLinks.parallaxBackground" fluid aspect-ratio="7">
        <v-card outlined class="ma-6">
          <v-card-text>
            <p class="display-1 my-7">User List</p>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                  xl="2"
                  v-for="user in usersList"
                  :key="user.email"
                >
                  <v-card :to="'/profile/?user=' + user.uid">
                    <v-img
                      height="150"
                      :src="user.profileImage"
                      v-if="user.profileImage"
                    ></v-img>
                    <v-icon size="150" v-if="!user.profileImage"
                      >mdi-account</v-icon
                    >

                    <v-card-text class="text-body-1">
                      {{ user.name }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
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

export default {
  name: "userslist",
  components: {},
  data: () => ({
    imageLinks: {
      parallaxBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
  }),
  mounted() {
    this.$store.dispatch("fetchUsersList", {});
  },
  computed: {
    ...mapState(["usersList"]),
  },
};
</script>
