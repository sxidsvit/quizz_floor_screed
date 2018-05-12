$( document ).ready( function() {

// ! CHANGE QUESTION NUMBER

var num = 0,
    questionNumber = $( 'span.progress-number' );

function numberUp() {
  num ++;
  questionNumber.text( num ); 
}

function numberDown() {
  num --;
  questionNumber.text( num ); 
}

// !!!!!!!!!!!!!!!! CHANGE DISCOUNT !!!!!!!!!!!!!!!! //
var discount = 3,
    discountSpan = $( '.discount-percent' );

function discountUp() {
  discountSpan.fadeOut( 100 );
  discount += 2;
  discountSpan.text( discount + '%' ).fadeIn( 250 ); 
}

function discountDown() {
  discountSpan.fadeOut( 100 );
  discount -= 2;
  discountSpan.text( discount + '%' ).fadeIn( 250 ); 
}

// !!!!!!!!!!!!!!!! NEXT QUESTION !!!!!!!!!!!!!!!! //

// GET ELEMENT
var question = $( 'question' ),
    questionCounter = 1;

// HIDE BLOCK
function hideBlock() {
  $( '.visible' ).fadeOut( 10 ).removeClass( 'visible' );
}

// SHOW BLOCK
function showBlock() {
  questionCounter ++;
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

// STEP BACK
function stepBack(){
  questionCounter --;
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

// !!!!!!!!!!!!!!!! ANIMATION !!!!!!!!!!!!!!!! //

// LINE ANIMATION
var fillAmount = 25,
    line = $(' .line-fill' );

function lineFill() {
  fillAmount += 59;
  line = line.animate( { width: fillAmount + 'px' }, 400 );
}

function lineEmpty() {
  fillAmount -= 59;
  line = line.animate( { width: fillAmount + 'px' }, 400 ); 
}

// DISABLE THE BUTTON
function buttonOff() {
  $( 'button.next' ).attr( 'disabled', 'disabled' );
}

// CHANGE DECORATION PICTURES
function swapPicture() {
  if ( $( '.question-1' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' );
    $( '#yellow' ).fadeIn( 800 ).css( 'display', 'inline-block' );
    $( '#blocks' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  } else if ( $( '.question-2' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' );
    $( '#horznt' ).fadeIn( 800 ).css( 'display', 'inline-block' );
    $( '#roulet' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  } else if ( $( '.question-3' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' ); 
    $( '#heater' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  }
}

// CHANGE INPUTS & IMG STATES
function changeState(clicked) {

  if (questionCounter == 1) {
    //console.log('questionCounter = ' + questionCounter);
    clicked.parent().parent().parent().find( 'button.step-forward'  ).removeClass( 'notactive' ).removeAttr( 'title');
  }
  else {
    console.log('questionCounter = ' + questionCounter);
    clicked.parent().parent().find( 'button.step-forward'  ).removeClass( 'notactive' ).removeAttr( 'title');
  }

  // -- change the color of the boarder. Manipulate with a picture checked. Hide the radio button --

  var displayAttr = clicked.find('.img-checked').data("imgchecked");
  //console.log('displayAttr до клика : ' + displayAttr);

  clicked.find( 'input:checkbox' ).toggle(displayAttr);

  if ( displayAttr === false ) {
     clicked.find( 'input:checkbox' ).prop( 'checked', true );
     clicked.css( 'border-color', '#ff470d' );
     clicked.find('.img-checked').css( 'display', 'inline-block' );
     displayAttr = true;
     clicked.find('.img-checked').data("imgchecked", displayAttr);
  } 
  else if ( displayAttr === true ) {
    clicked.find( 'input:checkbox' ).prop( 'checked', false);
    clicked.css( 'border-color', '#d2d2d3' );
    clicked.find(' input[type="checkbox"] ').attr( 'style', 'display:none' );
    clicked.find('.img-checked').css( 'display', 'none' ); 
    displayAttr = false;
    clicked.find('.img-checked').data("imgchecked", displayAttr);
  }
  //console.log('displayAttr после клика : ' + displayAttr);
}

// COLLECTING QUIZZ RESULTS
var livingPlace, square, additional;

function resultsCollecting() {
  // -- collect all the marked inputs and put them into an array  --

  var boxes = $(' input[type="checkbox"].living-place:checked '); 
  var count = 0;
  livingPlace = "Где вы будете делать стяжку? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        livingPlace += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {livingPlace += "Еще не знаю |"}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].square:checked '); 
  var count = 0;
  square = "Какая площадь Вашего объекта? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        square += $(boxes[i]).val() + ' | ';
        count ++;
      }
     }
  if (count == 0) {square += "Еще не знаю |"}
// ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].additional:checked '); 
  var count = 0;
  additional = "Дополнительные работы - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        additional += $(boxes[i]).val() + ' | ';
        count ++;
      }
     }
  if (count == 0) {square += "Еще не знаю |"}
// ----------------------------------------------------------------

  //console.log( livingPlace + ' ' + square + ' ' + additional );
  console.log( 'livingPlace : ' + livingPlace );
  console.log( 'square : ' + square );
  console.log( 'additional : ' + additional );
}

// Click ON THE LABEL SIMPLE

$( 'label.simple' ).click( function() {
  var clicked = $(this);
  //console.log('Ты кликнул по - ');  console.log(clicked[0].childNodes);
  changeState(clicked);
  resultsCollecting();
  return false;
});

// Click on the label PENULTIMATE 
$( 'label.penultimate' ).click( function() {
    var clicked = $(this);
    changeState(clicked);
    resultsCollecting();
    return false;
});

// Click on the button STEP-FORWARD 
$( 'button.step-forward' ).click( function() {
  setTimeout( function() {
    hideBlock();
    lineFill ();
    numberUp ();
    buttonOff();
    discountUp();
    showBlock ();
    swapPicture();
  }, 300 );

  var lastQuestion = $(this).parent().hasClass('question-3');
  if ( lastQuestion ) {
    // console.log( ' Секция с третим вопросом ');
    $( '.questions-frame.simple' ).fadeOut( 10 );
    $( '.question-3' ).delay( 400 ).removeClass( 'visible' );
    $( '.progress' ).css( 'display', 'none' );
    $( '.questions-frame.final'  ).delay( 400 ).fadeIn ( 600 );
    $( '.bg-img' ).fadeOut( 600 ).css( 'display', 'none' );
    $( '#vasyan' ).fadeIn( 900 ).css( 'display', 'inline-block' );
    discountSpan.text( '10%' ).fadeIn( 600 );
  }
  return false;
});

// Click on the button STEP-BACK
$( 'button.step-back' ).click(function() {
  setTimeout( function() {
   numberDown();
   discountDown();
   lineEmpty();
   hideBlock();
   stepBack();
   swapPicture();
  }, 300 );

  return false;
});

// SUBMIT FORM DATA

$( '#form' ).submit( function(){
  if( !$( 'input.tel' ).val() ){
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } 
  else {
    var tel = 'Телефон: ' + $( 'input.tel' ).val();
    try {
      $.ajax({
        url: 'http://ad.lekua.in.ua/calc//mail.php',
        type: 'post',
        data: { 
                livingPlace: livingPlace,
                square: square,
                additional: additional,
                tel: tel 
              },
        success: function( data ){
          console.log( 'Сообщение отправлено' );
          alert( 'Поздравляем! Вы получили скидку!' );
          location.replace( 'index.html' );
        }
      });
    }
    catch (e) {
     console.log(e);
    }
  }
  return false;
});

}); // end $( document ).ready( function() {