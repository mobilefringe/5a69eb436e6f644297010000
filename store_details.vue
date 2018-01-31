<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
            
            </div>
        </transition>
    </div>
</template>


<div class="row" v-if="currentStore">
    <div class="large-6 columns">
      <div>
        <h1>{{currentStore.name}}</h1>
        <p>{{currentStore.description}}</p>
        <a v-bind:href="currentStore.website">{{currentStore.website}}</a>
      </div>
    </div>
  </div>
  
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function () {
                return {
                    dataLoaded: false,
                    currentStore: null,
                    currentDetails: null,
                    storeEvents: [],
                    storeAssets: [],
                    hours: []
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(this.id);
                });
            },
            watch: {
                $route: function () {
                    this.updateCurrentStore(this.$route.params.id);
                },
                currentStore: function () {
                    

                    var vm = this;
                    var storeHours = [];
                    _.forEach(this.currentStore.store_hours, function (value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    this.hours = storeHours;

                    // if(this.currentStore.category_name != null) {
                    //     var category_name = this.currentStore.category_name
                    //     if(category_name == "NorthPark Cafés" || category_name == "Restaurants / Beverages" || category_name == "Specialty Foods"){
                    //         this.isDine = true;
                    //     } else {
                    //         this.isDine = false;
                    //     }    
                    // }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'stores',
                    'findStoreBySlug',
                    'findHourById',
                    'processedPromos'
                    'findPromoById'
                ]),
                events() {
                    var storeID = this.currentStore.id;
                    var events = [];
                    events = _.filter(this.processedEvents, function (o) { return (o.eventable_id == storeID) });

                    var filteredEvents = [];
                    _.forEach(events, function (value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if (today >= showOnWebDate) {
                            filteredEvents.push(value);
                        }
                    });
                    return filteredEvents
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "events")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentStore(id) {
                    this.currentStore = this.findStoreBySlug(id);
                    if (this.currentStore === null || this.currentStore === undefined) {
                        this.$router.replace({ name: '404' });
                    }
                    this.storeAssets = null;
                },
                truncate(val_description) {
                    var truncate = _.truncate(val_description, { 'length': 249, 'separator': ' ' });
                    return truncate;
                }
            }
        });
    });
</script>
</script>
