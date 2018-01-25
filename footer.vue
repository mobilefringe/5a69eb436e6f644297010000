<template>
    <footer v-show="route.path != '/'">
        <div class="show_phone">
            <div class="social_icons">
                <a target="_blank" href="//www.facebook.com/Pickeringtowncentre" id="social_fb"></a>
                <a target="_blank" href="//www.twitter.com/#!/PickeringTC" id="social_twitter"></a>
                <a target="_blank" href="//www.instagram.com/pickeringtowncentre" id="social_insta"></a>
                <a href="#" id="social_snap"></a>
                <a target="_blank" href="//www.youtube.com/user/PickeringTownCentre" id="social_yt"></a>
            </div>
            <a href="/stores" class="home_header">STORE DIRECTORY</a>
            <div class="home_hours layout_contact_us site_footer show_phone">
                <div class="main_container">
                    <h2>HOURS</h2>
                    <table id="reg_hours_container" class="hours_container no_margin">
                        <script id="reg_hours_template" type="x-tmpl-mustache/text">
                            {%raw%}
                                <tr>
                                    <td class="hours_left">
                                        <span>{{day}}</span>
                                        <span class="dashes"></span>
                                    </td>   
                                    <td class="hours_right text-right">
                                        <span>{{h}}</span>
                                    </td>
                                </tr>
                            {%endraw%}
                        </script>
                    </table>
                </div>
                
            </div>
            <div class="main_container site_footer">
                <div class="divider"></div>
            </div>
            <div class="layout_contact_us show_phone site_footer">
                <div class="main_container">
                    <h2>CONTACT US</h2>
                    <p><strong>905.683.7171</strong></p>
                    <p><strong>pickeringtowncentre@20vic.com</strong></p>
                    <p class="main_color no_margin">
                        1355 Kingston Road <br />
                        Pickering, Ontario<br />
                        L1V 1B8
                    </p>
                </div>
            </div>
            <a href="/pages/ptc-directions-map" class="home_header show_phone">DIRECTIONS</a>
        </div>
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