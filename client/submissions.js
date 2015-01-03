Session.set('Submitted', false);

AutoForm.addHooks(['SubmissionInsertForm'], {
  onSuccess: function(_a, submissionId, template) {
    Session.set('Submitted', true);
    Meteor.call('sendSubmissionNotificationEmail', submissionId);
  }
});

Template.CallSubmissionInsertForm.helpers({
  viewerHasSubmitted: function() {
    return Session.get('Submitted');
  }
});
