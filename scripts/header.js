var banner = {
    view: "toolbar",
    elements: [
        {view: "label", label: "My App"},
        {},
        {view: "button", type: "icon", icon: "user", label: "Profile", width: 120, popup:"mypop"}
    ]
};

var pop = webix.ui ({
    view: "popup",
    id: "mypop",
    body: {
        view: "list",
        data: [
            {id:"1", name:"Settings"},
            {id:"2", name:"Log out"}
        ],
        template:"#name#",
        autoheight:true,
        select:true
    }
});