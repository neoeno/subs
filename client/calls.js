// Clear body tag of our classes and styles on each 'load'
Router.onBeforeAction(function() {
  $('body').attr({class: '', style: ''});
  this.next();
});

AutoForm.addHooks(['CallUpdateForm', 'CallInsertForm'], {
  onSuccess: function(_a, id, template) {
    Router.go('/calls');
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
  var backgroundImageUrl = call.backgroundImageUrl();
  if(backgroundImageUrl) {
    document.body.style.backgroundImage = "url('" + backgroundImageUrl + "')";
    document.body.style.backgroundPosition = call.backgroundPosition;
    document.body.style.backgroundSize = call.backgroundSize;
  }
  document.body.classList.add("background-type--" + call.backgroundType);
};

window.applyMetaForCall = function(call) {
  var backgroundImageUrl = call.backgroundImageUrl();
  SEO.set({
    title: call.title,
    meta: {
      'description': call.body.split('\n')[0]
    },
    og: {
      'title': call.title,
      'description': call.body.split('\n')[0],
      'image': backgroundImageUrl ? Meteor.absoluteUrl(backgroundImageUrl) : undefined
    }
  });
};
