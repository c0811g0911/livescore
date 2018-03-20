FlowRouter.route('/', {
    name: 'View Livescore',
    action: function () {
        BlazeLayout.render("mainLayout", { main: "view" });
    }
});


FlowRouter.route('/edit', {
    name: 'Edit Livescore',
    action: function () {
        BlazeLayout.render("mainLayout", { main: "edit" });
    }
});

