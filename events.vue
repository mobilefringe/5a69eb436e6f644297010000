<template>
    <div> <!-- without an outer container div this component template will not render -->
        <np-loader v-if="!dataLoaded"></np-loader>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                
                
            </div>
        </transition>
    </div>
</template>
<script>
  define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "v-calendar",
    "vue!vue-slick", "vue!page_breadcrumb.vue"
  ], function (Vue, Vuex, moment, tz, VueMoment, Meta, vSelect, VCalendar, slick, PageBreadcrumbComponent) {
    Vue.use(Meta);
    Vue.use(VCalendar.default);
    return Vue.component("events-component", {
      template: template, // the variable template will be injected
      data: function () {
        return {
          dataLoaded: false,
          slickOptions: {
            arrows: true,
            autoplay: true,
            cssEase: 'linear',
            dots: false,
            fade: true,
            infinite: true,
            nextArrow: '.next',
            prevArrow: '.prev',
            slidesToShow: 1,
            speed: 1000
          },
          selected: "All Events",
          currentSelection: null,
          filteredEvents: [],
          currentDate: null,
          selectedDate: new Date(),
          isExpanded: true,
          navVisibility: 'hidden',
          themeStyles: {
            wrapper: {
              border: '0', // Override the default border
            },
            header: {
              color: '#000',
              backgroundColor: '#FFF',
              borderColor: '#404c59',
              borderWidth: '1px 1px 0 1px',
              paddingTop: '0',
              paddingBottom: '0'
            },
            headerVerticalDivider: {
              borderLeft: '1px solid #404c59',
            },
            weekdays: {
              color: '#000',
              backgroundColor: '#FFF',
              borderColor: '#384763',
              borderWidth: '0 1px',
              paddingTop: '5px',
              paddingBottom: '0',
            },
            weekdaysVerticalDivider: {
              borderLeft: '1px solid #404c59',
            },
            weeks: {
              border: 'none',
            },
          },
          categoryOptions: [{
              'label': 'All Events',
              'value': 'all_events'
            },
            {
              'label': 'NorthPark Events',
              'value': 'prop_events'
            },
            {
              'label': 'In-Store Events',
              'value': 'store_events'
            },
            {
              'label': 'Holiday Events',
              'value': 'holiday_events'
            },
          ],
        }
      },
      created() {
        this.loadData().then(response => {
          this.dataLoaded = true;
          this.currentSelection = this.events;
        });
      },
      watch: {
        selected: function () {
          this.sortByDate();
        },
        currentDate: function () {
          this.sortByDate();
        },
      },
      computed: {
        ...Vuex.mapGetters([
          'property',
          'timezone',
          'repos',
          'findRepoByName',
          'processedEvents',
        ]),
        eventsBanners() {
          return this.findRepoByName("Events").images
        },
        events: function events() {
          var events = this.processedEvents;
          var showEvents = [];
          _.forEach(events, function (value, key) {
            var today = moment.tz(this.timezone).format();
            var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
            if (today >= showOnWebDate) {
              showEvents.push(value);
            }
          });
          var sortedEvents = _.orderBy(showEvents, function (o) {
            return o.end_date
          })

          return sortedEvents
        },
        propertyEvents: function propertyEvents() {
          var propertyEvents = _.filter(this.processedEvents, function (o) {
            return o.eventable_type == "Property"
          })
          var showEvents = [];
          _.forEach(propertyEvents, function (value, key) {
            var today = moment.tz(this.timezone).format();
            var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
            if (today >= showOnWebDate) {
              showEvents.push(value);
            }
          });
          var propertyEvents = _.orderBy(showEvents, function (o) {
            return o.end_date
          });
          return propertyEvents
        },
        storeEvents: function storeEvents() {
          var storeEvents = _.filter(this.processedEvents, function (o) {
            return o.eventable_type == "Store"
          })
          var showEvents = [];
          _.forEach(storeEvents, function (value, key) {
            var today = moment.tz(this.timezone).format();
            var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
            if (today >= showOnWebDate) {
              showEvents.push(value);
            }
          });
          var storeEvents = _.orderBy(showEvents, function (o) {
            return o.end_date
          });
          return storeEvents
        },
        holidayEvents: function holidayEvents() {
          var holiday_events = [];
          _.forEach(this.processedEvents, function (value, key) {
            var tag_string = _.toLower(_.join(value.tag, ''));
            var holiday_string = _.includes(tag_string, "holiday");
            if (holiday_string === true) {
              holiday_events.push(value);
            }
          });
          var showEvents = [];
          _.forEach(holiday_events, function (value, key) {
            var today = moment.tz(this.timezone).format();
            var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
            if (today >= showOnWebDate) {
              showEvents.push(value);
            }
          });
          var holidayEvents = _.orderBy(showEvents, function (o) {
            return o.end_date
          });
          if (holidayEvents.length > 0) {
            return holidayEvents
          } else {
            return false
          }
        }
      },
      methods: {
        loadData: async function () {
          try {
            let results = await Promise.all([this.$store.dispatch("getData", "events"), this.$store.dispatch(
              "getData", "repos")]);
            return results;
          } catch (e) {
            console.log("Error loading data: " + e.message);
          }
        },
        dateChange() {
          this.currentDate = this.selectedDate;
        },
        isMultiDayEvent(event) {
          var timezone = this.timezone
          var start_date = moment(event.start_date).tz(timezone).format("MM-DD-YYYY")
          var end_date = moment(event.end_date).tz(timezone).format("MM-DD-YYYY")
          if (start_date === end_date) {
            return false
          } else {
            return true
          }
        },
        sortByDate() {
          var timezone = this.timezone
          var selectedDate = moment(this.selectedDate).format("MM-DD-YYYY");
          var eventsList = [];
          if (this.selected.value == "all_events" || this.selected.value == undefined) {
            eventsList = this.events
          } else if (this.selected.value == "prop_events") {
            eventsList = this.propertyEvents;
          } else if (this.selected.value == "store_events") {
            eventsList = this.storeEvents;
          } else if (this.selected.value == "holiday_events") {
            eventsList = this.holidayEvents;
          } else {
            eventsList = this.events
          }

          var filteredEvents = [];
          _.forEach(eventsList, function (value, key) {
            var startDate = moment(value.start_date).tz(timezone).format("MM-DD-YYYY")
            var endDate = moment(value.end_date).tz(timezone).format("MM-DD-YYYY")
            if (selectedDate <= endDate && selectedDate >= startDate || selectedDate <= endDate) {
              filteredEvents.push(value);
            }
          });
          this.currentSelection = filteredEvents
        }
      }
    });
  });
</script>
