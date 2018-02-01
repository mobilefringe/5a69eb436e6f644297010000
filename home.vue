<template>
    <div><!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <!--<div class="home-banner-container" v-if="dataLoaded" v-cloak>-->
                <!-- DYNAMIC BANNERS -->
                <slick ref="slick" :options="slickOptions">
                    <div v-for="banner in homeBanners" v-if="homeBanners">
                        <!--<div class="columns">-->
                            <!--<router-link :to="banner.url" class="">-->
                                <div class="home-banner" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                            <!--</router-link>-->
                        <!--</div>-->
                    </div>
                </slick>
                
            <!--</div>-->
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "vue!vue-slick"], function(Vue, Vuex, Meta, slick){
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
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1600
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
                    'property'
                ]),
                homeBanners() {
                    return _.orderBy(this.$store.state.banners, ['position'], ['asc']);
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "banners")]);
                        return results;
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                }
            }
        })
    })
</script>
