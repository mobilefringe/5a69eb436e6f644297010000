<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
            
            </div>
        </transition>
    </div>
</template>


    <!--<div class="columns large-3 medium 6" v-for="promo in processedPromos">-->
    <!--  <div class="card">-->
    <!--    <div class="card-divider">-->
    <!--      {{ promo.name }}-->
    <!--    </div>-->
    <!--    <div class="card-section center">-->
    <!--      <a :href="promo.image_url" target="_blank"><img :src="promo.image_url"></a>-->
    <!--    </div>-->
    <!--    <div class="card-section">-->
    <!--      <div class="center">-->
    <!--        <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>-->
    <!--        <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">Read More</router-link>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->


<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'm
                    'processedPromos'
                ])
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "promotions")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                isMultiDayEvent(event) {
                    var timezone = this.timezone
                    var start_date = moment(event.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(event.end_date).tz(timezone).format("MM-DD-YYYY")
                    if (start_date === end_date) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        });
    });
</script>