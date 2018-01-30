<template>
    <div class="inside_header_background">
        <div class="main_container">
            <div class="hours_container">
                Hours    
            </div>
            <div class="stores_container">
                <router-link tag="p" to="/stores" exact>
                    Stores
                </router-link>
            </div>
            <div class="page_container">
                {{ getPageName() }}    
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