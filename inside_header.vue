<template>
    <div class="inside_header_background">
        <div class="main_container">
            <div class="hours_container">
                <h3>Hours</h3>
            </div>
            <div class="stores_container">
                <router-link tag="h3" to="/stores" exact>
                    <a>Stores</a>
                </router-link>
            </div>
            <div class="page_container">
                <h1>{{ getPageName() }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex"], function (Vue, Vuex) {
        return Vue.component("inside-header-component", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    active: false,    
                }
            },
            watch: {
                $route: function () {
                    console.log(this.$route)
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours'
                ]),
            },
            methods: {
                getPageName(){
                    return this.$route.meta.pageName    
                }    
            }
        });
    });
</script>