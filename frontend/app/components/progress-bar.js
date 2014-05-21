export default Ember.Component.extend({
  widthString: function() {
    return 'width: %@%'.fmt(this.get('progress') || 0);
  }.property('progress'),

  className: function() {
    if(this.get("changeColor")) {
      var progress = this.get('progress' || 0);

      if(progress <= 30) return "alert";
      if(progress >= 70) return "success";
    } else {
      return "success";
    }
  }.property("progress", "changeColor")
});
