Router.route('/calls/:_id/:slug/submissions', function() {
  var call = Calls.findOne({_id: this.params._id});
  var submissions = Submissions.find({callId: call._id});

  this.render('CallSubmissionsList', {data: {
    call: call,
    submissions: submissions
  }});
});

if (Meteor.isClient) {
  AutoForm.addHooks(['SubmissionInsertForm'], {
    onSuccess: function(_a, submissionId, template) {
      var callsSubmittedTo = Session.get('CallsSubmittedTo') || [];
      callsSubmittedTo.push(Submissions.findOne(submissionId).getCall()._id);
      Session.set('CallsSubmittedTo', callsSubmittedTo);
      Meteor.call('sendSubmissionNotificationEmail', submissionId);
    }
  });

  Template.CallSubmissionInsertForm.helpers({
    viewerHasSubmittedBefore: function() {
      if(this.call) {
        return _(Session.get('CallsSubmittedTo')).contains(this.call._id);
      }
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    sendSubmissionNotificationEmail: function(submissionId) {
      var submission = Submissions.findOne({_id: submissionId});
      var call = submission.getCall();
      var owner = call.getOwner();
      var email = owner.emails[0].address;
      console.log("Sending email to " + email);
      if(owner) {
        this.unblock();

        Email.send({
          to: email,
          subject: 'Submission from ' + submission.name,
          html: "<p>" + [
            'You got a submission on your call "' + call.title + '".',
            '<a href="' + Meteor.absoluteUrl('calls/' + call._id + '/' + call.slug() + '/submissions') + '">You can view it here.</a>'
          ].join("</p><p>") + "</p>"
        });
      }
    }
  });
}
