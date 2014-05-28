var UploadView = Ember.View.extend({
  init: function() {
    this._super();

    this.set('progress', 0);
  },

  widthString: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress'),

  drop: function(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    var formData = new window.FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('resume[cv]', files[i]);
    }

    var self = this,
        job_id = this.get("job.id");

    formData.append('resume[job_id]', job_id);

    $.ajax({
      type: "POST",
      url: '/api/resumes',
      data: formData,
      //success: success,
      //dataType: dataType
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      xhr: function() {
        var xhr = $.ajaxSettings.xhr() ;

        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            self.set('progress', complete);
          }
        };

        return xhr;
      }
    }).complete(function(xhr) {
      var response = JSON.parse(xhr.responseText);

      if(response.resume) {
        var store = self.get('controller.store');
        store.find('resume', response.resume.id).then(function(record) {
          store.find('job', job_id).then(function(job) { job.reload(); }); // reload Job
          self.get("controller").transitionToRoute('resume.edit', record);
        });
      } else {
        self.set("error", response.errors);
      }

      self.set('progress', 0);
      self.removeActive();
    });
  },

  dragOver: function(e) {
    e.preventDefault();
    this.$('.drop-here').addClass('grab-active');
  },

  dragLeave: function(e) {
    e.preventDefault();
    this.removeActive();
  },

  removeActive: function() {
    this.$('.drop-here').removeClass('grab-active');
  }
});

export default UploadView;
