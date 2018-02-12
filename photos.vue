<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="row">
                    <div v-for="image in images" class="col-md-6 leasing_photo_container">
                        <a :href="image.image_url" :data-lightbox="image.image_url">
                            <div class="leasing_photo" v-lazy:background-image="image.image_url"></div>
                        </a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "lightbox", "vue-lazy-load"], function(Vue, Vuex, Meta, Lightbox, VueLazyload) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        Vue.use(VueLazyload);
        return Vue.component("photos-component", {
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
                    'timezone',
                    'repos',
                    'findRepoByName'
                    
                ]),
                images() {
                    // console.log(this.findRepoByName("photos").images)
                    // return this.findRepoByName("photos").images
                    
                    var images = _.filter(this.findRepoByName("photos").images, function(o) {
                        if(_.includes(o.image_url, ".png") || _.includes(o.image_url, ".jpg")){
                            console.log(o.image_url)
                            return o
                        }    
                    });
                    console.log(images)
                },
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>