<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" class="main_container margin_30" v-cloak> 
                <div class="row" v-if="currentPage">
                    <div class="col-md-12">
                        <h3 v-html="currentPage.title"></h3>
                        <div class="" v-html="currentPage.body"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue-meta"], function (Vue, Vuex, Meta) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function data() {
                return {
                    dataLoaded: false,
                    currentPage: null
                }
            },
            created() {
                this.updateCurrentPage(this.id);
            },
            watch: {
                $route: function () {
                    this.updateCurrentPage(this.$route.params.id);
                    if (this.$route.path == "/pages/northpark-parking-valet-page" || this.$route.path == "/pages/northpark-concierge-services" || this.$route.path == "/pages/northpark-northpark-gold-gift-cards" || this.$route.path == "/pages/northpark-contact-us") {
                        this.visitSubPage = true;
                    } else {
                        this.visitSubPage = false;
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            },
            methods: {
                updateCurrentPage(id) {
                    var _this = this;
                    this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/" + this.id + ".json" }).then(function (response) {
                        _this.currentPage = response.data;
                        _this.dataLoaded = true;
                        if (_this.currentPage.slug == "northpark-parking-valet-page" || _this.currentPage.slug == "northpark-concierge-services" || _this.currentPage.slug == "northpark-northpark-gold-gift-cards" || _this.currentPage.slug == "northpark-contact-us") {
                            this.visitSubPage = true;
                        } else {
                            this.visitSubPage = false;
                        }
                    }, function (error) {
                        console.error( "Could not retrieve data from server. Please check internet connection and try again.");
                        _this.$router.replace({ name: '404' });
                    });
                }
            }
        });
    });
</script>