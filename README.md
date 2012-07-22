bootstrap-toggle-buttons
========================

live demo: http://www.larentis.eu/bootstrap_toggle_buttons/


Basic Usage
-----------

HTML

    <div id="toggle-button">
        <input id="checkbox1" type="checkbox" value="value1" checked="checked">
    <div>


JS

    $('#toggle-button').toggleButtons();
    
Full Example
------------

HTML

    <div id="toggle-button">
        <input id="checkbox1" type="checkbox" value="value1" checked="checked">
    <div>


JS


    $('#toggle-button').toggleButtons({
      onChange: function ($el, status, e) {
        // $el = $('#toggle-button'); 
        // status = [true, false], the value of the checkbox
        // e = the event
        console.log($el, status, e); 
      },
      width: 100,
      animated: true,
      label: {
        enabled: "ON",
        disabled: "OFF"
      },
      style: {
        // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
        enabled: "primary",
        disabled: "danger"
      }
    });