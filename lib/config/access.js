var securityPolicies = {
  everyone: function() { return true; },
  isLoggedIn: function(userId) { return !!userId; },
  isOwner: function(userId, obj) { return userId === obj.ownerId; }
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
  Meteor.publish('call', function(id) {
    return Calls.find({_id: id});
  });

  Meteor.publish('calls', function() {
    return Calls.find({ownerId: this.userId});
  });

  Meteor.publish('submissions', function() {
    if(this.userId) {
      var calls = Calls.find({ownerId: this.userId});
      var callIds = calls.map(function(call) { return {callId: call._id}; });
      if(callIds.length > 0) {
        return Submissions.find({$or: callIds});
      } else {
        return [];
      }
    }
  });

  Meteor.publish('attachment', function(id) {
    return Attachments.find({_id: id});
  });

  Meteor.publish('attachments', function() {
    return Attachments.find();
  });
}

Subscriptions = {
  calls:       function() { return Meteor.subscribe('calls'); },
  submissions: function() { return Meteor.subscribe('submissions'); },
  attachments: function() { return Meteor.subscribe('attachments'); },
  all:         function() { return [Subscriptions.calls(),
                                    Subscriptions.submissions(),
                                    Subscriptions.attachments()]; }
};
