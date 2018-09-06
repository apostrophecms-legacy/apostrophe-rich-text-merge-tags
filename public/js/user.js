apos.define('apostrophe-rich-text-merge-tags', {
  construct: function(self, options) {
    self.options = options;
    CKEDITOR.plugins.addExternal('mergetags', '/modules/apostrophe-rich-text-merge-tags/js/ckeditorPlugins/mergetags/', 'plugin.js');

    apos.on('ready', function() {
      // An old value will already be there, but update with the
      // latest value
      $('[data-apos-merge-tag]').each(function() {
        var $tag = $(this);
        var id = $tag.attr('data-apos-merge-tag');
        var tags = self.options.mergeTags;
        var tag = _.find(tags, { id: id }) || { value: '**MISSING**' };
        if (tag) {
          $tag.html(apos.utils.escapeHtml(tag.value).replace(/\n/g, '<br />\n'));
        }
      });
    });
  }
});

