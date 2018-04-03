var list = {
    css: "listColor",
    type:"clean",
    gravity:0.2,
    rows: [
        { 
            view:"list",
            id:"mylist",
            borderless:true,
            select:true,
            scroll:false,
            data:["Dashboad", "Users", "Products", "Admin"],
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
    gravity:2,
    rows: [
        {
            view:"tabbar",
            id:"tabbarFilter", 
            options: [
                {"id":"allView", "value":"All"},
                {"id":"oldView", "value":"Old"},
                {"id":"modernView", "value":"Modern"},
                {"id":"newView", "value":"New"}
            ],
            on: {
                onChange: function () {
                    $$("mytable").filterByAll();
                }
            }
        },
        {      
            view: "datatable", 
            id: "mytable",
            hover:"myhover",
            select:true,
            scrollX: false,
            data: films,
            
            columns:[
                {id:"rank", header:"Num", css:"webix_ss_header", width:50, sort:"int"},
                {id:"title", header:["Title", {content:"textFilter"}], fillspace:true, sort:"string"},
                {id:"year", header:"Year", sort:"int"},
                {id:"votes", header:["Votes", {content:"numberFilter"}], sort:"int"},
                {id:"rating", header:["Rating", {content:"numberFilter"}], sort:"int"},
                {id:"category", header:["Category", {content:"selectFilter"}], collection: categories},
                {template:"{common.trashIcon()}", width:30}
            ],
            onClick:{
                "fa-trash":function(ev, id){
                    $$("mytable").remove(id);
                }
            }
        }  
    ]
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
        {view:"combo", label:"Category", name:"category", options:{data:categories}},
        {cols: [ 
            {view: "button", value: "Save", type:"form", click: function () {
                var form = $$('myform');
				if(form.isDirty()){
					if(!form.validate())
					return false;
                    form.save();
                    $$("myform").clear();
                    $$("myform").clearValidation();
                    }
                }
            },
            {view:"button", value:"Unselect", click:function() {
                $$("mytable").unselectAll();
                }
            },
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
                return value > 0 && value < 10;
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
            {view:"button", value: "Add user", click: function () {
                var arr = [
                    {"name":"Alan Smith", "age":57, "country":"USA"},
                    {"name":"Nina Brown", "age":32, "country":"Germany"},
                    {"name":"Kevin Sallivan", "age":21, "country":"Canada"},
                    {"name":"Sergey Petrov", "age":24, "country":"Russia"},
                    {"name":"Mina Leen", "age":40, "country":"China"},
                    {"name":"Sam White", "age":26, "country":"USA"},
                    {"name":"Peter Olsten", "age":40, "country":"France"},
                    {"name":"Lina Rein", "age":30, "country":"Germany"},
                    {"name":"Many Cute", "age":22, "country":"Canada"},
                    {"name":"Andrew Wein", "age":27, "country":"Italy"},
                    {"name":"Paolo Sanders", "age":40, "country":"Spain"},
                    {"name":"Tanya Krieg", "age":28, "country":"Germany"}
                ];
                $$("mylistSorting").add(arr[Math.ceil(Math.random()*(arr.length))]);
            }
        },
        ]
    },
        {
            view:"editlist",
            id:"mylistSorting",
            editable:true,
            editor:"text",
            editValue:"name",
            select:true,
            rules: {
                "name": webix.rules.isNotEmpty
            },
            template: "#id#.  <b>#name#</b> #age# #country# <span class='webix_icon fa-times delete'></span>",
            data: users,
            onClick: {
                "fa-times":function(ev, id) {
                    this.remove(id);
                }
            }
    },
        {
            view:"chart",
            id:"mychart",
            type:"bar",
            value:"#age#",
            xAxis:{
                template: "#country#",
            },
            yAxis: {},
            barWidth:35,
            radius:10
        }
    ]    
};

var treetable = {
    view:"treetable",
    id:"Products",
    editable:true,
    select:true,
    ready() {
        this.openAll();
    },
    columns:[
        {id:"id", header:"", width:50},
        {id:"title", header:"Title", template:"{common.treetable()} #title#",editor:"text", width:250},
        {id:"price", header:"Price",editor:"text", width:250}
    ],
    rules: {
        "title": webix.rules.isNotEmpty,
        "price": webix.rules.isNumber
    }, 
    url: "data/products.js"
}; 

var adminConfig = {
    id:"Admin",
    rows: [
        {
            view:"toolbar", 
            elements:[
                {view:"button", value:"Add Row", click:function(){
                    categories.add({
                        value:"New value"
                    });
                }
            },
            {view:"button", value:"Delete Row", click:function(){
                var id = $$("adminTabl").getSelectedId();
                if (id)
                    categories.remove(id);
                }
            }
          ]},
        {
            view: "datatable",
            id: "adminTabl",
            select:true,
            editable:true,
            editor:"text",
            editValue:"value",
            editaction:"dblclick",
            columns: [
                {id:"value", header:["Category", {content:"selectFilter"}]}
            ],
            save: "https://docs.webix.com/samples/40_serverside/03_php_custom/server/datatable_rest.php"
        }
    ]
}


var main = {
    cells: [
        {id:"Dashboad", cols:[table,form]},
        listDiagramma,
        treetable,
        adminConfig
    ]
};