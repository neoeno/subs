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
