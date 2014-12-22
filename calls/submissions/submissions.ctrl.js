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
