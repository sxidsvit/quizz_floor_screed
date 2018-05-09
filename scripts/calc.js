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
$( 'input.answer' ).click( function() {
  $( 'button.next' ).removeAttr( 'disabled' );
});

// COLLECT DATA FROM CHECKED INPUTS
var livingPlace,
    square,
    additional,
    tel;

function getData() {
  livingPlace = $( 'input.living-place:checked' ).val();
  square = $( 'input.square:checked' ).val();
}

// ACTIVE ANSWER
$( 'label' ).click( function(){
  $( 'label' ).css( 'border-color', '#d2d2d3' );
  $( this ).css( 'border-color', '#ff470d' );
  $( '.img-checked' ).css( 'display', 'none' );
});

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

// DO ALL THE MAGIC
$( 'label.simple' ).click( function() {
  $( this ).find( 'input:radio' ).attr( 'checked', 'checked' );
  $( 'input.answer:checked + .img-checked' ).css( 'display', 'inline-block' );
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

  console.log( livingPlace + ' ' + square + ' ' + additional );
  return false;
});

// CHANGE TO PHONE REQUEST STEP
$( '.penultimate' ).click( function() {
  $( this ).find( 'input:radio' ).attr( 'checked', 'checked' );
  $( 'input.answer:checked + .img-checked' ).css( 'display', 'inline-block' );
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

// MAKE THE STEP BACK HAPPEN
$( '.step-back' ).click(function() {
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
