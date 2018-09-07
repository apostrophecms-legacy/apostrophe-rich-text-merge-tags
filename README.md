With this module, you can create "merge tags" in [ApostropheCMS](https://apostrophecms.org).

Merge tags are bits of text that you can reuse and reference in any rich text editor configured for them. Add a merge tag and its text value here, then look for the puzzle piece icon in the toolbar of your rich text editor to place the merge tag. If you later edit the text value here, the change will take effect **everywhere the merge tag has been placed.**

For example...

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-1.png" /></p>

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-2.png" /></p>

Then you and your editors can insert them into any rich text widget...

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-3.png" /></p>

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-4.png" /></p>

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-5.png" /></p>

And **if you change the value of the tag later, that will automatically be reflected on the page.**

Of course, ordinary site visitors see them as ordinary text with no special styling.

<p align="center"><img src="https://raw.githubusercontent.com/apostrophecms/apostrophe-rich-text-merge-tags/master/screenshots/screenshot-6.png" /></p>

Line breaks are allowed in the values of merge tags. No other formatting is permitted.

## Requirements

Requires Apostrophe `2.66.0` or better.

## Installation

```
npm install apostrophe-rich-text-merge-tags
```

```
// in app.js
modules: {
  'apostrophe-rich-text-merge-tags': {}
}
```

```
{# In the page template where you want to allow this feature
 in a rich text widget. The important thing here is adding
 "Mergetag" to your toolbar. Note the "M" is capitalized. #}

{{
  apos.area(data.page, 'body', {
    widgets: {
      'apostrophe-rich-text': {
        toolbar: [ 'Styles', 'Bold', 'Italic', 'Mergetag' ]
      },
      'apostrophe-images': {}
    }
  })
}}
```

## Warnings

Merge tags in rich text will appear up to date only if they are rendered via `apos.area()`, `apos.singleton()`, or `apos.areas.richText()`. If you are trying to access the `content` property of a rich text widget directly, don't. Instead write:

```
{# If your area potentially containing rich text is called body, #}
{# and all you want is the rich text #}
{{ apos.areas.richText(doc.body) }}
```

You can call `apos.modules['apostrophe-rich-text-merge-tags'].resolve(req, html)` to resolve any merge tags present in the given rich text markup to the latest text. Just don't save them back to the database that way, as you would lose the spans and attributes that make Apostrophe aware they are merge tags.

