var securityPolicies = {
  everyone: function() { return true; },
  isLoggedIn: function(userId) { return !!userId; },
  isOwner: function(userId, obj) { return userId === obj.ownerId }
};

Meteor.startup(function() {
  Calls.allow({
    insert: securityPolicies.isOwner,
    update: securityPolicies.isOwner,
    remove: securityPolicies.isOwner
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
    return Calls.find({ownerId: this.userId});
  });

  Meteor.publish('submissions', function() {
    if(this.userId) {
      var calls = Calls.find({ownerId: this.userId});
      var callIds = calls.map(function(call) { return {callId: call._id}; });
      if(callIds.length > 0) {
        return Submissions.find({$or: callIds});
      }
    }
  })

  Meteor.publish('attachments', function() {
    return Attachments.find();
  });
}

if(Meteor.isClient) {
  Meteor.subscribe('calls');
  Meteor.subscribe('submissions')
  Meteor.subscribe('attachments');
}
