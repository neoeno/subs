Calls = new Mongo.Collection("calls");
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
  backgroundUrl: {
    type: String,
    label: "Background image (URL)",
    optional: true
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
