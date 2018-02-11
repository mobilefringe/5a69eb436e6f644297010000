<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="job_container" v-if="processedJobs.length > 0" v-for="job in processedJobs">
                    <div class="job_image_container">
                        <img v-lazy="job.store.store_front_url_abs" :alt="job.name" />
                    </div>
                    <router-link :to="{ name: 'storeDetails', params: { id: job.store.slug }}">
                        <span class="job_store_name">{{ job.store.name }}</span>
                    </router-link>
                    <h3 class="job_name">{{ job.name }}</h3>
                    <p class="job_type">{{job.job_type}}</p>
                    <router-link :to="{ name: 'jobDetails', params: { id: job.slug }}">
                        <span class="read_more">Read More</span>
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "vue-lazy-load"], function (Vue, Vuex, Meta, VueLazyload) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
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
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
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