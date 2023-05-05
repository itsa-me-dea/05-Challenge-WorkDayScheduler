// https://api.jquery.com
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. (https://www.w3schools.com/jquery/jquery_syntax.asp#:~:text=The%20Document%20Ready%20Event&text=This%20is%20to%20prevent%20any,ready%20before%20working%20with%20it.)

$(document).ready(function(){
  
  
  // jQuery methods go here...
  $(function () {
    // changeColor();
    // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?
    var saveButtonEl = $('.saveBtn');
     
    // https://stackoverflow.com/questions/10260667/jquery-get-parent-parent-id
    saveButtonEl.on("click", function (event) {
      event.preventDefault();

      var textBox = $(this).parent().attr('id');
      var text = $(this).siblings('textarea').val();
      localStorage.setItem(textBox, text);
      // var keep = localStorage.getItem(textInput);
      // $(this).siblings('textarea').text(keep);
    });

    // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?
    var currentDate = dayjs().format('H') - 4;
    console.log('Military time: ' + currentDate)

    // for each card, if hour after currentDate --> green (.future)
    // if match currentDate --> red (.present)
    // else (ie before currentDate) --? grey (.past)
    // https://api.jquery.com/removeclass/

    function changeColor() {
      for (i = 9; i < 18; i++) {
        var currentCard = '#hour-' + i;

        
        if (i > currentDate) {
          $(currentCard).removeClass('past').addClass('future');
          
        } else if (i == currentDate) {
          $(currentCard).removeClass('past').addClass('present');
        
        } 
      };

    }

    setInterval(changeColor, 60000);

    console.log('Yesterday is history, Tomorrow is a mystery, but Today is a gift. That is why it is called the present. - Oogway')

    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?
    function keepText(currentCard) {
      
      for (i = 9; i < 18; i++) {
        var currentKey = 'hour-' + i;
        var currentCard = '#hour-' + i;
        // var test = $(currentCard).children('textarea').val();

        // console.log(currentKey);
        var localText = window.localStorage.getItem(currentKey);

        $(currentCard).children('textarea').append(localText);
        
      };
      
    }

    keepText();
    changeColor();
    
    // TODO: Add code to display the current date in the header of the page. (https://stackoverflow.com/questions/39418405/making-a-live-clock-in-javascript)
    // https://day.js.org/docs/en/display/format
    function time() {
      var today = dayjs();
      $('#currentDay').text(today.format('dddd, MMM D, YYYY, h:mm:ss a'));
    }
    
    setInterval(time, 1000);
  });

});