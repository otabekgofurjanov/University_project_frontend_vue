<template>
  <div class="col-md-10">
    <b-alert class="alert-fixed" variant="success" :show='deletedSuccess'>Viloyat o'chirildi</b-alert>
    <router-link to="/district/new">
      <button class="btn btn-success mt-2">Qo`shish</button>
    </router-link>
    <div>
      <br>
      <h3>Tumanlar ro'yhati</h3>
      <br>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">T/r</th>
          <th scope="col">Name</th>
        </tr>
        </thead>
        <tbody>
        <b-spinner v-show="loading" label="Spinning"></b-spinner>
        <tr v-for="(row, index) in this.districtList" :key="row.id">
          <th>{{ index + 1 }}</th>
          <td>{{ row.name }}</td>
          <td>{{ row.regionName }}</td>
          <td>
            <router-link :to="'district/'+row.id+'/edit'">
              <button class="btn btn-primary">Edit</button>
            </router-link>
          </td>
          <td>
            <button class="btn btn-warning" @click="$refs['my-modal'].show(), deletedDistrict = row">Delete</button>
          </td>
          <td>
            <router-link :to="'district/' + row.id+'/view'">
              <button class="btn btn-info">Ko`rish</button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="Siz ushbu tumanni o`chirmoqchimisiz?">
        <div v-if="deletedDistrict" class="d-block text-center">
          <p>Tuman id raqami: <b>{{ deletedDistrict.id }}</b></p>
          <p>Tuman nomi: <b>{{ deletedDistrict.name }}</b></p>
          <p>Tuman tartib raqami: <b>{{ deletedDistrict.sortOrder }}</b></p>
        </div>
        <b-button class="mt-2" variant="outline-warning" block @click="deleteDistrict">O'chirish</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Orqaga</b-button>
      </b-modal>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "district",
  data() {
    return {
      districtList: [],
      buttonLoading: false,
      deletedDistrict: null,
      deletedSuccess: false,
      regionId: null,
      loading: false
    }
  },
  methods: {
    getAllDistrictList() {
      this.loading = true;
      axios.post("http://localhost:8081/api/districts/list", {}, {
        auth: {
          username: 'user',
          password: 'user123'
        },
      })
          .then(response => {
            console.log(response.data)
            this.districtList = response.data
            this.loading = false
            console.log(response.data)
          })
    },
    deleteDistrict() {
      this.buttonLoading = true
      axios.delete(`http://localhost:8081/api/districts/${this.deletedDistrict.id}`, {
        auth: {
          username: 'user',
          password: 'user123'
        }
      })
          .then(res => {
            this.buttonLoading = false
            this.getAllDistrictList();
            this.$refs['my-modal'].hide()
            this.deletedSuccess = true
            setTimeout(() => this.deletedSuccess = false, 2000)
          })
          .catch(err => {
            console.log('catch', err)
            this.buttonLoading = false
            this.$swal("Xatolik!", "Siz tanlagan tuman o'chirishda xatolik", "error");
          })
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    }
  },
  mounted() {
    this.getAllDistrictList();
  }
}
</script>

<style scoped>

.btn-success {
  float: right;
}

.col-md-10 {
  margin: auto;
}
</style>