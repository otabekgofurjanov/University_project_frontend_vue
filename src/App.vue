<template>
  <div id="app">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-xl navbar-light bg-light">
        <a href="#" class="navbar-brand">
          <img src="./assets/logo.svg" width="60" alt="logo">
        </a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Collection of nav links, forms, and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
          <div class="navbar-nav">
            <router-link to="/region" class="nav-item" exact active-class="active">
              <a class="nav-link">Viloyatlar</a>
            </router-link>
            <router-link to="/district" class="nav-item" active-class="active">
              <a class="nav-link">Tumanlar</a>
            </router-link>
            <router-link to="/university" class="nav-item" active-class="active">
              <a class="nav-link">Universitetlar</a>
            </router-link>
            <a href="#" class="nav-item nav-link">Student</a>
          </div>
          <form class="navbar-form form-inline">
            <div class="input-group search-box">
              <input type="text" id="search" class="form-control" placeholder="Nima qidirmoqchisiz?">
              <span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
            </div>
          </form>
          <div class="navbar-nav ml-auto">
            <a href="#" class="nav-item nav-link notifications"><i class="fa fa-bell-o"></i><span class="badge">1</span></a>
            <a href="#" class="nav-item nav-link messages"><i class="fa fa-envelope-o"></i><span class="badge">10</span></a>
            <div class="nav-item dropdown">
              <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action"><img
                  src="./assets/image.jpg" class="avatar" alt="Avatar"> Otabek G'opporjonov <b
                  class="caret"></b></a>
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item"><i class="material-icons">&#xE8AC;</i>Chiqish</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import region from "./components/region/region";
import district from "./components/district/district";

export default {
  name: 'App',
  components: {
    region,
    district
  }
}
</script>

<style>
#app {
  margin-top: 0;
}

.form-inline {
  display: inline-block;
}

.navbar-header.col {
  padding: 0 !important;
}

.navbar {
  background: #fff;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid #d6d6d6;
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);
}

.nav-link img {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin: -8px 0;
  float: left;
  margin-right: 10px;
}

.navbar .navbar-brand {
  color: #555;
  padding-left: 0;
  padding-right: 50px;
  font-family: 'Merienda One', sans-serif;
}

.navbar .navbar-brand i {
  font-size: 20px;
  margin-right: 5px;
}

.search-box {
  position: relative;
}

.search-box input {
  box-shadow: none;
  padding-right: 35px;
  border-radius: 3px !important;
}

.search-box .input-group-addon {
  min-width: 35px;
  border: none;
  background: transparent;
  position: absolute;
  right: 0;
  z-index: 9;
  padding: 7px;
  height: 100%;
}

.search-box i {
  color: #a0a5b1;
  font-size: 19px;
}

.navbar .nav-item i {
  font-size: 18px;
}

.navbar .dropdown-item i {
  font-size: 16px;
  min-width: 22px;
}

.navbar .nav-item.open > a {
  background: none !important;
}

.navbar .dropdown-menu {
  border-radius: 1px;
  border-color: #e5e5e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .05);
}

.navbar .dropdown-menu a {
  color: #777;
  padding: 8px 20px;
  line-height: normal;
}

.navbar .dropdown-menu a:hover, .navbar .dropdown-menu a:active {
  color: #333;
}

.navbar .dropdown-item .material-icons {
  font-size: 21px;
  line-height: 16px;
  vertical-align: middle;
  margin-top: -2px;
}

.navbar .badge {
  color: #fff;
  background: #f44336;
  font-size: 11px;
  border-radius: 20px;
  position: absolute;
  min-width: 10px;
  padding: 4px 6px 0;
  min-height: 18px;
  top: 5px;
}

.navbar a.notifications, .navbar a.messages {
  position: relative;
  margin-right: 10px;
}

.navbar a.messages {
  margin-right: 20px;
}

.navbar a.notifications .badge {
  margin-left: -8px;
}

.navbar a.messages .badge {
  margin-left: -4px;
}

.navbar .active a, .navbar .active a:hover, .navbar .active a:focus {
  background: transparent !important;
}

@media (min-width: 1200px) {
  .form-inline .input-group {
    width: 300px;
    margin-left: 30px;
  }
}

@media (max-width: 1199px) {
  .form-inline {
    display: block;
    margin-bottom: 10px;
  }

  .input-group {
    width: 100%;
  }
}
</style>
