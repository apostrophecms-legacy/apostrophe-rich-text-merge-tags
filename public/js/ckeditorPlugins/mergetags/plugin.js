CKEDITOR.plugins.add('mergetags', {
  requires: 'widget',
  icons: 'mergetag',
  init: function(editor) {
    CKEDITOR.dialog.add('mergetag', this.path + 'dialogs/mergetag.js' );
    editor.widgets.add('mergetag', {
      template: '<span class="apos-merge-tag" data-apos-merge-tag="test">Merge Tag</span>',
      button: 'Insert a merge tag whose value is set elsewhere',
      dialog: 'mergetag',
      allowedContent: 'span(!apos-merge-tag)[!data-apos-merge-tag]',
      draggable: false,
      upcast: function( element ) {
        return (element.name === 'span') && element.hasClass('apos-merge-tag');
      },
      init: function() {
        this.setData('mergeTagId', this.element.getAttribute('data-apos-merge-tag'));
      },
      data: function() {
        var id = this.data.mergeTagId;
        this.element.setAttribute('data-apos-merge-tag', id);
        var tag = _.find(getMergeTags(), { id: id }) || {
          value: '*MISSING*'
        };
        console.log('VALUE: ', tag.value);
        this.element.setHtml(apos.utils.escapeHtml(tag.value).replace(/\n/g, '<br />\n'));
        function getMergeTags() {
          return apos.modules['apostrophe-rich-text-merge-tags'].options.mergeTags;
        }
      }
    });
  }
});

