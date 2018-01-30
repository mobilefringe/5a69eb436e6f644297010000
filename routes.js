define([], function () {
    return [
        {
            path: '/',
            component: view('home')
        },
        {
            path: '/events',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('events'),
                    meta: {
                        pageName: 'Events',
                    },
                    name: 'events'
                },
                {
                    path: ':id',
                    component: view('event_details'),
                    meta: {
                        pageName: 'Events',
                    },
                    name: 'eventDetails',
                    props: true
                }
            ]
        },
        {
            path: '/hours',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('hours'),
                    meta: {
                        pageName: 'Hours',
                    },
                    name: 'hours'
                }
            ]
        },
        {
            path: '/promotions',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('promotions'),
                    meta: {
                        pageName: 'Promotions',
                    },
                    name: 'promotions'
                },
                {
                    path: ':id',
                    component: view('promotion_details'),
                    meta: {
                        pageName: 'Promotions',
                    },
                    name: 'promotionDetails',
                    props: true
                }
            ]
        },
        {
            path: '/stores',
            component: view('default'),
            children: [
                {   
                    path: '',
                    component: view('stores'),
                    meta: {
                        pageName: 'Stores',
                    },
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    meta: {
                        pageName: 'Stores',
                    },
                    name: 'storeDetails',
                    props: true
                }
            ]
        },
        {
            path: '/map',
            component: view('default'),
            children: [
                {   
                    path: '',
                    component: view('map'),
                    meta: {
                        pageName: 'Centre Map',
                    },
                    name: 'map'
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: view('notfoundcomponent')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]

    /*
    * Asynchronously load view (lazy-loading)
    * @param {string} name the filename (basename) of the view to load.
    */
    function view(name) {
        return function(resolve) { require(['vue!' + name + '.vue'], resolve); }
    };
});
