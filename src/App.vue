<template>
  <div id="root">
    <div class="tabs">
      <div class="tab">
        <router-link to="/addticket">Input Ticket</router-link>
      </div>
      <div class="tab">
        <router-link to="/table">Show Ticket</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      message: "",
    };
  },
};
</script>

<style>
.tabs {
  display: flex;
}

.tab {
  flex-grow: 1;
  text-align: center;
}

.tab a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab a:hover,
.tab a.router-link-active {
  border-bottom-color: black;
  font-weight: bold;
}
</style>
