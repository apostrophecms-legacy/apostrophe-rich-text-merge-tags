var _ = require('lodash');

module.exports = {
  improve: 'apostrophe-rich-text-widgets',
  beforeConstruct: function(self, options) {
    // Make sure the span tag is allowedin markup
    if (!options.sanitizeHtml) {
      options.sanitizeHtml = require('sanitize-html').defaults;
    }
    var sh = options.sanitizeHtml;
    sh.allowedTags.push('span');
    sh.allowedTags = _.uniq(options.sanitizeHtml.allowedTags);
    sh.allowedClasses = options.sanitizeHtml.allowedClasses || {};
    sh.allowedClasses.span = sh.allowedClasses.span || [];
    sh.allowedClasses.span.push('apos-merge-tag');
    sh.allowedClasses.span = _.uniq(sh.allowedClasses.span);
    sh.allowedAttributes.span = sh.allowedAttributes.span || [];
    sh.allowedAttributes.span.push('data-apos-merge-tag');
  },
  construct: function(self, options) {
    var superOutput = self.output;

    self.output = function(widget, options) {
      var req = self.apos.templates.contextReq;
      var content = widget.content;
      if (widget._edit) {
        return superOutput(widget, options);
      }
      content = self.apos.modules['apostrophe-rich-text-merge-tags'].resolve(req, content);
      // We never modify the original widget.content because we do not want
      // it to lose its permalinks in the database
      var _widget = _.assign({}, widget, { content: content });
      return superOutput(_widget, options);
    };

  }
};
