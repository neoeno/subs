SubmissionsCtrl = {
  index: function() {
    var call = Calls.findOne({_id: this.params._id});
    var submissions = Submissions.find({callId: call._id}, {sort: {date_created: -1}});

    this.render('CallSubmissionsList', {data: {
      call: call,
      submissions: submissions
    }});
  }
};
