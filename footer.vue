<template>
    <footer v-show="route.path != '/'">
        <div class="page-container">
            <div class="footer-nav">
                <div class="row">
                    <div class="col-md-4">
                        <ul class="hidden-mobile">
                            <router-link tag="li" to="/stores">
                                <a>Shops & Dining</a>
                            </router-link>
                            <router-link tag="li" to="/events">
                                <a>Events</a>
                            </router-link>
                            <router-link tag="li" to="/art">
                                <a>Art</a>
                            </router-link>
                            <router-link tag="li" to="/news">
                                <a>News</a>
                            </router-link>
                            <router-link tag="li" to="/visit">
                                <a>Visit</a>
                            </router-link>
                            <router-link tag="li" to="/our-story">
                                <a>Our Story</a>
                            </router-link>
                            <router-link tag="li" to="/magazine">
                                <a>The Magazine</a>
                            </router-link>
                            <router-link tag="li" to="/hours">
                                <a>Hours</a>
                            </router-link>
                            <li></li>
                        </ul>    
                    </div>
                    <div class="col-sm-12 col-md-8">
                        <div class="footer-logo">
                            <img src="//codecloud.cdn.speedyrails.net/sites/5a1835f66e6f6422a6650000/image/png/1511801610000/northpark-logo-white.png"  alt="Northpark Property Logo">  
                        </div>
                        <div class="footer-address">
                            <p v-if="property">{{property.address1}} - {{property.city}}, {{property.province_state}} - {{property.contact_phone}}</p>    
                        </div>
                        <div class="footer-social-container">
                            <span v-for="item in social_media">
                                <a :href="item.url" target="_blank">
                                    <i :class="item.iconClass" aria-hidden="true"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copy hidden-mobile">
                <div class="row">
                    <div class="col-md-12">
                        <ul>
                            <li>Site Map</li>
                            <li>
                                <a href="" target="_blank">Mobile App</a>
                            </li>
                            <router-link tag="li" to="/pages/northpark-terms-of-use" active-class="active" exact>
                                <a>Terms of Use</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-northpark-center-code-of-conduct" active-class="active" exact>
                                <a>Code of Conduct</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-privacy-policy" active-class="active" exact>
                                <a>Privacy Policy</a>
                            </router-link>
                            <router-link tag="li" to="/pages/northpark-contact-us" active-class="active" exact>
                                <a>Contact Us</a>
                            </router-link>
                            <li>
                                <a href="http://www.northparkcenter.com/login" target="_blank">Admin Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p>&#169; {{copyright_year}} Copyright Northpark Partners LP</p>    
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function (Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("np-footer", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {
                    
                }
            },
            props:['social_media'],
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'route'
                ]),
                copyright_year() {
                    return moment().year();
                }
            }
        });
    });
</script>