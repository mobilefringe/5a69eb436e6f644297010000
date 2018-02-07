<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div v-if="currentJob" class="job_details_container">
                    <div class="row">
                        <div class="col-md-6">
                            <img v-lazy="currentJob.store.store_front_url_abs" :alt="currentJob.store.name" class="jobs_logo"/>
                        </div>
                        <div class="col-md-6">
                            <img class="pull-left" style="margin-right:10px" src="//mallmaverick.cdn.speedyrails.net/system/site_images/photos/000/002/935/original/icon_in.jpg?1403210088">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentJob.store.slug }}">
                                <span class="job_store_name">{{ currentJob.store.name }}</span>
                            </router-link>
                            <div class="job_details">
                                <p class="job_name">{{ currentJob.name }}</p>
                                <p class="job_date" v-if="isMultiDayEvent(currentJob)">
                                    {{ currentJob.start_date | moment("MMM D, YYYY", timezone)}} to {{ currentJob.end_date | moment("MMM D, YYYY", timezone)}}
                                </p>
                                <p class="job_date" v-else>{{ currentJob.start_date | moment("ddd, MMM D, YYYY", timezone)}}</p>
                                <p v-if="currentJob.contact_phone" class="dates">Telephone: {{ currentJob.contact_phone }}</p>
                                <p v-if="currentJob.message" class="dates">Message: {{ currentJob.message }}</p>
                            </div>
                            <div class="job_desc" v-html="currentJob.rich_description"></div>
                            <div class="row"> 
                                <div class="col-md-12">
                                    <social-sharing v-if="currentJob" :url="shareURL(currentJob.slug)" :title="currentJob.title" :description="currentJob.body" :quote="truncate(currentJob.body)" twitter-user="PickeringTC" :media="currentJob.image_url" inline-template>
                                        <div class="social_share">
                                            <h5>Share</h5>
                                            <network network="facebook">
                                                <i class="fa fa-facebook-square"></i>
                                            </network>
                                            <network network="twitter">
                                                <i class="fa fa-twitter-square"></i>
                                            </network>
                                        </div>
                                    </social-sharing>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-lazy-load", "vue-social-sharing"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueLazyload, SocialSharing) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
        Vue.component('social-sharing', SocialSharing);
        return Vue.component("job-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function() {
                return {
                    dataLoaded: false,
                    currentJob: null
                }
            },
            created() {
				this.$store.dispatch("getData", "jobs").then(response => {
					this.currentJob = this.findJobBySlug(this.id);
					if (this.currentJob === null || this.currentJob === undefined) {
						this.$router.replace({ path: '/jobs' });
					}
					this.dataLoaded = true;
				}, error => {
					console.error("Could not retrieve data from server. Please check internet connection and try again.");
				});
				
			},
			watch: {
                currentJob : function (){
                    if(this.currentJob != null) {
                        if (this.currentJob.store != null && this.currentJob.store != undefined && _.includes(this.currentJob.store.store_front_url_abs, 'missing')) {
                            this.currentJob.store.store_front_url_abs = "http://placehold.it/400x400";
                        } else if (this.currentJob.store == null || this.currentJob.store == undefined) {
                            this.currentJob.store = {};
                            this.currentJob.store.store_front_url_abs =  "http://placehold.it/400x400";
                        }
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findJobBySlug'
                ])
            },
            methods: {
				isMultiDayEvent(currentEvent) {
					var timezone = this.timezone
					var start_date = moment(currentEvent.start_date).tz(timezone).format("MM-DD-YYYY")
					var end_date = moment(currentEvent.end_date).tz(timezone).format("MM-DD-YYYY")
					if (start_date === end_date) {
						return false
					} else {
						return true
					}
				},
				truncate(val_body) {
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
				shareURL(slug) {
                    var share_url = "https://www.pickeringtowncentre.com/events/" + slug
                    return share_url
                }
			}
        });
    });
</script>
