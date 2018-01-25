<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="currentEvent && dataLoaded" v-cloak>
                
            </div>
        </transition>
    </div>
</template>

<script>
	define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
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