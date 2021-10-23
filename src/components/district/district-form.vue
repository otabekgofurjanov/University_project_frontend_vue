<template>
  <div class="col-md-6">
    <h3 style="margin-top: 10px">Tuman qo`shish</h3>
    <div>
      <b-form-select v-model="district.regionId" :options="regions" value-field="id" text-field="name"></b-form-select>
    </div>
    <form>
      <div class="form-group mt-4">
        <input type="text" class="form-control" disabled placeholder="Tuman id" v-model="district.id">
        <br>
        <input type="text" class="form-control" placeholder="Tuman nomini kiriting" v-model="district.name">
        <br>
        <input type="number" class="form-control" v-model="district.sortOrder"
               placeholder="Tuman tartib raqamini kiriting" @keyup.enter="createDistrict">
      </div>
    </form>
    <div>
      <router-link to="/district">
        <button class="btn btn-secondary">Orqaga</button>
      </router-link>
      <button class="btn btn-primary" style="float: right;" @click="createDistrict()" :disabled="buttonDisabled">
        <div v-if="loading" class="spinner-border spinner-border-sm"></div>
        <span v-if="loading">Saqlanmoqda</span>
        <span v-else>Saqlash</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import region from "../region/region";

export default {
  name: "district-form",
  components: region,
  data() {
    return {
      region: null,
      buttonDisabled: false,
      loading: false,
      regions: [],
      district: {
        id: null,
        name: null,
        regionId: null,
        sortOrder: null,
        createdBy: "Admin",
        lastChangeBy: "Admin",
        loading: false
      }
    }
  },
  mounted() {
    this.getRegions()
    if (this.$route.params.districtId) {
      this.getDistrictById(this.$route.params.districtId);
    }
  },
  methods: {
    getRegions() {
      axios.post('http://localhost:8081/api/regions/list', null, {
        auth: {
          username: 'user',
          password: 'user123'
        }
      }).then((result) => {
        this.regions = result.data
      })
    },
    createDistrict() {
      this.loading = true
      this.buttonDisabled = true
      axios.post("http://localhost:8081/api/districts", this.district,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          }).then(res => {
        this.loading = false
        this.buttonDisabled = false
        this.$swal('Saqlandi', 'Tashrifingiz uchun rahmat', 'success')
        console.log("Saqlandi", res)
        this.regionId = this.region.id
        this.district.id = this.data.id
      })
          .catch(err => {
            this.loading = false
            this.buttonDisabled = false
            this.district.id = this.data.id
            this.$swal('Xatolik', 'Ma`lumot saqlashda xatolik', 'error')
          })
    },
    getDistrictById(id) {
      axios.get("http://localhost:8081/api/districts/" + id,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          })
          .then(res => {
            this.district.id = res.data.id;
            this.district.name = res.data.name;
            this.district.sortOrder = res.data.sortOrder;
          });
    }
  }
}

</script>

<style scoped>
.col-md-6 {
  margin: auto;
}

.btn-secondary {
  margin-right: 15px;
}
</style>