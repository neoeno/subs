function applyBackground(document, call) {
  document.body.style.backgroundImage = "url('" + call.backgroundUrl + "')";
  document.body.classList.add("background-type--" + call.backgroundType);
}

Router.route('/calls', function () {
  // render the Home template with a custom data context
  this.render('CallIndex', {data: {calls: Calls.find({})}});
});

Router.route('/calls/new', function() {
  this.render('CallNew');
});

Router.route('/calls/:_id/edit', function() {
  var call = Calls.findOne({_id: this.params._id});
  this.render('CallEdit', {data: {call: call}});
});

Router.route('/calls/:_id', function() {
  var call = Calls.findOne({_id: this.params._id});
  applyBackground(document, call);
  this.render('CallShow', {data: {call: call}});
});

Router.route('/calls/:_id/submissions', function() {
  var call = Calls.findOne({_id: this.params._id});
  var submissions = Submissions.find({callId: call._id});
  this.render('CallSubmissionsList', {data: {
    call: call,
    submissions: submissions
  }});
});


// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault("counter", 0);
//
//   Template.callForSubmissions.helpers({
//     counter: function () {
//       return Session.get("counter");
//     },
//     title: "Rat week",
//     body: ""
//   });
//
//   Template.callForSubmissions.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set("counter", Session.get("counter") + 1);
//     }
//   });
// }
//
// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
