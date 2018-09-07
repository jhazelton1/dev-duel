/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      /*
        TODO
        Attach the data returned to the DOM
        The data currently hard-coded into the DOM is placeholder data
       */
      let html = `<span class="username">${data.username}</span>
      <span class="full-name">${data.name}</span>
      <span class="location">${data.location}</span>
      <span class="bio">${data.bio}</span>
      <img class="avatar" src="${data.avatar}" alt="avatar picture">
      <div class="stats">
          <div class="stat">
              <span class="label">Titles:&nbsp;</span>
              <span class="titles value">${data.titles.join(' ')}</span>
          </div>
          <div class="stat">
              <span class="label">Favorite language:&nbsp;</span>
              <span class="favorite-language value">${data.favorite_language}</span>
          </div>
          <div class="stat">
              <span class="label">Total stars:&nbsp;</span>
              <span class="total-stars value">${data.total_stars}</span>
          </div>
          <div class="stat">
              <span class="label">Highest star count:&nbsp;</span>
              <span class="most-starred value">${data.highest_starred}</span>
          </div>
          <div class="stat">
              <span class="label">Public repos:&nbsp;</span>
              <span class="public-repos value">${data.public_repos}</span>
          </div>
          <div class="stat">
              <span class="label">'Perfect' Repos:&nbsp;</span>
              <span class="favorite-language value">${data.perfect_repos}</span>
          </div>
          <div class="stat">
              <span class="label">Followers:&nbsp;</span>
              <span class="followers value">${data.followers}</span>
          </div>
      </div>`
      $('.user-results').html(html)
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false // return false to prevent default form submission
})
