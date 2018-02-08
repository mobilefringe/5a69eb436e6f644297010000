<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="job_container" v-for="job in processedJobs">
                    <div class="job_img_container">
                        <img v-lazy="job.store.store_front_url_abs" :alt="promo.name" />
                    </div>
                    <router-link :to="{ name: 'storeDetails', params: { id: job.store.slug }}">
                        <span class="job_store_name">{{ job.store.name }}</span>
                    </router-link>
                    <h3 class="job_name">{{ job.name }}</h3>
                    <p class="read_more">{{job.job_type}}</p>
                    <router-link :to="{ name: 'jobDetails', params: { id: job.slug }}">
                        <span class="read_more">Read More</span>
                    </router-link>
                </div>
                
                
                <!--<div class="job_container" v-for="job in processedJobs">-->
                <!--    <img class="pull-left" src="https://codecloud.cdn.speedyrails.net/sites/5a69eb436e6f644297010000/image/jpeg/1517326611000/icon_in.jpg">-->
                <!--    <router-link :to="{ name: 'storeDetails', params: { id: job.store.slug }}">-->
                <!--        <span class="job_store_name">{{ job.store.name }}</span>-->
                <!--    </router-link>-->
                <!--    <div class="job_details">-->
                <!--        <div class="row">-->
                <!--            <div class="col-md-5">-->
                <!--                <h3 class="job_name">{{job.name}}</h3>-->
                <!--            </div>-->
                <!--            <div class="col-md-4">-->
                <!--                
                <!--            </div>-->
                <!--            <div class="col-md-3">-->
                <!--                <router-link :to="{ name: 'jobDetails', params: { id: job.slug }}">-->
                <!--                    <p class="read_more">Read More</p>-->
                <!--                </router-link>-->
                <!--            </div>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--</div>  -->
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("jobs-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    console.log(this.processedJobs)
                });
                
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedJobs'
                ])
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "jobs")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>