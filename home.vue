<template>
    <div><!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div class="home-banner-container" v-if="dataLoaded" v-cloak>
                <slick ref="slick" :options="slickOptions">
                    <div v-if="homeBanners" v-for="banner in homeBanners">
                        <!--<router-link :to="banner.url" class="">-->
                            <div class="banner_image" v-bind:style="{ backgroundImage: 'url(' + banner.image_url + ')' }"></div>
                        <!--</router-link>-->
                    </div>
                </slick>
                
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
                    // console.log(this.$store.state.banners)
                
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
                    
                    console.log(banners)
                //     if(val.url == "" || val.url === null){
                //         val.css = "style=cursor:default;";
                //         val.noLink = "return false";
                //     }
                //   if (start <= today){
                //      if (val.end_date){
                //          end = new Date (val.end_date);
                //          end.setDate(end.getDate() + 1);
                //          if (end >= today){
                //           item_list.push(val);  
                //          }
                         
                //      } else {
                //          item_list.push(val);
                //      }
                //   }
       
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
