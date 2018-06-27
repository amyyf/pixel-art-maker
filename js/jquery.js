// Select thread color input
let $color = $("#colorPicker");

// Select size input
let $gridHeight = $("#inputHeight");
let $gridWidth = $("#inputWeight");

// Find table
let $table = $("#pixelCanvas");

// When size is submitted by the user, call makeGrid()
$("#sizePicker").submit( function makeGrid(event) {

  // Prevents page refresh
  event.preventDefault();

  // Access current user-submitted values
  let height = $gridHeight.val();
  let width = $gridWidth.val();
  let fabricColor = $("#fabricColor");

  // Create new table with height and width
  $table.empty();
  $table.append(function makeRow (tableSize) {
    let tableRow = "";
    for (let x = 0; x < height; x++) {
      tableRow += "<tr>";
      for (let y = 0; y < width; y++) {
        tableRow += "<td></td>";
      }
      tableRow += "</tr>";
    }
    return tableRow;
  })
  $table.addClass("clipping");
  $table.css("background-color", $fabricColor.val());
});

// Set fabric color from user
let $fabricColor = $("#fabricColor");

$fabricColor.change(function () {
  $table.css("background-color", $fabricColor.val());
});

// add class stitch with picked color
$table.click(function (event) {

  // Get current value of color input
  let color = $color.val();
  let activeCell = $(event.target).closest("td");
  let newX = $("<i class='fas fa-times'></i>")
  .css("color", color);

  if(activeCell.hasClass("stitch")) {
    /*
        HTML color picker value is in hex format, jQuery is in rgb,
        so had to define newX and its color value outside of if
        statement in order to access both values in the same way and
        then compare them - otherwise they will not be equal values.
        Found child of activeCell rather than the newX definition.
      */
    if(activeCell.children().css("color") !== newX.css("color")) {
      activeCell.children().css("color", color);
    } else {
      activeCell.removeClass("stitch");
      activeCell.empty();
    }
  } else {
    activeCell.append(newX);
    activeCell.addClass("stitch");
  }
})
