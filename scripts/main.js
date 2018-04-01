var list = {
    css: "listColor",
    type:"clean",
    maxWidth:250,
    rows: [
        { 
            view:"list",
            id:"mylist",
            borderless:true,
            select:true,
            scroll:false,
            data:["Dashboad", "Users", "Products", "Locations"],
            on: {
                onAfterSelect: function (id) {
                    $$(id).show();
                }
            },
        },
        {
            view: "label", 
            css: "labelgreen",
            label:"<span class='webix_icon fa-check'></span>Connected",
            align:"center"
        }
    ]
};

var table = {    
    view: "datatable", 
    id: "mytable",
    hover:"myhover",
    gravity:2,
    columns:[
        {id:"rank", header:"", css:"webix_ss_header", width:50,sort:"int"},
        {id:"title", header:["Title", {content:"textFilter"}], fillspace:true, sort:"string"},
        {id:"year", header:["Year", {content:"numberFilter"}], sort:"int"},
        {id:"votes", header:["Votes", {content:"numberFilter"}], sort:"int"},
        {id:"rating", header:"Rating", sort:"int"},
        {template:"{common.trashIcon()}", width:30}
    ],
    on: {
        "onAfterSelect": function(id){
            var item = this.getSelectedItem();
            $$("myform").setValues(item);
        }
    },
    onClick:{
        "fa-trash":function(){
            var id = $$("mytable").getSelectedId();
             $$("mytable").remove(id);
      }
    },
    select:true,
    autoConfig: true,
    scrollX: false,
    url: "data/data.js"
};

var form = {
    view:"form",
    id: "myform",
    elements:[
        {template:"Edit Films", type:"section"},
        {view:"text", label:"Title", name:"title", invalidMessage: "Empty line"},
        {view:"text", label:"Year", name:"year", invalidMessage: "Enter year between 1970 and 2018"},
        {view:"text", label:"Rating", name:"rating", invalidMessage: "Value can not be empty or 0"},
        {view:"text", label:"Votes", name:"votes", invalidMessage: "The value must be less than 100000"},
        {cols: [ 
            {view: "button", value: "Save", type:"form", click: function () {
                if ($$("myform").validate ()) {
                    var item = $$("myform").getValues();
                    for(var i in item) item[i]=item[i].toString().replace(/<[^>]*>/g, "");
                    if (item.id) {
                        $$("mytable").updateItem(item.id, item); 
                    }
                    else {
                        $$("mytable").add(item);
                    }
                                           
                    $$("myform").clear();
                    $$("myform").clearValidation();
                    //webix.alert("Data checked and added to the table");   
                }
            }},
            {view: "button", value: "Clear", click: function () {
                webix.confirm ({
                    text: "The form will be cleared. Continue?",
                    callback:function (result) {
                        if (result) {
                            $$("myform").clear();
                            $$("myform").clearValidation();
                        }
                    }
                });
            }},
        ]},
            {}
    ],
        rules:{
            title: webix.rules.isNotEmpty,
            year: function (value) {
                return value >= 1970 && value <= 2018;
            },
            rating: function (value) {
                return value > 0;
            },
            votes: function (value) {
                return value > 0 && value < 10000;
            }
        }
};

var listDiagramma = {
    id: "Users",
    rows: [
        { cols: [{
            view:"text", 
            id:"mytextFilter",
            name:"type filter",
            placeholder:"Types of filter...",
            on: {
                "onTimedKeyPress": function(){
                    var value = this.getValue().toLowerCase();
                    $$("mylistSorting").filter(function(obj){
                      return obj.name.toLowerCase().indexOf(value) == 0;
                    })
                  }
            }
        },
            {view:"button", value: "Sort asc", click: function () {
                $$("mylistSorting").sort("#age#", "asc");
            }
        },
            {view:"button", value: "Sort desc", click: function () {
                $$("mylistSorting").sort("#age#", "desc");
            }
        },
        ]
    },
        {
            view:"list",
            id:"mylistSorting",
            select:true,
            template: "#id#.  <b>#name#</b> #age# #country# <span class='webix_icon fa-times delete'></span>",
            url:"data/users.js",
            onClick: {
                "fa-times":function(ev, id) {
                    this.remove(id);
                }
            }
    },
        {
            view:"chart",
            type:"bar",
            value:"#age#",
            xAxis:{
                title:"Age",
                template: "#age#",
                line:true
            },
            barWidth:35,
            radius:10,
            gradient:"falling",
            url:"data/users.js"  
        }
    ]    
};

var treetable = {
    view:"treetable",
    id:"Products",
    select:true,
    ready() {
        this.openAll();
    },
    columns:[
        {id:"id", header:"", width:50},
        {id:"title", header:"Title", template:"{common.treetable()} #title#", width:250},
        {id:"price", header:"Price", width:250}
    ], 
    url: "data/products.js"
}; 

var main = {
    cells: [
        {id:"Dashboad", cols:[table,form]},
        listDiagramma,
        treetable,
        {id:"Locations", template:"Locations View"}
    ]
};