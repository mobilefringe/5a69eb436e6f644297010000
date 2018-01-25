<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div v-if="currentEvent" class="event_details_container">
                    <div class="row">
                        <div class="col-md-6">
                            <img v-lazy="currentEvent.image_url" :alt="currentEvent.name"/>
                        </div>
                        <div class="col-md-6">
                            <h3>{{ currentEvent.name }}</h3>
                            <p class="dates" v-if="isMultiDayEvent(currentEvent)">{{ currentEvent.start_date | moment("ddd, MMM D, YYYY", timezone)}} to {{ currentEvent.end_date | moment("ddd, MMM D, YYYY", timezone)}}</p>
                        <p class="dates" v-else>{{ currentEvent.start_date | moment("ddd, MMM D, YYYY", timezone)}}</p>
                            <div class="details_desc">{{ currentEvent.description }}</div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-md-12">
                            <!--<div class="text-center">-->
                            <!--    <a href="//www.facebook.com/sharer.php?u=https://pickeringtowncentre.com/events/{{slug}}" target="_blank">-->
                            <!--        <img id="fb" class="hidden-phone" src="//mallmaverick.cdn.speedyrails.net/system/site_images/photos/000/002/939/original/share_fb_normal.png?1403227481">-->
                            <!--    </a>-->
                            <!--    <a href="//twitter.com/share?text={{name}}&url=https://pickeringtowncentre.com/events/{{slug}}" target="_blank">-->
                            <!--        <img id="twtr" class="promo_box_social hidden-phone" src="//mallmaverick.cdn.speedyrails.net/system/site_images/photos/000/002/941/original/share_tweet_normal.png?1403227503">-->
                            <!--    </a>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>    
            </div>
        </transition>
    </div>
</template>

<script>
	define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "lightbox", "vue-lazy-load"], function(Vue, Vuex, moment, tz, VueMoment, Meta, Lightbox, VueLazyload) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        Vue.use(VueLazyload);) {
		return Vue.component("event-details-component", {
			template: template, // the variable template will be injected,
			props: ['id'],
			data: function() {
				return {
					dataLoaded: false,
					currentEvent: null,
					store_hours: [],
				}
			},
			created() {
				this.$store.dispatch("getData", "events").then(response => {
					this.currentEvent = this.findEventBySlug(this.id);
					if (this.currentEvent === null || this.currentEvent === undefined) {
						this.$router.replace({ name: '404' });
					}
					this.dataLoaded = true;
				}, error => {
					console.error("Could not retrieve data from server. Please check internet connection and try again.");
				});
			},
			watch: {
				currentEvent: function() {
					if (this.currentEvent.eventable_type == "Store") {
						var vm = this;
						var storeHours = [];
						_.forEach(this.currentEvent.store.store_hours, function(value, key) {
							storeHours.push(vm.findHourById(value));
						});
						this.store_hours = storeHours;
					}
				}
			},
			computed: {
				...Vuex.mapGetters([
					'property',
					'timezone',
					'getPropertyHours',
					'processedEvents',
					'findEventBySlug',
					'findHourById'
				])
			},
			methods: {
				getStoreSlug() {
					if (this.currentEvent.eventable_type == "Store") {
						var store_slug = "/stores/" + this.currentEvent.store.slug
						return store_slug
					}
				},
				isMultiDayEvent(currentEvent) {
					var timezone = this.timezone
					var start_date = moment(currentEvent.start_date).tz(timezone).format("MM-DD-YYYY")
					var end_date = moment(currentEvent.end_date).tz(timezone).format("MM-DD-YYYY")
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