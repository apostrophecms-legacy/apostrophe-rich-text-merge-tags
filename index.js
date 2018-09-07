var _ = require('lodash');

var modules = [
  'apostrophe-rich-text-merge-tags-rich-text-widgets',
  'apostrophe-rich-text-merge-tags-global',
  'apostrophe-rich-text-merge-tags-areas'
];

module.exports = {
  moogBundle: {
    modules: modules,
    directory: 'lib/modules'
  },
  construct: function(self, options) {
    self.pushAsset('stylesheet', 'editor', { when: 'user' });
    self.pushAsset('script', 'user', { when: 'user' });
    self.pushCreateSingleton();
    self.on('apostrophe-pages:beforeSend', 'pushMergeTags', function(req) {
      // We need this to take effect right on the page if the global doc has
      // just been edited. getCreateSingletonOptions only runs once on page load.
      // So patch the options in the singleton already in the browser.
      req.browserCall('apos.modules["apostrophe-rich-text-merge-tags"].options.mergeTags = ?', req.data.global.aposMergeTags || []);
    });

    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions();
      options.mergeTags = req.data.global.aposMergeTags || [];
      return options;
    };

    self.resolve = function(req, content) {
      content = content || '';
      while (true) {
        // "Why no regexps?" We need to do this as quickly as we can.
        // indexOf and lastIndexOf are much faster.
        var prefix = '<span class="apos-merge-tag" data-apos-merge-tag="';
        var i = content.indexOf(prefix);
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
      return content;
    };

  }
};
