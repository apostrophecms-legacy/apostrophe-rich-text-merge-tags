module.exports = {
  improve: 'apostrophe-global',
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'aposMergeTags',
        label: 'Merge Tags',
        type: 'array',
        schema: [
          {
            name: 'name',
            type: 'string',
            required: true,
            label: 'Name',
            help: 'Shown only to editors selecting a merge tag to insert.'
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            textarea: true,
            label: 'Current Value',
            help: 'Shown to site visitors. You may change this value at any time.'
          }
        ],
        titleField: 'name'
      }
    ].concat(options.addFields || []);
    options.arrangeFields = [
      {
        name: 'aposMergeTagsGroup',
        label: 'Merge Tags',
        fields: [ 'aposMergeTags' ]
      }
    ].concat(options.arrangeFields || []);
  }
};
