<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" class="page-container" v-cloak> 
                <div class="margin-90"></div>
                <div class="row">
                    <div class="col-md-8">
                        <h2>Shopping Centre Hours</h2>
                        <p>Department store, restaurant, theatre, spa, and holiday hours may vary.</p>
                        <ul class="hours-list" v-if="getPropertyHours">
                            <li v-for="hour in getPropertyHours">
                                {{hour.day_of_week | moment("dddd", timezone)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                            </li>
                        </ul>
                        <hr>
                        
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function (Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            data: function data() {
                return {
                    dataLoaded: false,
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours'
                ]),
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "categories")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>