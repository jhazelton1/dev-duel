/* eslint-disable no-undef */

const format = obj => {
  for (let k in obj) {
    if (obj[k] === null) {
      obj[k] = `${k.slice(0, 1).toUpperCase() + k.slice(1)}: Not Provided`
    }
  }
  if (obj['titles'].length === 0) {
    obj['titles'].push('None')
  }
  if (obj['bio'].length > 40) {
    obj['bio'] = `${obj['bio'].slice(0, 37) + '...'}`
  }
  if (obj['favorite_language'] === null) {
    obj[favorite_language] = 'None'
  }
  return obj
}

$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json())
    .then(data => {
      format(data)
      console.log(`Got data for ${username}`)
      console.log(data)

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

      let errorHtml = `<h1> That user doesn't exist! </h1>`

      $('.user-results').html(errorHtml)
    })

  return false
})
