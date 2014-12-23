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
    onSuccess: function(_a, _b, template) {
      Session.set('SubmissionSubmitted', true);
    }
  });

  Template.CallShow.helpers({
    submitted: function() {
      return Session.get('SubmissionSubmitted');
    }
  });
}
