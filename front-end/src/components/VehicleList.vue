<template functional>
  <v-card>
    <v-list three-line>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <v-list-tile
        v-if="props.loading"
      >
        <v-list-tile-content class="text-xs-center">
           <v-progress-circular
            :size="50"
            color="cyan"
            indeterminate
          ></v-progress-circular>
        </v-list-tile-content>
      </v-list-tile>

      
      <v-list-tile
        v-else
        v-for="vehicle in props.vehicles"
        :key="vehicle._id"
        avatar
      >
        <v-list-tile-avatar size="64">
          <img :src="props.images[vehicle.type]">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ vehicle.type }} </v-list-tile-title>
          <v-list-tile-sub-title>
            <p>
              Chassis Id: {{vehicle.chassisId.chassisSeries}} {{ vehicle.chassisId.chassisNumber }}
            </p>
            <p>
              Passengers: {{ vehicle.numberOfPassengers }}
            </p>
            <p>
              Color: {{ vehicle.color }}
            </p>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn fab dark small color="primary" @click="listeners.edit(vehicle)">
            <v-icon color="white">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn fab dark small color="error" @click="listeners.remove(vehicle._id)">
            <v-icon color="white">delete_forever</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-avatar>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>

export default {
  functional: true,
  props: {
    vehicles: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    images: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.v-list {
  .v-avatar {
    img {
      border-radius: 0;
      padding: 7px 7px;
    }
  }
  p {
    margin-bottom: 1px;
  }
  .v-progress-circular {
    margin: auto;
  }
}
</style>
