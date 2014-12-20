Submissions = new Mongo.Collection("submissions");
Submissions.attachSchema(new SimpleSchema({
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
  },
  callId: {
    type: String,
  }
}));
