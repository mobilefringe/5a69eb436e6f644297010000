<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <inside-header-component></inside-header-component>
        </transition>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak class="main_container margin_30">
                <div class="row">
                    <div class="col-md-6">
                        <h3 class="contact_page_title">Centre Information</h3>
                        <p class="directory_content">
                            {{ property.name }}<br/>
                            {{ property.address1 }}<br/>
                            {{ property.city }}, {{ property.province_state }} {{ property.postal_code }}
                        </p>
                    </div>
                    <div class="hidden-lg hidden-md visible-sm-block visible-xs-block">
                        <div class="col-md-12">
                            <hr>    
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form class="form-horizontal" action="//mobilefringe.createsend.com/t/d/s/irudui/" method="post" @submit.prevent="validateBeforeSubmit">

                            <div class="col-xs-12" >
                                <label for="cm-name">Name</label>
                                <input v-model="form_data.name" required class="form-control" name="cm-name" type="text" placeholder="Name">
                            </div>
                            <div class="col-xs-12">
                                <label for="cm-irudui-irudui">Email</label>
                                <input v-model="form_data.email" required class="form-control" name="cm-irudui-irudui" type="email" placeholder="Email" id="newsletter_email">
                            </div>
                            <div class="col-xs-12">
                                <div style="margin-left: 20px">
                                    <label class="checkbox">
                                        <input name="agree_newsletter" required  type="checkbox">
                                            Yes, I would like to receive ongoing news related to events, promotions and special announcements from Eastgate Square. 
                                    </label>
                                </div>
    					    </div>
    					    <div class="margin_20 clearfix"></div>
                            <div class="col-xs-12">
                                <button class="animated_btn" type="submit" :disabled="formSuccess">Subscribe</button>
                            </div>
                        </form>    
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "jquery", "moment", "moment-timezone", "vue-moment", "vee-validate"], function(Vue, Vuex, Meta, $, moment, tz, VueMoment, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    currentPage: null,
                    form_data : {},
                    formSuccess : false,
                    formError: false
                }
            },
            mounted () {
                this.form_data.email = this.$route.query.email;
                $("#newsletter_email").val(this.form_data.email);
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#newsletter_email").val(this.form_data.email);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                ])
            },
            methods: {
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            
                            if(errors.length > 0) {
                                console.log("Error");
                            } else {
                                console.log("No Error");
                                // return true;
                                form.target.submit();
                            }
                        }
                    })
                }
            }
        });
    });
</script>