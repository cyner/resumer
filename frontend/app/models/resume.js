var attr = DS.attr;

var Resume = DS.Model.extend(Ember.Validations.Mixin, {
  ratings: [
    { id: 10, label: "10 (Best)" },
    { id:  9, label: "9" },
    { id:  8, label: "8" },
    { id:  7, label: "7" },
    { id:  6, label: "6" },
    { id:  5, label: "5" },
    { id:  4, label: "4" },
    { id:  3, label: "3" },
    { id:  2, label: "2" },
    { id:  1, label: "1 (Worst)" }
  ],

  job: DS.belongsTo('job'),

  name: attr('string'),
  notes: attr('string'),
  cover_letter: attr('string'),
  github: attr('string'),
  rating: attr('number'),
  cv_url: attr('string', { readOnly: true }),
  cv_file_name: attr('string', { readOnly: true }),

  githubUrl: function() {
    var github = this.get('github');

    if(github) return "http://github.com/%@".fmt(github);
  }.property('github'),

  nameOrUnnamed: function() {
    return this.get('name') || '(unnamed)';
  }.property('name'),

  ratingPercent: function() {
    var rating = this.get("rating");

    if(rating) return rating*10;
  }.property("rating"),

  isNameValid: function() {
    return Ember.isEmpty(this.get("errors.name"));
  }.property('errors.name'),

  coverLetterToMarkdown: function() {
    var letter = this.get("cover_letter");

    if(letter) return window.markdown.toHTML(letter);
  }.property('cover_letter'),

  notesToMarkdown: function() {
    var notes = this.get("notes");

    if(notes) return window.markdown.toHTML(notes);
  }.property('notes')
});

Resume.reopen({
  validations: {
    name: {
      presence: true
    }
  }
});

window.Resume = Resume;

export default Resume;
