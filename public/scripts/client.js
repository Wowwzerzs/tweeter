$(document).ready(function () {
  // Function to calculate the time difference from now
  const timeAgo = function (timeStamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - timeStamp;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  // Escape function to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create the tweet article element
  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${escape(tweet.user.avatars)}" alt="Profile Image">
          <h3>${escape(tweet.user.name)}</h3>
          <span>${escape(tweet.user.handle)}</span>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
          <span class="time-ago">${timeAgo(tweet.created_at)}</span>
          <div class="icons">
            <i class="far fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  const renderTweets = function (tweets) {
    // Clear the existing tweets in the container
    $('#tweets-container').empty();

    // Loop through tweets and prepend each to the container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });

    // Display the time passed since tweet creation
    $(".time-ago").each(function () {
      const timeStamp = parseInt($(this).text());
      $(this).text(timeAgo(timeStamp));
    });
  };

  const loadTweets = function () {
    // Use AJAX to fetch tweets from the server
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.error(err);
      }
    });
  };

  // Event listener for form submission
  $("#tweet-form").submit(function (event) {

    // Hide the error container upon submission behavior
    $(".error-container").slideUp();

    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the tweet text from the form
    const tweetText = $('#tweet-text').val();

    // Validate tweet text
    if (!tweetText) {
      $(".error-container").text("Tweet content cannot be empty.").slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $(".error-container").text("Tweet is too long. Please keep it under 140 characters.").slideDown();
      return;
    }


    // Serialize the form data
    const serializedData = $(this).serialize();

    // Use AJAX to send a POST request to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
      success: function () {
        // Clear the form and load tweets again on success
        $('#tweet-text').val('');
        $(".counter").text("140");
        loadTweets();
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

  loadTweets();
});
