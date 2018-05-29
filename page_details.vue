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
                        <!--<h3 class="page_title" v-html="currentPage.title"></h3>-->
                        <div class="page_body" v-html="currentPage.body"></div>
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
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            },
            methods: {
                updateCurrentPage(id) {
                    this.property.mm_host = this.property.mm_host.replace("http:", "");
                    var _this = this;
                    this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/" + this.id + ".json" }).then(function (response) {
                        _this.currentPage = response.data;
                        _this.dataLoaded = true;
                    }, function (error) {
                        console.error( "Could not retrieve data from server. Please check internet connection and try again.");
                        _this.$router.replace({ name: '404' });
                    });
                }
            }
        });
    });
</script>