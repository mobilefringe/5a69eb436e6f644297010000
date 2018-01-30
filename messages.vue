<template>
    
</template>

<script>
    define(["Vue", "vuex", "vue_router", "routes"], function (Vue, Vuex, VueRouter, appRoutes) {
        return Vue.component("messages-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentMessage: null
                }
            },
            created(){
                this.loadData().then(response => {
                    this.currentMessage = response[1].data.messages.welcome[0].messages[0];
                    console.log(this.currentMessage)
                    this.dataLoaded = true;      
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ]),
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', { url:this.property.mm_host + "/api/v3/northpark/messages.json"})]);
                        return results;
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                }
            }
        });
    });
</script>