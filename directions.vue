<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <iframe class="hidden-xs" src="https://maps.google.nl/maps?q={{property.name}} {{property.address1}} {{property.city}} {{property.country}} {{property.province_state}} {{property.postal_code}}&amp;hl=en&amp;ie=UTF8&amp;t=v&amp;hnear={{property.name}} {{property.address1}} {{property.city}} {{property.country}} {{property.province_state}} {{property.postal_code}}&amp;z=13&amp;output=embed" width="100%" height="405" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </transition>
    </div>
</template>

<script>
	define(["Vue", "vuex", "vue-meta"], function(Vue, Vuex, Meta) {
        Vue.use(Meta);
		return Vue.component("directions-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
                console.log(this.property)
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "events")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
	});
</script>