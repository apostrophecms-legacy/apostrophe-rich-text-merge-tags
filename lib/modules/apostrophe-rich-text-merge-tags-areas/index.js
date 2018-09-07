module.exports = {
  improve: 'apostrophe-areas',
  construct: function(self, options) {
    var superRichText = self.richText;
    self.richText = function(within, options) {
      var req = self.apos.templates.contextReq;
      if (!req) {
        // No access to req from here
        return superRichText(within, options);
      }
      // We're in a helper, we have a contextReq
      return self.apos.modules['apostrophe-rich-text-merge-tags'].resolve(req, superRichText(within, options));
    };
  }
};
