<template>
  <div class="container mt-2">
  <div class="col-md-6">
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item active" v-model="regionView.name">Viloyat nomi: {{regionView.name}}</li>
        <li class="list-group-item" v-model="regionView.id">Viloyat id: {{regionView.id}}</li>
        <li class="list-group-item" v-model="regionView.sortOrder">Viloyat tartib raqami: {{regionView.sortOrder}}</li>
      </ul>
    </div>
    <br>
    <button class="btn btn-secondary mr-2" @click="$router.push({name: 'Region'})">Orqaga</button>
    <button class="btn btn-info" @click="$router.push({name: 'RegionEditForm', params: {regionView: regionView.id}})">Tahrirlash</button>
  </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "region-details",
  data() {
    return {
      regionView: {
        id: null,
        name: null,
        sortOrder: null,
        createdBy: null,
        lastChangeBy: null
      },
    }
  },
  methods: {
    getRegionById(id) {
      axios.get("http://localhost:8081/api/regions/" + id,
          {
            auth: {
              username: 'user',
              password: 'user123'
            }
          })
          .then(res => {
            console.log(res)
            this.regionView.id = res.data.id;
            this.regionView.name = res.data.name;
            this.regionView.sortOrder = res.data.sortOrder;
            this.regionView.createdBy = res.data.createdBy;
            this.regionView.lastChangeBy = res.data.lastChangeBy;
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
.col-md-10 {
  margin: auto;
}

.row{
  display: contents;
  text-align: center;
}
.col-md-6{
  max-width: 50%;
  justify-content: center;
  text-align-last: center;
  margin-left: 235px;
}
</style>