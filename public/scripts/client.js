$(document).ready(function () {
  const createTweetElement = function (tweet) {
    // Function to calculate the time difference from now
    const timeAgo = (timeStamp) => {
      const currentTime = Date.now();
      const timeDifference = currentTime - timeStamp;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return `${daysAgo} days ago`;
    };

    // Create the tweet article element
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="Profile Image">
          <h3>${tweet.user.name}</h3>
          <span>${tweet.user.handle}</span>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span>${timeAgo(tweet.created_at)}</span>
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

    // Loop through tweets and append each to the container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  // Sample tweet data
  const data = [
    {
      "user": {
        "name": "Drizzy",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@Drizzerler"
      },
      "content": {
        "text": "Anita MAX WYNN!"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // Render the sample tweets
  renderTweets(data);
});
