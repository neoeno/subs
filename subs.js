// Clear body tag of our classes and styles on each 'load'
Router.onBeforeAction(function() {
  $('body').attr({class: '', style: ''});
  this.next();
});
