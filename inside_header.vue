<template>
    <div>
        <div>
            Hours    
        </div>    
    </div>
</template>

<script>
    define(["Vue", "vuex"], function (Vue, Vuex) {
        return Vue.component("header-component", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    active: false,    
                }
            },
            props:['social_media'],
            watch: {
                show_menu: function() {
                    if(this.show_menu == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_menu == false) {
                        document.body.classList.remove("no-scroll");
                    }
                },
                show_search: function(){
                    if(this.show_search == true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_search == false) {
                        document.body.classList.remove("no-scroll");
                    } 
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