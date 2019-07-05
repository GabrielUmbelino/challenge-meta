<template>
  <v-container fluid>
    <v-layout
      column
      align-center
    >
      <v-flex xs12>
        <form>
          <v-text-field
            v-model="model.email"
            :error-messages="emailErrors"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            :type="'password'"
            v-model="model.password"
            :error-messages="passwordErrors"
            label="Password"
            required
          ></v-text-field>
        </form>
      </v-flex>
      <v-flex xs12>
        <v-btn
          @click="submit"
          :loading="loading"
        >Login</v-btn>
        <router-link to="/register">Or register</router-link>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="message.show"
      :color="message.color"
      top="top"
      :timeout="message.timeout"
    >
      {{ message.text }}
      <v-btn
        color="white"
        flat
        @click="message.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      model: {
        email: "",
        password: ""
      },
      message: {
        show: "",
        color: "info",
        text: "",
        timeout: 10000
      }
    };
  },

  validations: {
    model: {
      email: { required, email },
      password: { required }
    }
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.model.password.$dirty) return errors;
      !this.$v.model.password.required && errors.push("Password is required.");
      !this.$v.model.password.minLength &&
        errors.push("Password must be at least 8 characters long.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.model.email.$dirty) return errors;
      !this.$v.model.email.email && errors.push("Must be valid e-mail.");
      !this.$v.model.email.required && errors.push("E-mail is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      if (this.loading) {
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      const vm = this;

      axios
        .post("api/users/sign-in", this.model)
        .then(({ data }) => {
          this.$store.dispatch("signIn", data);
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.message.text = "Invalid credentials.";
            this.message.show = true;
            return;
          }
          this.message.text = "Unknown error:" + err.response.status;
          this.message.show = true;
        })
        .then(() => {
          vm.loading = false;
        });
    }
  }
};
</script>
<style lang="scss">
.layout {
  .flex {
    min-width: 300px;
    form {
      width: 100%;
      a {
        text-align: center;
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
