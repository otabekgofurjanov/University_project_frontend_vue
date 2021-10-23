<template>
  <div class="col-md-6">
    <h3 style="margin-top: 10px">Viloyat qo`shish</h3>
    <form>
      <div class="form-group mt-4">
        <input type="text" class="form-control" disabled placeholder="Viloyat id" v-model="region.id">
        <br>
        <input type="text" class="form-control" placeholder="Viloyat nomini kiriting" v-model="region.name">
        <br>
        <input type="number" class="form-control" v-model="region.sortOrder"
               placeholder="Viloyat tartib raqamini kiriting" @keyup.enter="createRegion">
      </div>
    </form>
    <div>
      <router-link to="/region">
        <button class="btn btn-secondary">Orqaga</button>
      </router-link>
      <button class="btn btn-primary" style="float: right;" @click="createRegion()" :disabled="buttonDisabled">
        <div v-if="loading" class="spinner-border spinner-border-sm"></div>
        <span v-if="loading">Saqlanmoqda</span>
        <span v-else>Saqlash</span>
      </button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "region-new",
  data() {
    return {
      buttonDisabled: false,
      loading: false,
      region: {
        id: null,
        name: null,
        sortOrder: null,
        createdBy: "Admin",
        lastChangeBy: "Admin",
        loading: false
      }
    }
  },
  methods: {
    createRegion() {
      this.loading = true
      this.buttonDisabled = true
      axios.post("http://localhost:8081/api/regions", this.region,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          })
          .then(res => {
            this.loading = false
            this.buttonDisabled = false
            this.$swal('Saqlandi', 'Tashrifingiz uchun rahmat', 'success')
            console.log("Saqlandi", res)
            this.region.id = res.data.id;
          })
          .catch(error => {
            this.loading = false
            this.buttonDisabled = false
            this.$swal('Xatolik', 'Saqlashda xatolik', 'error')
            console.log(error)
          });
    },
    getRegionById(id) {
      axios.get("http://localhost:8081/api/regions/" + id,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          })
          .then(res => {
            this.region.id = res.data.id;
            this.region.name = res.data.name;
            this.region.sortOrder = res.data.sortOrder;
          });
    }
  },
  mounted() {
    if (this.$route.params.regionId) {
      this.getRegionById(this.$route.params.regionId);
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