Meteor.startup(function() {
  if(Meteor.isClient){
    return SEO.config({
      title: 'Subs'
    });
  }
});
