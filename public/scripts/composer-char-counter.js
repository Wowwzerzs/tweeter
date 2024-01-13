$(document).ready(function () {
  // Event handler for the textarea
  $('#tweet-text').on('input', function () {
    const charCount = $(this).val().length; // Get the length of the input value

    console.log('Character count:', charCount);

    $('.counter').text(140 - charCount); // Update the counter on the page
    $('.counter').toggleClass('invalid', charCount > 140); // Adjust the counter color based on validity
  });
});
