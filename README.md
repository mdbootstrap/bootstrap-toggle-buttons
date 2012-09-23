Bootstrap-toggle-buttons
========================

Demo
----
http://www.larentis.eu/bootstrap_toggle_buttons/

Usage
-----

Just include Twitter Bootstrap, jQuery and Bootstrap Toggle Buttons CSS and Javascript
``` html
<link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
<link href="bootstrap-toggle-buttons.css" rel="stylesheet">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="jquery.toggle.buttons.js"></script>
```

Basic Example
-------------

HTML
``` html
<div id="toggle-button">
    <input id="checkbox1" type="checkbox" value="value1" checked="checked">
</div>
```

JS
``` javascript
$('#toggle-button').toggleButtons();
```

Full Example
------------

HTML
``` html
<div id="toggle-button">
    <input id="checkbox1" type="checkbox" value="value1" checked="checked">
</div>
```

JS
``` javascript
$('#toggle-button').toggleButtons({
  onChange: function ($el, status, e) {
    // $el = $('#toggle-button'); 
    // status = [true, false], the value of the checkbox
    // e = the event
    console.log($el, status, e); 
  },
  width: 100,
  height: 25,
  font: {
    'font-size': '20px',
    'font-style': 'italic'
  },
  animated: true,
  transitionSpeed: 1, // Accepted values float or "percent" [ 1, 0.5, "150%" ]
  label: {
    enabled: "ON",
    disabled: "OFF"
  },
  style: {
    // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
    enabled: "primary",
    disabled: "danger",
    custom: {
      enabled: "#FF00FF",
      enabledGradient: "#D300D3",
      enabledColor: "#FFFFFF",
      disabled: "#FFAA00",
      disabledGradient: "#DD9900",
      disabledColor: "#333333"
    }
  }
});

$('#toggle-button').toggleButtons('toggleActivation'); // to toggle the disabled status
```