Router.route('/calls', {
  waitOn: Subscriptions.all,
  action: CallsCtrl.index
});

Router.route('/calls/new', {
  waitOn: Subscriptions.all,
  action: CallsCtrl.new
});

Router.route('/calls/:_id/:slug/edit', {
  waitOn: Subscriptions.all,
  action: CallsCtrl.edit
});

Router.route('/calls/:_id/:slug', {
  waitOn: function() { return Meteor.subscribe('call', this.params._id); },
  action: CallsCtrl.show,
  fastRender: true
});
