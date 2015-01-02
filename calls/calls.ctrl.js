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
  window.applyBackgroundFromCall(call);
  this.render('CallShow', {data: {call: call}});
});

if (Meteor.isClient) {
  AutoForm.addHooks(['CallUpdateForm', 'CallInsertForm'], {
    onSuccess: function(_a, id, template) {
      Router.go('/calls/');
    }
  });

  AutoForm.addHooks(['CallInsertForm'], {
    before: {
      insert: function(doc, _template) {
        doc.ownerId = Meteor.userId();
        return doc;
      }
    }
  });

  Template.CallIndex.events({
    "click .js-call-delete": function() {
      if(confirm("Are you sure you want to delete '" + this.title + "'?")) {
        Calls.remove(this._id);
      }
    }
  });

  window.applyBackgroundFromCall = function(call) {
    var backgroundImage = Attachments.findOne({_id: call.backgroundImage});
    if(backgroundImage) {
      document.body.style.backgroundImage = "url('" + backgroundImage.url() + "')";
      document.body.style.backgroundPosition = call.backgroundPosition;
      document.body.style.backgroundSize = call.backgroundSize;
    }
    document.body.classList.add("background-type--" + call.backgroundType);
  };
}
