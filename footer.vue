<template>
    <footer>
        <section class="footer_logo">
            <div>
                <img alt="Property Logo" class="site_logo" src="//codecloud.cdn.speedyrails.net/sites/5a69eb436e6f644297010000/image/png/1517945546000/Group 4@2x.png"/>    
            </div>
            <div class="footer_social">
                <div class="social_icons">
                    <span v-for="item in social_media">
                        <a :href="item.url" target="_blank">
                            <i :class="item.iconClass" aria-hidden="true"></i>
                        </a>
                    </span>
                </div>    
            </div>
            <div class="footer_search hidden_phone">
                <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect">
                    <template slot="item" scope="option">
                        <article class="media">
                            <p>{{ option.data.name }}</p>
                        </article>
                    </template>
                </search-component>
            </div>
        </section>
        <section class="footer_menu hidden_phone">
            <div class="main_container ">
                <ul class="footer_site_map hidden_phone">
                    <router-link tag="li" to="/stores" exact>
                        <a>Store Directory</a>
                    </router-link>
                    <router-link tag="li" to="/events" exact>
                        <a>Events</a>
                    </router-link>  
                    <router-link tag="li" to="/promotions" exact>
                        <a>Promotions</a>
                    </router-link>
                    <router-link tag="li" to="/pages/milton-leasing" exact>
                        <a>Leasing</a>
                    </router-link>
                    <router-link tag="li" to="/contact-us" exact>
                        <a>Contact Us</a>
                    </router-link>
                </ul>
            </div>
        </section>
        <section class="footer_privacy">
            <div class="main_container">
                <p class="footer_desc">&#169; {{copyright_year}} {{property.name}} | Powered By <a href="//mallmaverick.com" target="_blank">Mall Maverick</a> | <a href="/pages/milton-privacy-policy">Privacy Policy</a></p>
            </div>
        </section>
    </footer>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue!search-component"], function (Vue, Vuex, moment, tz, VueMoment, SearchComponent) {
        return Vue.component("footer-component", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {
                    suggestionAttribute: 'name',
                    search: '',    
                }
            },
            props:['social_media'],
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedStores'
                ]),
                copyright_year() {
                    return moment().year();
                }
            },
            methods: {
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.$nextTick(function() {
                        this.search = ""
                    });
                    this.$router.push("/stores/" + option.slug);
                }
            }
        });
    });
</script>