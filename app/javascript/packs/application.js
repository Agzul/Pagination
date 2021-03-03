// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

window.onload = function() {
  var current_page = document.body.attributes.class.value.split(/ /);
  var current_controller = current_page[0];
  var current_action     = current_page[1];
  if ( current_controller == "main" && current_action == "home" ) {
    require("packs/home");
  }
  if ( current_controller == "main" && current_action == "slider" ) {
    require("packs/slider");
  }
}
