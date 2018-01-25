<template>
    <footer v-show="route.path != '/'">
        <section id="footer" class="site_footer">
            <div class="main_container ">
                <div class="footer_site_map hidden_phone">
                    <a href="/about-us">About Us</a>
                    <a href="/leasing">Leasing</a>
                    <a href="/media-centre">Media Centre</a>
                    <a href="/pages/ptc-advertising-sponsorship">Advertising & Sponsorship</a>
                    <a href="/jobs">Careers</a>
                    <a href="//ptc.mallmaverick.com/login"  target="_blank">Tenant Zone</a>
                    <a href="/pages/ptc-security">Security</a>
                    <a href="/pages/ptc-contact-us">Contact Us</a>
                </div>
                
                <div class="row footer_privacy">
                    <div class="col-md-3 col-sm-2 col-xs-6">
                        <a href="/act" id="act_logo"></a>
                    </div>
                    <div class="col-md-6 col-sm-8 text-center hidden_phone">
                        <p class="footer_desc">©<span id="current_year"></span> Pickering Town Centre | Powered by <a href="//mallmaverick.com" target="_blank">Mall Maverick</a> | <a href="/pages/ptc-privacy-policy">Privacy Policy</a></p>
                    </div>
                    <div class="col-md-3 col-sm-2 text-right  col-xs-6">
                        <a href="http://www.cushmanwakefield.ca/en/" target="_blank" id="vic_logo"></a>
                    </div>
                    <div class="col-xs-12 show_phone text-center footer_mobile_privacy">
                        <p class="footer_desc main_color">©<span id="current_year"></span> Pickering Town Centre <br /> Powered by <a href="//mallmaverick.com" target="_blank">Mall Maverick</a> | <a href="/pages/ptc-privacy-policy">Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </section>
    </footer>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function (Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("footer-component", {
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