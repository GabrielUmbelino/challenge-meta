<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Fleet</span>&nbsp;
        <span class="font-weight-light">Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <span class="subheading" v-on="on">{{user.name}}
            <v-icon>arrow_drop_down</v-icon>
          </span>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index">
            <v-list-tile-title @click="menuAction">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      name: "App",
      items: [{ title: "Logout" }]
    };
  },

  methods: {
    menuAction () {
      axios("/api/users/sign-out")
        .then(() => {
          this.$store.dispatch("clear");
          this.$router.push({ name: "login" });
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss">
* {
	font-family: 'Roboto';
}
#app {
	.application--wrap {
		min-height: 110vh;
		.layout {
			> .container {
				width: 950px;
			}
			@media (max-width: 990px) {
				> .container {
					width: 100%;
				}
			}
			@media (max-width: 560px) {
				> .container {
					width: 100%;
				}
			}
		}
	}
	
}

</style>
