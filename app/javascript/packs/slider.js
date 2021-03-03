$( function() {
  function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
  }
  function getRGB(str){
    var arr = str.match(/rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return arr ? {
      red: arr[1],
      green: arr[2],
      blue: arr[3]
    } : {};
  }
  // Red slider
  $("#slider1").slider({
    min: 0,
    max: 255,
    step: 5,
    range: "min",
    slide: function() {
      var value = $("#slider1").slider("value");
      $( "#slider1 .ui-slider-range" ).css( "background-color", 'rgb(255,0,0)' );
      if ( $("#radio-1").attr("checked") ) {
        var currentColor = getRGB($("#text").css("color"));
        $("#text").css( 'color', rgb(value, currentColor.green, currentColor.blue) );
      }
      if ( $("#radio-2").attr("checked") ) {
        var currentColor = getRGB($("#text").css("background-color"));
        $("#text").css( 'background-color', rgb(value, currentColor.green, currentColor.blue) );
      }
    },
  });
  // Green slider
  $("#slider2").slider({
    min: 0,
    max: 255,
    step: 5,
    range: "min",
    slide: function() {
      var value = $("#slider2").slider("value");
      $( "#slider2 .ui-slider-range" ).css( "background-color", 'rgb(0,255,0)' );
      if ( $("#radio-1").attr("checked") ) {
        var currentColor = getRGB($("#text").css("color"));
        $("#text").css( 'color', rgb(currentColor.red, value, currentColor.blue) );
      }
      if ( $("#radio-2").attr("checked") ) {
        var currentColor = getRGB($("#text").css("background-color"));
        $("#text").css( 'background-color', rgb(currentColor.red, value, currentColor.blue) );
      }
    },
  });
  // Blue slider
  $("#slider3").slider({
    min: 0,
    max: 255,
    step: 5,
    range: "min",
    slide: function() {
      var value = $("#slider3").slider("value");
      $( "#slider3 .ui-slider-range" ).css( "background-color", 'rgb(0,0,255)' );
      if ( $("#radio-1").attr("checked") ) {
        var currentColor = getRGB($("#text").css("color"));
        $("#text").css( 'color', rgb(currentColor.red, currentColor.green, value) );
      }
      if ( $("#radio-2").attr("checked") ) {
        var currentColor = getRGB($("#text").css("background-color"));
        $("#text").css( 'background-color', rgb(currentColor.red, currentColor.green, value) );
      }
    },
  });
  // Checkboxes
  $("input").checkboxradio({
    icon: false
  });
  $("#radio-1").click(function(){
    $("#radio-1").attr("checked","checked").change();
    $("#radio-2").attr("checked", null).change();
  });
  $("#radio-2").click(function(){
    $("#radio-2").attr("checked","checked").change();
    $("#radio-1").attr("checked", null).change();
  });
} );
