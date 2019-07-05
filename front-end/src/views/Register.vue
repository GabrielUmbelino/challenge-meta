<template>
  <v-container fluid>
    <v-layout
      column
      align-center
    >
      <v-flex xs12>
        <form>
          <v-text-field
            v-model="model.name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.model.name.$touch()"
            @blur="$v.model.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="model.email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.model.email.$touch()"
            @blur="$v.model.email.$touch()"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="model.password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.model.password.$touch()"
            @blur="$v.model.password.$touch()"
          ></v-text-field>
        </form>
      </v-flex>
      <v-flex xs12>
        <v-btn
          @click="submit"
          :loading="loading"
        >Register</v-btn>
        <router-link
          class="text-xs-center"
          to="/login"
        >Or login</router-link>
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
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      model: {
        name: "",
        email: "",
        password: ""
      },
      message: {
        show: "",
        color: "error",
        text: "",
        timeout: 10000
      }
    };
  },
  validations: {
    model: {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.model.name.$dirty) return errors;
      !this.$v.model.name.minLength &&
        errors.push("Name must be at least 3 characters long.");
      !this.$v.model.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.model.email.$dirty) return errors;
      !this.$v.model.email.email && errors.push("Must be valid e-mail.");
      !this.$v.model.email.required && errors.push("E-mail is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.model.password.$dirty) return errors;
      !this.$v.model.password.required && errors.push("Password is required.");
      !this.$v.model.password.minLength &&
        errors.push("Password must be at least 8 characters long.");
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
        .post("/api/users/sign-up/", vm.model)
        .then(({ data }) => {
          this.$store.dispatch("signIn", data);
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          if (err.response.status == 500) {
            this.message.text = "This email was used already.";
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
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
