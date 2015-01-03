Router.route('/calls/:_id/:slug/submissions', {
  waitOn: Subscriptions.all,
  action: SubmissionsCtrl.index
});
