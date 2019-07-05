<template>

  <section>
    
    <v-layout column>
      <v-container>
        <div>
          <VehicleListToolbar :term="term" :searching="searching" @add="onAdd" @search="toggleSearch" @change="e => term = e"/>
          <VehicleList :images="images" :vehicles="vehicles" @edit="onEdit" @remove="onRemove" :loading="loading"/>
        </div>
      </v-container>
    </v-layout>
  </section>

</template>

<script>
import axios from "axios"
import car from "../assets/car.png"
import bus from "../assets/bus.png"
import truck from "../assets/truck.png"
export default {
  data() {
    return {
      loading: false,
      searching: false,
      term: ""
    }
  },
  components: {
    VehicleListToolbar: () => import("../components/VehicleListToolbar.js"),
    VehicleList: () => import("../components/VehicleList.vue")
  },
  mounted () {
    this.getVehicles()
  },
  methods: {
    async getVehicles () {
      this.loading = true
      const res = await axios.get('/api/vehicles');
      this.$store.commit("SET_VEIHCLES", res.data)
      this.loading = false
    },
    onAdd() {
      this.$store.commit("SET_VEIHCLE", null)
      this.$router.push("/vehicle")
    },
    toggleSearch() {
      this.searching = !this.searching;
    },
    onEdit(vehicle) {
      this.$store.commit("SET_VEIHCLE", vehicle)
      this.$router.push("/vehicle")
    },
    onRemove(_id) {
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`/api/vehicles/${_id}`).then(res => {
            this.getVehicles();
          });
        }
      })


    }
  },
  computed: {
    vehicles() {
      const vehicles = this.$store.getters.vehicles;
      if (!vehicles) {
        return []
      }

      if (!this.term) {
        return vehicles
      }

      return vehicles.filter(vehicle => {
        const regex = new RegExp(this.term)
        return regex.test(`${vehicle.chassisId.chassisNumber}${vehicle.chassisId.chassisSeries}`)
      })
    },
    images() {
      return {
        car, bus, truck
      }
    }
  },
};
</script>


