CKEDITOR.dialog.add('mergetag', function(editor) {
  return {
    title: 'Select Merge Tag',
    minWidth: 200,
    minHeight: 100,
    contents: [
      {
        id: 'info',
        elements: [
          {
            id: 'mergeTag',
            type: 'select',
            label: 'Merge Tag',
            required: true,
            items: _.map(getMergeTags(), function(tag) {
              return [ tag.name, tag.id ];
            }),
            setup: function(widget) {
              this.setValue(widget.data.mergeTagId);
            },
            commit: function(widget) {
              widget.setData('mergeTagId', this.getValue());
            },
            validate: CKEDITOR.dialog.validate.notEmpty("You must select a merge tag.")
          }
        ]
      }
    ]
  };
  function getMergeTags() {
    return apos.modules['apostrophe-rich-text-merge-tags'].options.mergeTags;
  }
});
