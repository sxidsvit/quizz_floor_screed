$( document ).ready( function() {

// !!!!!!!!!!!!!!!! CHANGE QUESTION NUMBER !!!!!!!!!!!!!!!! //

var num = 0,
    questionNumber = $( 'span.progress-number' );

function numberUp() {
  num ++;
  questionNumber.text( num ); }

function numberDown() {
  num --;
  questionNumber.text( num ); }

// !!!!!!!!!!!!!!!! CHANGE DISCOUNT !!!!!!!!!!!!!!!! //
var discount = 3,
    discountSpan = $( '.discount-percent' );

function discountUp() {
  discountSpan.fadeOut( 100 );
  discount += 2;
  discountSpan.text( discount + '%' ).fadeIn( 250 ); }

function discountDown() {
  discountSpan.fadeOut( 100 );
  discount -= 2;
  discountSpan.text( discount + '%' ).fadeIn( 250 ); }

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
  line = line.animate( { width: fillAmount + 'px' }, 400 ); }

function lineEmpty() {
  fillAmount -= 59;
  line = line.animate( { width: fillAmount + 'px' }, 400 ); }

// DISABLE THE BUTTON
function buttonOff() {
  $( 'button.next' ).attr( 'disabled', 'disabled' );
}

// ENABLE THE BUTTON
//$( 'input.answer' ).click( function() {
  //$( 'button.step-forward' ).fadeIn( 900 ).removeClass( 'notactive' );
  //$( 'button.next' ).removeAttr( 'disabled' );
//});

// COLLECT DATA FROM CHECKED INPUTS
var additional,
    tel;

function getData() {
  livingPlace = $( 'input.living-place:checked' ).val();
  square = $( 'input.square:checked' ).val();
}

// ACTIVE ANSWER
//$( 'label' ).click( function(){
  //$( 'label' ).css( 'border-color', '#d2d2d3' );
 // $( this ).css( 'border-color', '#ff470d' );
  //$( '.img-checked' ).css( 'display', 'none' );
//});

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
    console.log('questionCounter = ' + questionCounter);
    clicked.parent().parent().parent().find( 'button.step-forward'  ).removeClass( 'notactive' ).removeAttr( 'title');
  }
  else {
    console.log('questionCounter = ' + questionCounter);
    clicked.parent().parent().find( 'button.step-forward'  ).removeClass( 'notactive' ).removeAttr( 'title');
  }

  // -- change the color of the boarder. Manipulate with a picture checked. Hide the radio button --

  var displayAttr = clicked.find('.img-checked').data("imgchecked");
  console.log('displayAttr до клика : ' + displayAttr);

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
  console.log('displayAttr после клика : ' + displayAttr);
}

// COLLECTING QUIZZ RESULTS
function resultsCollecting() {
// -- collect all the marked inputs and put them into an array  --

  var boxes = $(' input[type="checkbox"].living-place:checked '); 
  var livingPlace = "Где вы будете делать стяжку? - ";
  var count = 0;;
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        livingPlace += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {livingPlace += "Еще не знаю |"}

  var boxes = $(' input[type="checkbox"].square:checked '); 
  var square = "Какая площадь Вашего объекта? - ";
  var count = 0;;
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        square += $(boxes[i]).val() + ' | ';
        count ++;
      }
     }
  if (count == 0) {square += "Еще не знаю |"}

  console.log( livingPlace + ' ' + square + ' ' + additional );
}

// Click ON THE LABEL SIMPLE

$( 'label.simple' ).click( function() {
  var clicked = $(this);
  //clicked = clicked.parent().parent();
  console.log('Ты кликнул по - ');  console.log(clicked[0].childNodes);
  changeState(clicked);
  //resultsCollecting();
});

// Click on the label PENULTIMATE 
$( 'label.penultimate' ).click( function() {
    var clicked = $(this);
    changeState(clicked);


  additional = $( 'input.additional:checked' ).val();

  $( '.questions-frame.simple' ).fadeOut( 10 );
  $( '.question-3' ).delay( 400 ).removeClass( 'visible' );
  $( '.progress' ).css( 'display', 'none' );
  $( '.questions-frame.final'  ).delay( 400 ).fadeIn ( 600 );
  $( '.bg-img' ).fadeOut( 600 ).css( 'display', 'none' );
  $( '#vasyan' ).fadeIn( 900 ).css( 'display', 'inline-block' );
  discountSpan.text( '10%' ).fadeIn( 600 );

  console.log( livingPlace + ' ' + square + ' ' + additional );
  return false;
});

// Click on the button STEP-FORWARD 
$( 'button.step-forward' ).click( function() {
  getData();
  setTimeout( function() {
    hideBlock();
    lineFill ();
    numberUp ();
    buttonOff();
    discountUp();
    showBlock ();
    swapPicture();
  }, 300 );
});

// Click on the button STEP-BACK
$( 'button.step-back' ).click(function() {
  numberDown();
  discountDown();
  lineEmpty();
  getData();
  hideBlock();
  stepBack();
  swapPicture();

  $( '.img-checked' ).css( 'display', 'none' );
  $( 'label' ).css( 'border-color', '#d2d2d3' );
  $( 'input' ).attr( 'checked', false );

  return false;
});

// SUBMIT FORM DATA
$( '#form' ).submit( function(){
  if( !$( 'input.tel' ).val() ){
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } else {
    tel = $( 'input.tel' ).val();
    $.ajax({
      url: './scripts/form.php',
      type: 'post',
      data: { livingPlace: livingPlace,
              square: square,
              additional: additional,
              tel: tel },
      success: function( data ){
        console.log( 'okay' );
        alert( 'Поздравляем! Вы получили скидку!' );
        location.replace( 'index.html' );
      }
    });
  }
  return false;
});

});  