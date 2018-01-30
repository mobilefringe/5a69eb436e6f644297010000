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
                    name: 'events'
                },
                {
                    path: ':id',
                    component: view('event_details'),
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
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails',
                    props: true
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
