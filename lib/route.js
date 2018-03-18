FlowRouter.route('/', {
    name: 'View Livescore',
    action: function () {
        BlazeLayout.render("mainLayout", { main: "view" });
    }
})
