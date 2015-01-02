Submissions = new Mongo.Collection("submissions", {
  transform: function(doc) {
    doc.getCall = function() {
      return Calls.findOne({_id: doc.callId});
    };

    return doc;
  }
});

Submissions.attachSchema(new SimpleSchema({
  callId: {
    type: String
  },
  name: {
    type: String,
    label: "Name",
  },
  email: {
    type: String,
    label: "Email address",
    regEx: SimpleSchema.RegEx.Email
  },
  body: {
    type: String,
    label: "Your submission",
    autoform: {
      rows: 8
    }
  }
}));
