<template>
  <div class="col-md-10">
    <b-alert class="alert-fixed" variant="success" :show='deletedSuccess'>Viloyat o'chirildi</b-alert>
    <router-link to="/region/new">
      <button class="btn btn-success mt-2">Qo`shish</button>
    </router-link>
    <div>
      <br>
      <h3>Viloyatlar ro'yhati</h3>
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
        <tr v-for="(row, index) in this.regionList" :key="row.id">
          <th>{{ index + 1 }}</th>
          <td>{{ row.name }}</td>
          <td>
            <router-link :to="'region/'+row.id+'/edit'">
              <button class="btn btn-primary">Edit</button>
            </router-link>
          </td>
          <td>
            <button class="btn btn-warning" @click="$refs['my-modal'].show(), deletedRegion = row">Delete</button>
          </td>
          <td>
            <router-link :to="'region/' + row.id+'/view'">
              <button class="btn btn-info">Ko`rish</button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="Siz ushbu viloyatni o`chirmoqchimisiz?">
        <div class="d-block text-center">
          <p>Viloyat id raqami: <b>{{ deletedRegion && deletedRegion.id }}</b></p>
          <p>Viloyat nomi: <b>{{ deletedRegion && deletedRegion.name }}</b></p>
          <p>Viloyat tartib raqami: <b>{{ deletedRegion && deletedRegion.sortOrder }}</b></p>
        </div>
        <b-button class="mt-2" variant="outline-warning" block @click="deleteRegion">O'chirish</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Orqaga</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "region",
  components: {},
  data() {
    return {
      regionList: [],
      buttonLoading: false,
      deletedRegion: null,
      deletedSuccess: false,
      loading: false,
    }
  },
  methods: {
    getAllRegionList() {
      this.loading = true
      axios.post('http://localhost:8081/api/regions/list', {}, {
        auth: {
          username: 'user',
          password: 'user123'
        },
      }).then(response => {
        this.regionList = response.data;
        this.loading = false
      }).catch(function (error) {
        this.loading = false
      })
    },
    deleteRegion() {
      this.buttonLoading = true
      axios.delete(`http://localhost:8081/api/regions/${this.deletedRegion.id}`, {
        auth: {
          username: 'user',
          password: 'user123'
        }
      })
          .then(res => {
            console.log(res)
            this.buttonLoading = false
            this.getAllRegionList();
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
    },
  },
  mounted() {
    this.getAllRegionList();
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

.alert-fixed {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 9999;
  border-radius: 0px;
}
</style>