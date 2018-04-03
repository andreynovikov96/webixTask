var films = new webix.DataCollection({
    url: "data/data.js",
    save: "https://docs.webix.com/samples/40_serverside/01_php_vanila/server/datatable_save.php",
    scheme: {
        $init: function(item) {
            item.category = Math.ceil(Math.random()*(1,4));
        }
    }  
});