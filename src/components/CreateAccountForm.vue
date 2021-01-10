<template>
  <v-container>
    <div class="createaccount">
      <v-form @submit.prevent="login()" ref="createacct">
        <h3>Create new account</h3>
        <div>
          <v-text-field
            type="text"
            :rules="nameRules"
            label="Name"
            v-model.trim="name"
          ></v-text-field>
          <v-text-field
            type="text"
            :rules="emailRules"
            label="Email"
            v-model.trim="email"
            placeholder="you@email.com"
          ></v-text-field>

          <v-text-field
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            :rules="passRules"
            counter="30"
            label="Password"
            placeholder="minimum 6 characters"
            v-model.trim="password"
            @click:append="showPass = !showPass"
          ></v-text-field>

          <v-file-input
            :rules="fileRules"
            v-model="file"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Profile Image"
          ></v-file-input>

          <v-btn outlined class="button primary white--text" @click="signup()"
            >Sign Up</v-btn
          >
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "createaccount",
  components: {},
  data: () => ({
    showPass: false,
    name: "",
    email: "",
    password: "",
    file: null,
    fileRules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Profile image size should be less than 2 MB.",
      (value) =>
        !value ||
        ["image/png", "image/jpeg", "image/bmp"].includes(value.type) ||
        "Please ensure you've selected an image format.",
    ],
    nameRules: [(value) => value !== "" || "Name is a required field."],
    emailRules: [
      (value) => value !== "" || "Email address is a required field.",
      (value) =>
        !value ||
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        ) ||
        "Must be a valid email address.",
    ],
    passRules: [
      (value) =>
        (value && value.length > 6) ||
        "Password must be at least 6 characters.",
      (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(value) ||
        "Please ensure the password contains at least one uppercase, lowercase, and numeric character.",
    ],
  }),
  methods: {
    signup() {
      if (this.$refs.createacct.validate()) {
        this.$store.dispatch("signup", {
          email: this.email,
          password: this.password,
          name: this.name,
          profileImage: this.file,
        });
      }
    },
  },
};
</script>