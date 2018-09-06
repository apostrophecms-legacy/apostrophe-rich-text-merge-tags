var modules = [
  'apostrophe-rich-text-merge-tags-rich-text-widgets',
  'apostrophe-rich-text-merge-tags-global'
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
  }
};
