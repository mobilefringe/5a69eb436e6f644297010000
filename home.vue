<template>
    <div><!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="home_banner_container" >
                    <slick ref="slick" :options="slickOptions">
                        <div v-if="homeBanners" v-for="banner in homeBanners">
                            <router-link v-if="banner.url" :to="banner.url" class="">
                                <div class="banner_image" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                            </router-link>
                            <div v-else class="banner_image" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                        </div>
                    </slick>
                    <div class="home_banner_wrapper">
                        <div class="home_hours">
                            <h3>{{ $t("hours.hours-title") }}</h3>
                            <div>
                                <p>
                                    {{ $t("hours.hours-mon") }}:<br/>
                                    <span v-for="hour in weekdayHours">
                                        {{hour.open_time | moment("h:mm a", timezone)}} - {{hour.close_time | moment("h:mm a", timezone)}}    
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    {{ $t("hours.hours-sat") }}:<br/>
                                    <span v-for="hour in saturdayHours">
                                        {{hour.open_time | moment("h:mm a", timezone)}} - {{hour.close_time | moment("h:mm a", timezone)}}    
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    {{ $t("hours.hours-sun") }}:<br/>  
                                    <span v-for="hour in sundayHours">
                                        {{hour.open_time | moment("h:mm a", timezone)}} - {{hour.close_time | moment("h:mm a", timezone)}}    
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="home_stores">
                            STORES
                        </div>
                    </div>
                </div>
                <div class="main_container">
                    <div v-if="featureItems" class="feature_item_container">
                        <div v-for="item in featureItems" class="feature_item">
                            <img :src="item.image_url" />
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function (Vue, Vuex, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false,
                    slickOptions: {
                        arrows: false,
                        autoplay: true,
                        autoplaySpeed: 6000,
                        cssEase: 'linear',
                        dots: true,
                        fade: false,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1000
                    }
                }
            },
            created(){
                this.loadData().then(response => {
                    this.dataLoaded = true;  
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours'
                ]),
                homeBanners() {
                    var banners = [];
                    _.forEach(this.$store.state.banners, function (value, key) {
                        var today = new Date();
                        var start = new Date (value.start_date);
                        if (start <= today){
                            if (value.end_date){
                                var end = new Date (value.end_date);
                                if (end >= today){
                                    banners.push(value);  
                                }
                            } else {
                                banners.push(value);
                            }
                        }
                    });
                    return banners
                },
                featureItems() {
                    console.log(this.$store.state.feature_items)
                    return _.slice(this.$store.state.feature_items, 0, 2);
                    // return this.$store.state.feature_items
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "banners"), this.$store.dispatch("getData", "feature_items")]);
                        return results;
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                }
            }
        })
    })
</script>
