<template>
  <v-container>
    <div class="settings">
      <v-img :src="imageLinks.parallaxBackground" fluid aspect-ratio="7">
        <v-card outlined class="ma-6">
          <v-card-text>
            <h3>Settings</h3>
            <p>Update your profile</p>
            <v-avatar size="128"
              ><v-img :src="userProfile.profileImage" />
            </v-avatar>

            <transition name="fade">
              <v-alert v-if="showSuccess" type="success"
                >profile updated</v-alert
              >
              <v-alert type="error" v-if="showFail"
                >Error updating profile</v-alert
              >
            </transition>
            <v-container>
              <form @submit.prevent>
                <div>
                  <v-text-field
                    type="text"
                    disabled
                    label="Email"
                    :value="userProfile.email"
                  ></v-text-field>
                  <v-text-field
                    type="text"
                    label="Name"
                    v-model.trim="name"
                    :placeholder="userProfile.name"
                  ></v-text-field>
                  <v-file-input
                    :rules="rules"
                    v-model="file"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    label="Profile Image"
                  ></v-file-input>
                </div>

                <v-btn
                  outlined
                  class="button"
                  @click="updateProfile()"
                  :disabled="isDisabled"
                  >Update Profile</v-btn
                >
              </form>
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
  name: "settings",
  components: {},
  data: () => ({
    file: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Profile image size should be less than 2 MB.",
      (value) =>
        !value ||
        ["image/png", "image/jpeg", "image/bmp"].includes(value.type) ||
        "Please ensure you've selected an image format.",
    ],
    imageLinks: {
      parallaxBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
    showSuccess: false,
    showFail: false,
    name: "",
  }),
  methods: {
    updateProfile() {
      this.showFail = false;
      if (!this.isDisabled) {
        this.$store.dispatch("updateProfile", {
          name: this.name,
          profileImage: this.file,
        });

        this.name = "";
        this.file = null;

        this.showSuccess = true;

        setTimeout(() => {
          this.showSuccess = false;
        }, 2000);
      } else {
        this.showFail = true;
      }
    },
  },
  computed: {
    ...mapState(["userProfile"]),
    isDisabled() {
      return (this.name.length !== 0 && this.name !== this.userProfile.name) ||
        this.file
        ? false
        : true;
    },
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
