CallsCtrl = {
  index: function () {
    var calls = Calls.find({}, {sort: {date_created: -1}});
    this.render('CallIndex', {data: {calls: calls}});
  },
  new: function() {
    this.render('CallNew');
  },
  edit: function() {
    var call = Calls.findOne({_id: this.params._id});
    this.render('CallEdit', {data: {call: call}});
  },
  show: function() {
    if(this.ready()) {
      var call = Calls.findOne({_id: this.params._id});
      window.applyBackgroundFromCall(call);
      window.applyMetaForCall(call);
      this.render('CallShow', {data: {call: call}});
    } else {
      this.render('Loading');
    }
  }
};
