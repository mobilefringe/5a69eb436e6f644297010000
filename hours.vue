<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" class="main_container margin_30" v-cloak> 
                <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-12">
                        <h3 class="hours_heading text-left" >Regular Shopping Hours</h3>
                        <div id="hours_container" class="hours_container">
                            <div class="hours_div text-left" v-for="hour in hours">
                                <span>{{hour.day_of_week | moment("dddd", timezone)}}:</span>
                                <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ">
                        <div class="padding_top_20"></div>
                        
                        <h3 class="hours_heading text-left">Extended Holiday Hours</h3>
                        <div id="holidays_hours_container" class="hours_container">
                            <div class="hours_div text-left"  v-for="hour in reducedHolidays">
                                <span>{{hour.holiday_name}} <br/>({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                                <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                            </div>
                        </div>
                        
                        <div class="padding_top_20"></div>
                        
                        <h3 class="hours_heading text-left">Holiday Closures</h3>
                        <div id="closed_hours_container" class="hours_container">
                            <div class="hours_div text-left" v-for="hour in closeHolidays">
                                <span>{{hour.holiday_name}} ({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                            </div>
                        </div>
                        
                    </div>
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