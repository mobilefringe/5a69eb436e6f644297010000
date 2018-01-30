<template>
    <div class="inside_header_background">
        <div class="hours_container">
            Hours    
        </div>
        <div class="stores_container">
            Stores
        </div>
        <div class="page_container">
            
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
                
            }
        });
    });
</script>