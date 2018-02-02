<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="job_container" v-for="job in processedJobs">
                    <img class="pull-left" src="https://codecloud.cdn.speedyrails.net/sites/5a69eb436e6f644297010000/image/jpeg/1517326611000/icon_in.jpg">
                    <!--<a href="/stores/{{store_detail_btn}}" class="promo_store_name">{{store_name}}</a>-->
                    <router-link :to="{ name: 'storeDetails', params: { id: job.store.slug }}">
                        <span class="job_store_name">{{ job.store.name }}</span>
                    </router-link>
                    <div class="job_details">
                        <div class="row">
                            <div class="col-md-5">
                                <h3 class="job_name">{{job.name}}</h3>
                            </div>
                            <div class="col-md-4">
                                <p class="read_more">{{job.job_type}}</p>
                            </div>
                            <div class="col-md-3">
                                <!--<p class="no_margin read_more"><a href="/jobs/{{job.slug}}" class="no_margin read_more"> READ MORE</a></p>-->
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "lightbox", "vue-lazy-load"], function (Vue, Vuex, moment, tz, VueMoment, Meta, Lightbox, VueLazyload) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        Vue.use(VueLazyload);
        return Vue.component("jobs-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            watch: {
                selected: function () {
                    this.sortByDate();
                },
                currentDate: function () {
                    this.sortByDate();
                },
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedJobs'
                ]),
                events: function events() {
                    var events = this.processedEvents;
                    var showEvents = [];
                    _.forEach(events, function (value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if (today >= showOnWebDate) {
                          showEvents.push(value);
                        }
                    });
                    var sortedEvents = _.orderBy(showEvents, function (o) { return o.end_date })
                    return sortedEvents
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "jobs")]);
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
