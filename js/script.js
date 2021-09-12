const email = $('#emailInput');
let emailArray = [];
let duplicateItems;
let imageWebsite = 'https://picsum.photos/id/';

const smallImage = $( '#resultsContainer .resultRow .smallImage' );
const resultsContainer = $('#resultsContainer');
const resultRow = $('.resultRow');

// Uses the getRandom function to generate a random image
function getImage () {
    $('.imageContainer img').attr('src', imageWebsite + getRandom(1000) + '/1200');
}

// Retreive a random number
function getRandom( max ) {
    let number;
    number = (Math.random() * max).toFixed(0);
    return number;
};

// Checks to see if the email has already been assigned to the array
function logCheck () {
    return emailArray.includes( email.val() );
};

// Adds the image to the existing resultRow function
function addImg () {
    $('.imageContainer img').clone().addClass('smallImage').prependTo( $('.resultRow')[ duplicateItems ] );
};

// Create a resultRow function 
function createItem () {
    resultsContainer.append('<div class="resultRow">' + '<img class="smallImage" src="' + $('.imageContainer img').attr('src') + '">' + '<p class="email">' +'<strong>Email: </strong>' + $('#emailInput').val() + '</p>' + '<hr>' + '</div>');
    emailArray.push( email.val() );
};

// Tries to load another image if there was an error with the last one
$('.imageContainer img').on('error', function() {
    console.log('Unexpected error. There was a problem loading the image.');
    getImage();
});

// Validates the entered email
function isValid () {
    let emailError = false;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Create an error if email field is empty
    if ( email.val().trim() == '' ) {
        emailError = true;

    // Create an error if email is an incorrect format
    } else if ( !regex.test( email.val() ) ) {
        emailError = true;   
    }

    // If Email Validation has an error, return false
    if ( emailError == true ) { 
        return false; 
    } else if ( emailError == false ) { 
        return true; };
};

// Load initial Image
$( window ).on('load', getImage());

// Execute getImage when load another image button is pressed
$( '#loadImage' ).on('click', function () {
    getImage();
})

// Assign the email to the email if it's valid
$( '#submit' ).on('click', function(event) {
    event.preventDefault();

    if ( isValid() == false )  {
        alert('Incorrect Email, please ensure it is properly formatted.');
    } else if ( isValid() == true ) {

        if ( logCheck() == true ) {
            duplicateItems =  emailArray.indexOf( email.val() );
            addImg();
            getImage(); 

        } else if ( logCheck() == false ) { 
            createItem();
            getImage();
        }
    }
});