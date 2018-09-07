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
      var i;
      content = content || '';
      if (!widget._edit) {
        while (true) {
          // "Why no regexps?" We need to do this as quickly as we can.
          // indexOf and lastIndexOf are much faster.
          var prefix = '<span class="apos-merge-tag" data-apos-merge-tag="';
          i = content.indexOf(prefix);
          if (i === -1) {
            break;
          }
          var offset = i + prefix.length;
          var closeQuote = content.indexOf('"', offset);
          if (closeQuote === -1) {
            break;
          }
          var mergeTagId = content.substring(offset, closeQuote);
          var closeTag = content.indexOf('</span>');
          if (closeTag === -1) {
            return;
          }
          var mergeTag = _.find(req.data.global.aposMergeTags, {
            id: mergeTagId
          });
          if (!mergeTag) {
            mergeTag = {
              name: '**deleted**',
              value: ''
            };
          }
          content = content.substring(0, i) + self.apos.utils.escapeHtml(mergeTag.value).replace(/\n/g, '<br />\n') + content.substring(closeTag + 7);
        }
      }
      // We never modify the original widget.content because we do not want
      // it to lose its permalinks in the database
      var _widget = _.assign({}, widget, { content: content });
      return superOutput(_widget, options);
    };
  }
};
