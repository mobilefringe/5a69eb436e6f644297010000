<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="row">


                    <svg-map v-bind:svg-map-url="getSVGurl" :zoom="true" :pan="true" :zoomLimit="[0,10]" :regions="regions"></svg-map>
                    
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue","vuex", "jquery", "Raphael", "mm_mapsvg","mousewheel", "vue!svg-map"], function(Vue, Vuex, $, Raphael, mapSvg,mousewheel,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: true,
                    listMode: "alphabetical",
                    filteredStores: null,
                    mobileAlphabet : ['All',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ],
                    alphabet : [
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ],
                    breakIntoCol : true
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
                this.$store.dispatch("getData", "categories");
            },
            mounted () {
                this.filteredStores = this.storesByAlphaIndex;
            },
            watch : {
                selected_cat : function () {
                    var cat_id = null;
                    if(this.selected_cat == "All" || this.selected_cat == null ||  this.selected_cat == undefined){
                        this.selected_cat = "All";
                        cat_id = "All";
                        this.breakIntoCol = true;
                    }
                    else {
                        cat_id= this.findCategoryByName(this.selected_cat).id;
                    }
                    this.filteredByCategory(cat_id);
                },
                selected_alpha : function () {
                    this.filterStores(this.selected_alpha);
                }
            },
            methods: {
                // loadData: async function() {
                //     try {
                //         await this.$store.dispatch('initializeApi', {
                //             site: "canyoncrest",
                //             version: "v4"
                //         });
                //         // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                //         let results = await Promise.all([this.$store.dispatch("INITIALIZE_LOCALE"), this.$store.dispatch("getData", "property"), this.$store.dispatch("getData", "hours"), this.$store.dispatch("getData", "stores")]);
                //     } catch (e) {
                //         console.log("Error loading data: " + e.message);
                //     }
                // },
                changeMode (mode) {
                    this.listMode = mode;
                },
                updateSVGMap (map) {
                    this.map = map;
                },
                dropPin(store) {
                    this.svgMapRef.hideMarkers();
                    console.log(store);
                    this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(store)
                },
                filterStores (letter) {
                    
                    this.breakIntoCol = false;
                    if(letter == "All"){
                        this.filteredStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                        this.breakIntoCol = true;
                    }
                    else {
                        var filtered = _.filter(this.storesByAlphaIndex, function(o,i) { return _.lowerCase(i) == _.lowerCase(letter); })[0];
                        this.filteredStores = _.groupBy(filtered, store => (isNaN(store.name.charAt(0)) ? store.name.charAt(0) : "#"));
                        this.breakIntoCol = false;
                    }
                    
                },
                filteredByCategory (category_id) {
                    if(category_id == "All" || category_id == null ||  category_id == undefined){
                        category_id = "All";
                    }
                    else {
                        category_id= this.findCategoryByName(category_id).id;
                    }
                    
                    this.breakIntoCol = false;
                    console.log(category_id);
                    if(category_id == "All"){
                        this.filteredStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                        this.breakIntoCol = true;
                    }
                    else {
                        
                        var find = this.findCategoryById;
                        var filtered = _.filter(this.allStores, function(o) {return _.indexOf(o.categories, _.toNumber(category_id)) > -1; });
                        _.forEach(filtered, function(value, i) {
                            value.currentCategory = find(category_id).name;
                        });
                        // console.log(filtered)
                        sortedCats = _.groupBy(filtered, store => store.currentCategory);
                        // console.log(sortedCats);
                        this.filteredStores = sortedCats;
                    }
                    var position = $(".alpha_list").offset().top;
                    $('html, body').animate({
                		scrollTop: position
                	}, 500, 'linear');
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'repos',
                    'findRepoByName',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryById',
                    'findCategoryByName',
                ]),
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    // return "//www.mallmaverick.com/system/site_images/photos/000/035/014/original/Canyon_Crest_-_Map.svg?1512066588";
                },
                allStores() {
                    return this.processedStores;
                },
                allCategories() {
                    return this.processedCategories;
                },
                allMobileCategories() {
                    var cats =_.map(this.processedCategories, 'name');
                    cats.unshift('All');
                    console.log(cats);
                    return cats;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                regions () {
                    var regions = {}
                    _.forEach( this.processedStores , function( val, key ) {
                        if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                            if(!val.store_front_url_abs ||  val.store_front_url_abs.indexOf('missing.png') > -1 || val.store_front_url_abs.length === 0){
                                val.store_front_url_abs = '//codecloud.cdn.speedyrails.net/sites/55ddf3f86e6f640775000000/a22fcf023d728855c6f575ba100806d7/default.jpg';
                            }
                            obj = {};
                            obj["tooltip"] = "<p class='tooltip_name'>"+val.name+"</p>";
                            obj["attr"] = {};
                            obj["attr"]["href"] = "/stores/"+val.slug;
                            regions[val.svgmap_region] = obj;
                        }
                    });
                    return regions;
                }
            }
        });
    });
</script>