<template>
    <header>
        <section id="header" class="header main_container">
            <div class="row logo_container">
                <div class="col-md-3 mobile_text_center">
                    <a href="/">
                        <img alt="Property Logo" class="site_logo" src="//codecloud.cdn.speedyrails.net/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png">
                    </a>
                    <!--<img src="//codecloud.cdn.speedyrails.net/sites/579231876e6f6467cf000000/image/png/1470851965000/menu.png" class="open_menu" alt="open menu">-->
                </div>
                <div class="col-md-9 hidden_phone">
                    <div class="language_select">
                        <a v-on:click="changeLocale('en-ca')">EN</a>
                        <span> | </span>
                        <a v-on:click="changeLocale('fr-ca')">FR</a>
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
                    </div>
                    <div class="header_newsletter">
                        <div class="header_newsletter_container">
                            <input id="header_newsletter" class="newsletter_input" type="text" :placeholder='$t("header.newsletter-join")' />
                            <input id="header_newsletter_submit" class="newsletter_btn" type="submit" :value='$t("header.newsletter-subscribe")' />
                        </div>
                    </div>
                    <nav id="primary_nav">
                        <ul>
                            <li class="menu_item">{{ $t("menu.store-directory") }}
                                <ul>
                                    <router-link tag="li" to="/stores" class="submenu_item" exact>
                                        <a>{{ $t("menu.store-directory") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/map" class="submenu_item" exact>
                                        <a>{{ $t("menu.centre-map") }}</a>
                                    </router-link>
                                </ul>
                            </li>
                            <router-link tag="li" to="/events" class="menu_item" exact>
                                {{ $t("menu.events") }}
                            </router-link>
                            <router-link tag="li" to="/promotions" class="menu_item" exact>
                                {{ $t("menu.promotions") }}
                            </router-link>
                            <li class="menu_item">{{ $t("menu.leasing") }}
                                <ul>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.leasing") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.photos") }}</a>
                                    </router-link>
                                </ul>
                            </li>
                            <li class="menu_item">{{ $t("menu.contact") }}
                                <ul>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.contact") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.find") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.about") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/jobs" class="submenu_item" exact>
                                        <a>{{ $t("menu.jobs") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/hours" class="submenu_item" exact>
                                        <a>{{ $t("menu.hours") }}</a>
                                    </router-link>
                                    <router-link tag="li" to="/" class="submenu_item" exact>
                                        <a>{{ $t("menu.community") }}</a>
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