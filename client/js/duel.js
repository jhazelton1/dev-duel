/* eslint-disable no-undef */
/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */
$('#duel-submit').click(() => {
  const userOne = $('#left-name').val()
  const userTwo = $('#right-name').val()

  fetch(`${USERS_URL}?username=${userOne}&username=${userTwo}`, {})
    .then(response => response.json())
    .then(([one, two]) => {
      console.log(one, two)
      let leftHtml = `<section class="user-results left">
      <span class="username">${one.username}</span>
      <span class="full-name">${one.name}</span>
      <span class="location">${one.location}</span>
      <span class="bio">${one.bio}</span>
      <img class="avatar" src="${one.avatar}" alt="avatar picture">
      <div class="stats">
          <div class="stat">
              <span class="label">Titles:&nbsp;</span>
              <span class="titles value">${one.titles.join(' ')}</span>
          </div>
          <div class="stat">
              <span class="label">Favorite language:&nbsp;</span>
              <span class="favorite-language value">${one.favorite_language}</span>
          </div>
          <div class="stat">
              <span class="label">Total stars:&nbsp;</span>
              <span class="total-stars value">${one.total_stars}</span>
          </div>
          <div class="stat">
              <span class="label">Highest star count:&nbsp;</span>
              <span class="most-starred value">${one.highest_starred}</span>
          </div>
          <div class="stat">
              <span class="label">Public repos:&nbsp;</span>
              <span class="public-repos value">${one.public_repos}</span>
          </div>
          <div class="stat">
              <span class="label">'Perfect' Repos:&nbsp;</span>
              <span class="favorite-language value">${one.perfect_repos}</span>
          </div>
          <div class="stat">
              <span class="label">Followers:&nbsp;</span>
              <span class="followers value">${one.followers}</span>
          </div>
      </div>
</section>`

      let rightHtml = `<section class="user-results right">
      <span class="username">${two.username}</span>
      <span class="full-name">${two.name}</span>
      <span class="location">${two.location}</span>
      <span class="bio">${two.bio}</span>
      <img class="avatar" src="${two.avatar}" alt="avatar picture">
      <div class="stats">
          <div class="stat">
              <span class="label">Titles:&nbsp;</span>
              <span class="titles value">${two.titles.join(' ')}</span>
          </div>
          <div class="stat">
              <span class="label">Favorite language:&nbsp;</span>
              <span class="favorite-language value">${two.favorite_language}</span>
          </div>
          <div class="stat">
              <span class="label">Total stars:&nbsp;</span>
              <span class="total-stars value">${two.total_stars}</span>
          </div>
          <div class="stat">
              <span class="label">Highest star count:&nbsp;</span>
              <span class="most-starred value">${two.highest_starred}</span>
          </div>
          <div class="stat">
              <span class="label">Public repos:&nbsp;</span>
              <span class="public-repos value">${two.public_repos}</span>
          </div>
          <div class="stat">
              <span class="label">'Perfect' Repos:&nbsp;</span>
              <span class="favorite-language value">${two.perfect_repos}</span>
          </div>
          <div class="stat">
              <span class="label">Followers:&nbsp;</span>
              <span class="followers value">${two.followers}</span>
          </div>
      </div>
</section>`
      $('.duel-container').html(`${leftHtml}\n${rightHtml}`)
    })
    .catch(err => {
      console.log(`Error getting data for ${userOne} and ${userTwo}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false
})
