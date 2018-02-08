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