<template>
  <v-container>
    <div class="createaccount">
      <v-img :src="imageLinks.parallaxBackground" fluid aspect-ratio="7">
        <v-card outlined class="ma-6">
          <v-card-text>
            <div v-if="showLoginForm">
              <LoginForm />
              <div class="pt-4">Don't have an account?</div>
              <v-btn outlined class="ma-2" @click="toggleForm()"
                >Create an Account</v-btn
              >
            </div>
            <div v-else>
              <CreateAccount />
              <div class="pt-4">Already have an account?</div>
              <v-btn outlined class="ma-2" @click="toggleForm()">Sign in</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-img>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CreateAccount from "@/components/CreateAccountForm.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "createaccount",
  components: { CreateAccount, LoginForm },
  data: () => ({
    imageLinks: {
      parallaxBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
    showPass: false,
    quote: "",
    showLoginForm: false,
  }),
  methods: {
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
  },
};
</script>