<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="row">
                    <div class="store_nav">
                        <div class="row">
                            <div class="col-md-3">
                                <a class="active_store_nav" href="/stores">DIRECTORY</a>
                            </div>
                            <div class="col-md-3">
                                <a href="/map">CENTER MAP</a>
                            </div>
                            <div class="col-md-4">
                                <span>Sort By: </span>
                                <a v-on:click="changeMode('alphabetical')">Alphabetical</a>
                            </div>
                            <div class="col-md-2">
                                <a v-on:click="changeMode('category')">Category</a>
                            </div>
                        </div>
                    </div>    
                </div>
            
            
  
    <!--<ul class="menu">-->
    <!--  <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>-->
    <!--  <li><a v-on:click="changeMode('category')">Category</a></li>-->
    <!--</ul>-->
    
    
    <hr/>
    <div class="columns large-12" v-for="(stores, index) in storesByAlphaIndex" v-if="listMode === 'alphabetical'">
      <div class="list_header">
        <b>{{index}}</b>
        <hr/>
      </div>
      <div class="store-section" v-for="store in stores">
        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
        <hr/>
      </div>
      <!-- <div class="card">
        <div class="card-divider">
          {{ store.name }}
        </div>
        <div class="card-section center">
          <a :href="store.image_url" target="_blank"><img :src="store.image_url"></a>
        </div>
        <div class="card-section">
          <div class="center">
            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">View Details</router-link>
          </div>
        </div>
      </div> -->
    </div>
    <div class="columns large-12" v-for="(stores, index) in storesByCategoryName" v-if="listMode === 'category'">
      <div class="list_header">
        <b>{{index}}</b>
        <hr/>
      </div>
      <div class="store-section" v-for="store in stores">
        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
        <hr/>
      </div>
    </div>
  </div>
</template>

<style>
  .center{
    text-align: center
  }
  .store-section a{
    color: #708090;
  }
</style>

<script>
  define(["Vue", "vuex"], function(Vue, Vuex) {
    return Vue.component("stores-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          listMode: "alphabetical",
          dataLoaded: false
        }
      },
      created(){
        this.$store.dispatch("getData", "categories").then(response => {
          this.dataLoaded = true
        }, error => {
          console.error("Could not retrieve data from server. Please check internet connection and try again.");
        });
      },
      mounted(){
        console.log(this.$store.state);  
      },
      methods: {
        changeMode (mode) {
          this.listMode = mode;
        }
      },
      computed: {
        ...Vuex.mapGetters([
          'storesByAlphaIndex',
          'storesByCategoryName'
        ])
      }
    });
  });
</script>
