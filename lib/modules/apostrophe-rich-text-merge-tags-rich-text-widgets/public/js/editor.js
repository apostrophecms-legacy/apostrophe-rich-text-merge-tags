apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function(self, options) {
    var superBeforeCkeditorInline = self.beforeCkeditorInline;
    self.beforeCkeditorInline = function() {
      superBeforeCkeditorInline();
      self.config.extraPlugins = _.uniq((self.config.extraPlugins || '').split(',').concat([ 'widget', 'mergetags' ])).join(',');
    };
  }
});
