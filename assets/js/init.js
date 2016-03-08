//#init+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
define('init', function (init) {
    console.info('init-LOADED===============================================');
    window.RES = {
        Modules:{}, //moduleCollections.js
        Models: {}, //Mmodule.js/Model
        Views: {},  //Mmodule.js/View
        Utils: {},  //helpers.js/*
        Env: {      //.
            baseUrl: '/static/templates/',
            categoriesIcons:{
                "1":"res-advertising",
                "2":"res-building",
                "3":"res-car",
                "4":"res-children",
                "5":"res-cleaning",
                "6":"res-clothes",
                "7":"res-consalting",
                "8":"res-education",
                "9":"res-food",
                "10":"res-furniture",
                "11":"res-health",
                "12":"res-hotel",
                "13":"res-it",
                "14":"res-keys",
                "15":"res-logistics",
                "16":"res-other",
                "17":"res-party",
                "18":"res-photo",
                "19":"res-production",
                "20":"res-rent",
                "21":"res-safety",
                "22":"res-service",
                "23":"res-shop",
                "24":"res-sport",
                "25":"res-trade",
                "26":"res-washing_mashine"
            },
            achievementIcons:{
                "first":"res-advertising",
                "second":"res-building",
                "third":"res-car",
                "forth":"res-children",
                "five":"res-cleaning"
            },
            statusWorkTimer:'yes',
            token:'',
            user :{
                phone:'',
                first_name:'',
                email:''
            }
        },
        Collections: {}, //
        Router:{},        //app.js/
        Auth: {}
    };
    console.info('init-LOADED===============================================');
    return RES;
});

//#init-----------------------------------------------------------