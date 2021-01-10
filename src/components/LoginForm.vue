<template>
  <v-container>
    <div class="loginform">
      <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset>
      <v-form @submit.prevent="login()" v-else>
        <h3>Sign in to your account</h3>
        <v-alert type="error" v-if="showAlert">{{ errorMessage }}</v-alert>
        <div>
          <v-text-field
            type="text"
            label="Email"
            v-model="loginForm.email"
            placeholder="you@email.com"
          ></v-text-field>
        </div>
        <div>
          <a class="float-right text-body-2" @click="togglePasswordReset()"
            >Forgot Password</a
          >
          <v-text-field
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            v-model="loginForm.password"
            @click:append="showPass = !showPass"
            class="d-inline"
          ></v-text-field>
        </div>
        <v-btn
          type="submit"
          outlined
          class="primary"
          dark
          :disabled="loginEnabled"
          @click="login()"
          >Log In</v-btn
        >
        <v-container v-if="socialLogin" class="pa-0">
          <v-divider class="my-2 mx-9"></v-divider>
          <div
            class="google-btn"
            style="margin: auto"
            @click="loginWithGoogle()"
          >
            <div class="google-icon-wrapper">
              <v-img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p class="btn-text text-body-2 white--text">Sign in with Google</p>
          </div>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>


<script>
// @ is an alias to /src
import PasswordReset from "@/components/PasswordResetForm.vue";
import { mapState } from "vuex";

export default {
  name: "loginform",
  components: { PasswordReset },
  data: () => ({
    showPass: false,
    socialLogin: true,
    loginForm: {
      email: "",
      password: "",
    },
    showPasswordReset: false,
  }),
  methods: {
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    loginWithGoogle() {
      this.$store.dispatch("loginWithGoogle", {});
    },
  },
  computed: {
    ...mapState(["errorMessage"]),
    showAlert() {
      return this.errorMessage ? true : false;
    },
    loginEnabled() {
      return this.loginForm.email.length > 0 &&
        this.loginForm.password.length > 0
        ? false
        : true;
    },
  },
  mounted() {
    this.$store.dispatch("setErrorMessage", "");
  },
};
</script>
<style scoped>
.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
}
.google-btn .google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
}
.google-btn .google-icon {
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
}
.google-btn .btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: "Roboto";
}
.google-btn:hover {
  box-shadow: 0 0 6px #4285f4;
}
.google-btn:active {
  background: #1669f2;
}
</style>
