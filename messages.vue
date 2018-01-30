<template>
    
</template>

<script>
    define(["Vue", "vuex", "vue_router", "routes"], function (Vue, Vuex, VueRouter, appRoutes) {
        return Vue.component("messages-component", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    
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
                
            }
        });
    });
</script>