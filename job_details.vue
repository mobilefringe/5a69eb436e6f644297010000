<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div v-if="currentJob" class="job_details_container">
                    <div class="row">
                        <div class="col-md-6">
                            <img class="pull-left" src="//codecloud.cdn.speedyrails.net/sites/5a69eb436e6f644297010000/image/jpeg/1517326611000/icon_in.jpg">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentJob.store.slug }}">
                                <span class="promo_store_name">{{ currentJob.store.name }}</span>
                            </router-link>
                            <div class="job_details">
                                <h3 class="job_name">{{ currentJob.name }}</h3>
                                <p class="dates">{{dates}}</p>
                                <p v-if="currentJob.contact_phone" class="dates">
                                    Telephone:<br />
                                    {{ currentJob.contact_phone }}
                                </p>
                                <p class="dates">{{ currentJob.message }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div v-html="currentJob.description" ></div>
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
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "lightbox", "vue-lazy-load", "vue-social-sharing"], function(Vue, Vuex, moment, tz, VueMoment, Meta, Lightbox, VueLazyload, SocialSharing) {
        Vue.use(Meta);
        Vue.use(Lightbox);
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
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findJobBySlug'
                ])
            },
            methods: {
				// getStoreSlug() {
				// 	if (this.currentEvent.eventable_type == "Store") {
				// 		var store_slug = "/stores/" + this.currentEvent.store.slug
				// 		return store_slug
				// 	}
				// },
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
