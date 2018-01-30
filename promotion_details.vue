<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
            
            </div>
        </transition>
    </div>
</template>

<!--<div>-->
<!--        <h1>{{currentPromo.name}}</h1>-->
<!--        <p><router-link :to="{ name: 'storeDetails', params: { id: currentPromo.store.slug }}">{{currentPromo.store.name}}</router-link> | {{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>-->
<!--        <p>{{currentPromo.description}}</p>-->
<!--        <img :src="currentPromo.image_url">-->
<!--      </div>-->
      
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("promo-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function() {
                return {
                    currentPromo: null
                }
            },
            created() {
				this.$store.dispatch("getData", "promotions").then(response => {
					this.currentPromo = this.findPromoBySlug(this.id);
					if (this.currentPromo === null || this.currentPromo === undefined) {
						this.$router.replace({ path: '/promotions' });
					}
					this.dataLoaded = true;
				}, error => {
					console.error("Could not retrieve data from server. Please check internet connection and try again.");
				});
			},
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                    'findPromoBySlug',
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
