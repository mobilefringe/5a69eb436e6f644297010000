<template>
    
</template>

<script>
    define(["Vue", "vuex"], function (Vue, Vuex) {
        return Vue.component("messages-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentMessage: null
                }
            },
            created(){
                this.loadData().then(response => {
                    console.log(this.property)
                    this.currentMessage = response[1].data.messages.welcome[0].messages[0];
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
                        let results = await Promise.all([this.$store.dispatch("getData", "banners"), this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/api/v3/northpark/messages.json"})]);
                        return results;
                    } catch(e) {
                        console.log("Error loading data: " + e.message);    
                    }
                }
            }
        });
    });
</script>