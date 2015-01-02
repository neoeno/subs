var securityPolicies = {
  everyone: function() { return true; },
  isLoggedIn: function(userId) { return !!userId; }
};

Meteor.startup(function() {
  Calls.allow({
    insert: securityPolicies.isLoggedIn,
    update: securityPolicies.isLoggedIn,
    remove: securityPolicies.isLoggedIn
  });

  Submissions.allow({
    insert: securityPolicies.everyone
  });

  Attachments.allow({
    insert: securityPolicies.isLoggedIn,
    update: securityPolicies.isLoggedIn,
    remove: securityPolicies.isLoggedIn,
    download: securityPolicies.everyone
  });

});

if(Meteor.isServer) {
  Meteor.publish('calls', function() {
    return Calls.find({});
  });

  Meteor.publish('submissions', function() {
    if(this.userId){
      return Submissions.find();
    }
  });

  Meteor.publish('attachments', function() {
    return Attachments.find({});
  });
}

if(Meteor.isClient) {
  Meteor.subscribe('calls');
  Meteor.subscribe('submissions');
  Meteor.subscribe('attachments');
}
