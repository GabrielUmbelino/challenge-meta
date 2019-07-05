<template>
  <v-content>
    <section>
      <v-layout column wrap>
        <v-container>
          <v-flex xs12>
               <v-alert
                v-model="alert.show"
                :type="alert.type"
                dismissible
              >
                {{alert.message}}
              </v-alert>
            <v-card>
              <v-card-title primary-title>
                <div class="headline">
                  <b>
                    {{vehicle._id ? 'Edit Vehicle' : 'New Vehicle'}}
                  </b>
                </div>
              </v-card-title>
              <v-layout row>
                <v-flex xs12 sm6>
                <v-text-field v-model="vehicle.chassisId.chassisSeries" :error-messages="chassisSeriesErrors" :disabled="isEditing" label="Chassis Series"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="vehicle.chassisId.chassisNumber" :error-messages="chassisNumberErrors" :disabled="isEditing" label="Chassis Number"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6>
                   <v-select v-model="vehicle.type" :items="Object.keys(types)" :error-messages="typeErrors" :disabled="isEditing" @change="() => vehicle.numberOfPassengers = types[vehicle.type].passengers" label="Type" ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field :value="vehicle.numberOfPassengers" :error-messages="passengersErrors" disabled label="Passengers" ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6>
                  <v-text-field v-model="vehicle.color" :error-messages="colorErrors" label="Color"></v-text-field>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-layout row>
                  <v-flex xs12 class="text-xs-center">
                    <v-btn @click="cancel" color="error">Cancel</v-btn>
                    <v-btn @click="submit" color="success" >Save</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
    </section>
  </v-content>
</template>

<script>
import axios from "axios"
import Vue from 'vue'
import Vuelidate from "vuelidate"
import { required } from "vuelidate/lib/validators";
Vue.use(Vuelidate)

export default {
  data () {
    return {
      vehicle: {
        _id: null,
        chassisId: {
          chassisSeries: null,
          chassisNumber: null,
        },
        type: "car",
        numberOfPassengers: 4,
        color: ""
      },
      types: {
        "car": {
          passengers: 4
        },
        "bus": {
          passengers: 42
        },
        "truck": {
          passengers: 1
        },
      },
      alert: {
        show: false,
        message: "",
        type: "info"
      }
    };
  },
  methods: {
    cancel() {
      this.$store.commit("SET_VEIHCLE", null)
      this.$router.push('/')
    },
    async submit () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let vehicle = this.vehicle
      if (!vehicle._id) {
        delete vehicle._id
        if (this.verifyChassisId(this.vehicle.chassisId.chassisSeries, this.vehicle.chassisId.chassisNumber)){
          return this.showAlert("Chassis Id already used.", "error")
        }
        const response = await axios.post("/api/vehicles/", vehicle);
        this.clearVehicle();
        return this.showAlert("Vehicle created successfully", "success")
      } else {
        const response = await axios.put(`/api/vehicles/${this.vehicle._id}`, this.vehicle);
        this.$store.commit("SET_VEIHCLES", null)
        return this.showAlert("Vehicle edited successfully", "success")
      }
    },
    verifyChassisId(chassisSeries, chassisNumber) {
      const vehicles = this.$store.getters.vehicles;

      if (!vehicles) {
        return false
      }

      const metchedVehicles = vehicles.filter(v => {
        return `${v.chassisId.chassisSeries}${v.chassisId.chassisNumber}` == `${chassisSeries}${chassisNumber}`
      })

      return metchedVehicles.length

    },
    showAlert(message, type = "info") {
      this.alert = {show: true, message, type}
    },
    clearVehicle() {
      this.$v.$reset();
      this.vehicle = {
        _id: null,
        chassisId: {
          chassisSeries: null,
          chassisNumber: null,
        },
        type: "car",
        numberOfPassengers: 4,
        color: ""
      }
    }
  },
  mounted() {
    if (this.$store.getters.vehicle) {
      this.vehicle = {...this.$store.getters.vehicle}
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.vehicle._id)
    },
    chassisSeriesErrors() {
      const errors = [];
      if (!this.$v.vehicle.chassisId.chassisSeries.$dirty) return errors;
      !this.$v.vehicle.chassisId.chassisSeries.required && errors.push("Chassis Series is required.");
      return errors;
    },
    chassisNumberErrors() {
      const errors = [];
      if (!this.$v.vehicle.chassisId.chassisNumber.$dirty) return errors;
      !this.$v.vehicle.chassisId.chassisNumber.required && errors.push("Chassis Number is required.");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.vehicle.type.$dirty) return errors;
      !this.$v.vehicle.type.required && errors.push("Type is required");
      return errors;
    },
    passengersErrors() {
      const errors = [];
      if (!this.$v.vehicle.numberOfPassengers.$dirty) return errors;
      !this.$v.vehicle.numberOfPassengers.required && errors.push("Passengers is required");
      return errors;
    },
    colorErrors() {
      const errors = [];
      if (!this.$v.vehicle.color.$dirty) return errors;
      !this.$v.vehicle.color.required && errors.push("Color is required");
      return errors;
    },
  },
  validations: {
    vehicle: {
      chassisId: {
        chassisSeries: {required},
        chassisNumber: {required},
      },
      type: {required},
      numberOfPassengers: {required},
      color: {required}
    }
  },
};
</script>

<style lang="scss" scoped>
.v-content {
	padding: 0 !important;
	.row {
		.flex {
			padding: 10px;
		}
	}
}
</style>
