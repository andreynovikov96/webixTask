var users = new webix.DataCollection ({
    url: "../data/users.js",
    scheme: {
        $init: function (obj) {
            if(obj.age < 26) 
                obj.$css = "listYellow";
        }
    }
});

