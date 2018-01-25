<template>
  <div class="row">
    <div class="large-6 columns">
      <div>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <hr/>
        <h5>Translated text example:</h5>
        <p>{{ $t("message.hello") }}</p>
        <p>{{property.name}}</p>
        <hr/>
        
        
        
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue", "vuex", "vue!today_hours.vue", "vue!search-component.vue"], function(Vue, Vuex, TodayHoursComponent, SearchComponent) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          suggestionAttribute: 'name',
          search: ''
        }
      },
      computed: {
        ...Vuex.mapGetters([
          'property',
          'processedStores'
        ])
      },
      methods: {
        onOptionSelect(option) {
          console.log('Selected option:', option)
        }
      }
    })
  })
</script>
