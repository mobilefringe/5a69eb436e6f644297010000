<template>
    <header>
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
                    <div class="">
                        <a v-on:click="changeLocale('fr-ca')">FR</a>
                        <a v-on:click="changeLocale('en-ca')">EN</a>
                        <!--v-if="locale === 'fr-ca'"-->
                    </div>
                    <div class="header_social">
                        <div class="social_icons">
                            <span v-for="item in social_media">
                                <a :href="item.url" target="_blank">
                                    <i :class="item.iconClass" aria-hidden="true"></i>
                                </a>
                            </span>
                        </div>
                        <div class="header_newsletter_container">
                            <input id="header_newsletter" class="newsletter_input" type="text" placeholder="Join our newsletter!" />
                            <input id="header_newsletter_submit" class="newsletter_btn" type="submit" value="Subscribe" />
                        </div>
                    </div>
                    <nav id="primary_nav">
                        <ul>
                            <li class="menu_item">Shopping
                                <ul>
                                    <router-link tag="li" to="/stores" class="submenu_item" exact>
                                        <a>Stores</a>
                                    </router-link>
                                    <router-link tag="li" to="/hours" class="submenu_item" exact>
                                        <a>Hours</a>
                                    </router-link>
                                </ul>
                            </li>
                            <router-link tag="li" to="/events" class="menu_item" exact>
                                Events
                            </router-link>
                            <router-link tag="li" to="/promotions" class="menu_item" exact>
                                Promotions
                            </router-link>
                            <li class="menu_item">Guest Services
                                <ul>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>Link 1</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>Link 2</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>Link 3</a>
                                    </router-link>
                                </ul>
                            </li>
                        </ul>
                    </nav>
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
                
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ]),
                locale: {
                    get () {
                        return this.$store.state.locale
                    },
                    set (value) {
                        this.$store.commit('SET_LOCALE', { lang: value })
                    }
                }
            },
            methods: {
                changeLocale: function(val) {
                    // this will update the data store, which in turn will trigger the watcher to update the locale in the system
                    this.locale = val; 
                }    
            }
        });
    });
</script>