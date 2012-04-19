jquery.divider.js
====== 

A jQuery plugin for a sliding image divider

Options
---
* `panels`: The selector used to find the panels inside the divider element (default: `'.panels'`)
* `controller`: The name of the class assigned to the controller objects (if string), or the element to use as the controller (if jQuery object) (default: `'controller'`)
* `direction`: Accepts `'horizontal'` or `'vertical'`; denotes the direction of the dividers (default: `'vertical'`)
* `position`: Accepts an array of numbers indicating the position of each controller. If no value is passed, the controllers are set up to be equidistant (default: `[]`)
* `handle`: The name of the class assigned to the handle object (if string), or the element to use as the controller (if jQuery object). If left unassigned, no handle is used (default: `false`)

Example
---
Sets `#container1` to be a vertical divider, and `#container3` to be a horizontal divider.

```javascript
  $('#container1').divider({
    controller: 'v-divider', // class assigned to controller div
    direction:  'vertical',
    panels:     '.section',
    position:   [ 550 ], // Sets the only handle to be 550px from the left
    handle:     'handle'
  });

  $('#container3').divider({
    controller: $('<div />', { 'class' : 'h-divider' }), // jQuery element that will be used for controller
    direction:  'horizontal',
    panels:     '.section',
    position:   [ 0 ], // Start the controller at the very top (0px)
    handle:     $('<div />', { 'class' : 'handle' }); // jQuery element to be used for handle
  });
```

Contributing
---
This project uses [smoosh](https://github.com/fat/smoosh) for compiling, linting.
