Calls = new Mongo.Collection("calls", {
  transform: function(doc) {
    doc.slug = function() {
      return this.title.replace(/[^a-z]+/ig, '-');
    };

    doc.submissionCount = function() {
      return Submissions.find({callId: this._id}).count();
    };

    return doc;
  }
});

Calls.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  body: {
    type: String,
    label: "Brief summary",
    optional: true,
    autoform: {
      rows: 8
    }
  },
  backgroundImage: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },
  backgroundPosition: {
    type: String,
    optional: true,
    label: "Background position (e.g. bottom left)"
  },
  backgroundSize: {
    type: String,
    label: "Background size mode",
    optional: true,
    allowedValues: ['cover', 'contain']
  },
  backgroundType: {
    type: String,
    label: 'Background type',
    optional: true,
    allowedValues: ['dark', 'light'],
    autoform: {
      options: {
        dark: 'Dark background',
        light: 'Light background'
      }
    }
  }
}));
