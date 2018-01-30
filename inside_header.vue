<template>
    <div>
        <div>
            Hours    
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