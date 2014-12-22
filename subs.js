function applyBackground(document, call) {
  var backgroundImage = Attachments.findOne({_id: call.backgroundImage});
  if(backgroundImage) {
    document.body.style.backgroundImage = "url('" + backgroundImage.url() + "')";
    document.body.style.backgroundPosition = call.backgroundPosition;
    document.body.style.backgroundSize = call.backgroundSize;
  }
  document.body.classList.add("background-type--" + call.backgroundType);
}

Router.onBeforeAction(function() {
  $('body').attr({class: '', style: ''});
  this.next();
});

Router.route('/calls', function () {
  // render the Home template with a custom data context
  this.render('CallIndex', {data: {calls: Calls.find({})}});
});

Router.route('/calls/new', function() {
  this.render('CallNew');
});

Router.route('/calls/:_id/:slug/edit', function() {
  var call = Calls.findOne({_id: this.params._id});
  this.render('CallEdit', {data: {call: call}});
});

Router.route('/calls/:_id/:slug', function() {
  var call = Calls.findOne({_id: this.params._id});
  applyBackground(document, call);
  this.render('CallShow', {data: {call: call}});
});

Router.route('/calls/:_id/:slug/submissions', function() {
  var call = Calls.findOne({_id: this.params._id});
  var submissions = Submissions.find({callId: call._id});
  this.render('CallSubmissionsList', {data: {
    call: call,
    submissions: submissions
  }});
});

if (Meteor.isClient) {
  AutoForm.addHooks(['CallUpdateForm', 'CallInsertForm'], {
    onSuccess: function(_a, _b, template) {
      Router.go('/calls/' + template.data.doc._id + '/' + template.data.doc.slug());
    }
  });

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
