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
                    <div class="col-md-6">
                        <form class="form-horizontal" action="//mobilefringe.createsend.com/t/d/s/irudui/" method="post" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12" >
                                <label class="label" for="cm-name">Name</label>
                                <input v-model="form_data.name" required class="form-control" name="cm-name" type="text" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12">
                                <label class="label" for="cm-irudui-irudui">Email</label>
                                <input v-model="form_data.email" required class="form-control" name="cm-irudui-irudui" type="email" placeholder="Email" id="newsletter_email">
                            </div>
                        </div>
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12">
    					        <label class="checkbox">
                                    <input name="agree_newsletter" required  type="checkbox">
                                        Yes, I would like to receive ongoing news related to events, promotions and special announcements from Eastgate Square. 
                                </label>
    					    </div>
                            <div class="col-xs-12">
                                <button class="feature-readmore" type="submit" :disabled="formSuccess">Subscribe</button>
                            </div>
                        </div>
                    </form>    
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue-meta", "jquery", "vee-validate"], function (Vue, Vuex, Meta, $, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function data() {
                return {
                    dataLoaded: false,
                    form_data: {},
                    loginPending: null,
                    formSuccess: false,
                    formError: false,
                    time: new Date()
                }
            },
            mounted () {
                this.form_data.email = this.$route.query.email;
                console.log(this.form_data.email)
                $("#newsletter_email").val(this.form_data.email);
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    console.log(this.form_data.email)
                    $("#newsletter_email").val(this.form_data.email);
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/milton-contact-us.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            send_data = {};
                            send_data.form_data = JSON.stringify(this.serializeObject(this.form_data));
                            this.$store.dispatch("CONTACT_US", send_data).then(res => {
                                this.formSuccess = true;
                            }).catch(error => {
                                try {
                                    if (error.response.status == 401) {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    } else {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    }
                                } catch (e) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            })
                        }
                    })
                },
                serializeObject(obj) {
                    var newObj = [];
                    _.forEach(obj, function (value, key) {
                        var tempVal = {};
                        tempVal.name = key;
                        tempVal.value = value;
                        newObj.push(tempVal);
                    });
                    return newObj;
                }
            }
        });
    });
</script>