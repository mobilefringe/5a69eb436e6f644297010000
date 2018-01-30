<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="currentPage && dataLoaded" class="page-container" v-cloak>
                <div class="margin-90"></div>
                <div v-if="currentPage">
                    <div class="row">
                        <div class="col-md-4 col-md-push-8">
                            <div class="sidebar">
                                <div class="sidebar-container">
                                    <h5>Hours</h5>
                                    <ul class="sidebar-hours-list">
                                        <li v-if="getPropertyHours" v-for="hour in getPropertyHours">
                                            {{hour.day_of_week | moment('dddd', timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h
                                            A", timezone)}}
                                        </li>
                                    </ul>
                                    <br>
                                    <router-link to="/hours" active-class="active" exact>
                                        <a class="details-link">View Detailed Hours
                                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                        </a>
                                    </router-link>
                                </div>
                                <div class="sidebar-container">
                                    <h5 class="">Find Us</h5>
                                    <p class="uppercase">
                                        {{property.name}}
                                        <br> {{property.address1}}
                                        <br> {{property.city}}, {{property.province_state}} {{property.postal_code}}
                                        <br> {{property.contact_phone}}
                                    </p>
                                    <p class="uppercase">
                                        Northpark Center Concierge
                                        <br> {{property.contact_fax}}
                                    </p>
                                </div>
                                <div class="sidebar-container">
                                    <a class="details-link" href="https://www.google.com/maps/place/NorthPark+Center/@32.868225,-96.773204,15z/data=!4m5!3m4!1s0x0:0x95fc10ba98f7aad4!8m2!3d32.8680671!4d-96.7735128?hl=en-US"
                                        target="_blank">Get Directions
                                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-md-pull-4">
                            <h2 class="page_title" v-html="currentPage.title"></h2>
                            <hr>
                            <div class="" v-html="currentPage.body"></div>
                        </div>
                    </div>
                    <div v-if="visitSubPage" class="row">
                        <div class="col-md-12">
                            <p class="page-breadcrumb">
                                {{property.name}}
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                                <router-link tag="a" to="/visit" active-class="active" exact>
                                    Visit
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </router-link>
                                <span v-if="currentPage">{{currentPage.title}}</span>
                            </p>
                        </div>
                    </div>
                    <div v-if="!visitSubPage" class="row">
                        <div class="col-md-12">
                            <p class="page-breadcrumb">
                                {{property.name}}
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                                <span v-if="currentPage">{{currentPage.title}}</span>
                            </p>
                        </div>
                    </div>
                    <!--<page-breadcrumb></page-breadcrumb>-->
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, Vuex, moment, tz, VueMoment, Meta) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function data() {
                return {
                    dataLoaded: false,
                    currentPage: null,
                    visitSubPage: false
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
                    'property',
                    'timezone',
                    'getPropertyHours'
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