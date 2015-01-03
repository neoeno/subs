Router.route('/', {
  action: function() {
    if(Meteor.userId()) {
      Router.go('/calls');
    }else{
      this.render('Root');
    }
  }
});
