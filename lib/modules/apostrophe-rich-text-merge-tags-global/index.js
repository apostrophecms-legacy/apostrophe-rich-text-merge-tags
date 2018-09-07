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
            help: 'A "merge tag" is a piece of text that can be inserted into many pages and updated in just one place: right here. The "name" field is shown only to editors selecting a merge tag to insert.'
          },
          {
            name: 'value',
            type: 'string',
            required: true,
            textarea: true,
            label: 'Current Value',
            help: 'Shown to site visitors, anywhere the merge tag has been inserted. You may change this value at any time.'
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
