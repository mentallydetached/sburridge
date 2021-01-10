<template>
  <div class="modal">
    <div class="modal-content">
      <v-btn @click="$emit('close')" icon class="float-right"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <h3>Reset Password</h3>
      <div v-if="!showSuccess" class="text-body-2">
        Enter your email to reset your password
        <form @submit.prevent>
          <v-text-field
            type="text"
            label="Email"
            v-model.trim="email"
            placeholder="you@email.com"
          ></v-text-field>
        </form>
        <v-alert v-if="errorMsg !== ''" type="error">{{ errorMsg }}</v-alert>
        <v-btn @click="resetPassword()" class="button primary" outlined dark
          >Reset</v-btn
        >
      </div>
      <div v-else>Success! Check your email for a reset link.</div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: "",
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>