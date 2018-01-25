<template>
    <header :class="{ home: route.path === '/'}">
        <section id="header" class="header">
            <div class="mobile_menu hidden_now">
                <i class="fa fa-close close_menu"></i>
                <ul class="mobile_nav">
                    <li class="mobile_dropdown">
                        <a href="#" class="open_submenu">
                            Shopping
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <ul class="mobile_dropdown_menu">
                            <router-link tag="li" to="/stores" active-class="active" exact>
                                <a>Stores</a>
                            </router-link>
                            <router-link tag="li" to="/hours" active-class="active" exact>
                                <a>Hours</a>
                            </router-link>
                        </ul>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="#" class="open_submenu">
                            Events
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <ul class="mobile_dropdown_menu">
                            <li><a href="/events">All Events</a></li>
                            <li><a href="/pages/ptc-in-the-community">In the Community</a></li>
                        </ul>
                    </li>
                    <li class="mobile_dropdown"><a href="/promotions">Promotions</a></li>
                    <li class="mobile_dropdown">
                        <a href="#" class="open_submenu">
                            Guest Services
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <ul class="mobile_dropdown_menu">
                            <router-link tag="li" to="/hours" active-class="active" exact>
                                <a>Hours</a>
                            </router-link>
                            <li><a href="/pages/ptc-accessibility">Accessibilty</a></li>
                            <li><a href="/pages/ptc-mall-services">Mall Services</a></li>
                            <li><a href="/pages/ptc-gift-cards">Gift Cards</a></li>
                            <li><a href="/pages/ptc-wifi">WiFi</a></li>
                        </ul>
                    </li>
                    <li class="mobile_dropdown"><a href="/pages/ptc-coming-soon">Blog</a></li>
                    <li class="mobile_dropdown">
                        <a href="/about-us">About Us</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/leasing">Leasing</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/media-centre">Media Centre</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/pages/ptc-advertising-sponsorship">Advertising & Sponsorship</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/jobs">Careers</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="//ptc.mallmaverick.com/login" target="_blank">Tenant Zone</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/pages/ptc-security">Security</a>
                    </li>
                    <li class="mobile_dropdown">
                        <a href="/pages/ptc-contact-us">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div class="row main_container">
                <div class="col-md-3 mobile_text_center">
                    <a href="/">
                        <img alt="logo" class="site_logo" src="//codecloud.cdn.speedyrails.net/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png">
                    </a>
                    <img src="//codecloud.cdn.speedyrails.net/sites/579231876e6f6467cf000000/image/png/1470851965000/menu.png" class="open_menu" alt="open menu">
                </div>
                <div class="col-md-9 hidden_phone">
                    <div class="header_social pull-right">
                        <div class="social_icons">
                            <span v-for="item in social_media">
                                <a :href="item.url" target="_blank">
                                    <i :class="item.iconClass" aria-hidden="true"></i>
                                </a>
                            </span>
                            <!--<a target="_blank" href="//www.facebook.com/Pickeringtowncentre" id="social_fb"></a>-->
                            <!--<a target="_blank" href="//www.twitter.com/#!/PickeringTC" id="social_twitter"></a>-->
                            <!--<a target="_blank" href="//www.instagram.com/pickeringtowncentre" id="social_insta"></a>-->
                            <!--<a href="#" id="social_snap"></a>-->
                            <!--<a target="_blank" href="//www.youtube.com/user/PickeringTownCentre" id="social_yt"></a>-->
                            <div class="header_newsletter_container">
                                <input id="header_newsletter" class="newsletter_input" type="text" placeholder="Join our newsletter!" />
                                <input id="header_newsletter_submit" class="newsletter_btn" type="submit" value="Subscribe" />
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="main_menu pull-right">
                        <ul class="main_nav">
                            <li class="dropdown" v-on:mouseover="mouseOver" v-bind:class="{ open: active }">
                                <!--<span class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">-->
                                    Shopping
                                <!--</span>-->
                                <ul class="dropdown-menu">
                                    <router-link tag="li" to="/stores" active-class="active" exact>
                                        <a>Stores</a>
                                    </router-link>
                                    <router-link tag="li" to="/hours" active-class="active" exact>
                                        <a>Hours</a>
                                    </router-link>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    Events
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="/events">All Events</a></li>
                                    <li><a href="/pages/ptc-in-the-community">In the <br />Community</a></li>
                                </ul>
                            </li>
                            <!--<li class="dropdown"><a href="/promotions">Promotions</a></li>-->
                            <router-link tag="li" to="/promotions" class="dropdown" active-class="active" exact>
                                <a>Promotions</a>
                            </router-link>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    Guest Services
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="/pages/ptc-accessibility">Accessibilty</a></li>
                                    <li><a href="/pages/ptc-mall-services">Mall Services</a></li>
                                    <li><a href="/pages/ptc-gift-cards">Gift Cards</a></li>
                                    <li><a href="/pages/ptc-wifi">WiFi</a></li>
                                </ul>
                            </li>
                            <li class="dropdown"><a href="/pages/ptc-coming-soon"  >Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
    define(["Vue", "vuex", "vue_router", "routes"], function (Vue, Vuex, VueRouter, appRoutes) {
        return Vue.component("header-component", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    active: false,    
                }
            },
            props:['social_media'],
            watch: {
                show_menu: function() {
                    if(this.show_menu == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_menu == false) {
                        document.body.classList.remove("no-scroll");
                    }
                },
                show_search: function(){
                    if(this.show_search == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_search == false) {
                        document.body.classList.remove("no-scroll");
                    } 
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedStores',
                    'route'
                ])
            },
            methods: {
                mouseOver: function() {
                    this.active = !this.active;
                    console.log("flag " + this.active);
                }
            }
            // methods: {
            //     onOptionSelect(option) {
            //         console.log('Selected option:', option);
            //         this.$router.push("/stores/" + option.slug);
            //         this.show_search = false;
            //         this.search = '';
            //     }
            // }
        });
    });
</script>