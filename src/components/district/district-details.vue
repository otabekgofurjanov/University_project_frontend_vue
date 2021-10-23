<template>
  <div class="container mt-2">
    <div class="col-md-6" v-if="districtView">
      <div class="row">
        <ul class="list-group">
          <li class="list-group-item active" v-model="districtView.name">Tuman nomi: {{ districtView.name }}</li>
          <li class="list-group-item" v-model="districtView.id">Tuman id: {{ districtView.id }}</li>
          <li class="list-group-item" v-model="districtView.sortOrder">Tuman tartib raqami:
            {{ districtView.sortOrder }}
          </li>
        </ul>
      </div>
      <br>
      <button class="btn btn-secondary mr-2" @click="$router.push({name: 'district'})">Orqaga</button>
      <button class="btn btn-info"
              @click="$router.push({name: 'districtEdit', params: {districtView: districtView.id}})">Tahrirlash
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "district-details",
  data() {
    return {
      districtView: {
        id: null,
        name: null,
        sortOrder: null,
        regionId: null,
        createdBy: null,
        lastChangeBy: null
      }
    }
  },
  methods: {
    getDistrictById(id) {
      axios.get("http://localhost:8081/api/districts/" + id,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          }).then(res => {
        console.log(res.data)
        this.districtView.id = res.data.id
        this.districtView.name = res.data.name
        this.districtView.sortOrder = res.data.sortOrder
        this.districtView.regionId = res.data.regionId
        this.districtView.createdBy = res.data.createdBy
        this.districtView.lastChangeBy = res.data.lastChangeBy
      })
    }
  },
  mounted() {
    if (this.$route.params.districtId) {
      this.getDistrictById(this.$route.params.districtId);
    }
  }
}
</script>

<style scoped>

</style>