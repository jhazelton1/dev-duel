/* eslint-disable no-undef */
/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */

const strikethrough = str => {
  $(str).css('text-decoration', 'line-through red')
}

const winnerBorder = str => {
  $(str).css('border', '1px solid green')
}

const titlesScore = titles =>
  titles.reduce((score, title) => {
    if (title === 'Stalker') {
      score -= 5
    }
    if (title === 'Mr. Popular') {
      score += 10
    }
    if (title === 'One-Trick Pony') {
      score -= 5
    }
    if (title === 'Jack of All Trades') {
      score += 15
    }
    if (title === 'Forker') {
      score += 3
    }
    if (title === 'Veteran') {
      score += 3
    }
    return score
  }, 0)

const determineWinner = (a, b) => {
  let userOneScore = 0
  let userTwoScore = 0

  userOneScore += titlesScore(a['titles'])
  userTwoScore += titlesScore(b['titles'])

  titlesScore(a['titles']) > titlesScore(b['titles'])
    ? (winnerBorder('#titles-left'), strikethrough('#titles-right'))
    : (winnerBorder('#titles-right'), strikethrough('#titles-left'))

  console.log(userOneScore + ' ' + userTwoScore)

  userOneScore += parseInt(a['followers'])
  userTwoScore += parseInt(b['followers'])

  parseInt(a['followers']) > parseInt(b['followers'])
    ? (winnerBorder('#followers-left'), strikethrough('#followers-right'))
    : (winnerBorder('#followers-right'), strikethrough('#followers-left'))

  console.log(userOneScore + ' ' + userTwoScore)

  userOneScore += parseInt(a['total_stars'])
  userTwoScore += parseInt(b['total_stars'])

  parseInt(a['total_stars']) > parseInt(b['total_stars'])
    ? (winnerBorder('#total-stars-left'), strikethrough('#total-stars-right'))
    : (winnerBorder('#total-stars-right'), strikethrough('#total-stars-left'))

  console.log(userOneScore + ' ' + userTwoScore)

  userOneScore += parseInt(a['public_repos']) / 2
  userTwoScore += parseInt(b['public_repos']) / 2

  parseInt(a['public_repos']) > parseInt(b['public_repos'])
    ? (winnerBorder('#public-repos-left'), strikethrough('#public-repos-right'))
    : (winnerBorder('#public-repos-right'), strikethrough('#public-repos-left'))

  console.log(userOneScore + ' ' + userTwoScore)

  userOneScore += parseInt(a['perfect_repos'])
  userTwoScore += parseInt(b['perfect_repos'])

  parseInt(a['perfect_repos']) > parseInt(b['perfect_repos'])
    ? (winnerBorder('#perfect-repos-left'), strikethrough(
        '#perfect-repos-right'
      ))
    : (winnerBorder('#perfect-repos-right'), strikethrough(
        '#perfect-repos-left'
      ))

  console.log(userOneScore + ' ' + userTwoScore)

  return userOneScore > userTwoScore ? a : b
}

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

$('#duel-submit').click(() => {
  $('.winner-container').html('')

  const userOne = $('#left-name').val()
  const userTwo = $('#right-name').val()

  fetch(`${USERS_URL}?username=${userOne}&username=${userTwo}`, {})
    .then(response => response.json())
    .then(([one, two]) => {
      console.log(one, two)
      format(one)
      format(two)
      let leftHtml = `<section class="user-results left">
      <span class="username">${one.username}</span>
      <span class="full-name">${one.name}</span>
      <span class="location">${one.location}</span>
      <span class="bio">${one.bio}</span>
      <img class="avatar" src="${one.avatar}" alt="avatar picture">
      <div class="stats">
          <div class="stat">
              <span class="label">Titles:&nbsp;</span>
              <span id= "titles-left"class="titles value">${one.titles.join(' ')}</span>
          </div>
          <div class="stat">
              <span class="label">Favorite language:&nbsp;</span>
              <span class="favorite-language value">${one.favorite_language}</span>
          </div>
          <div class="stat">
              <span class="label">Total stars:&nbsp;</span>
              <span id= "total-stars-left" class="total-stars value">${one.total_stars}</span>
          </div>
          <div class="stat">
              <span class="label">Highest star count:&nbsp;</span>
              <span class="most-starred value">${one.highest_starred}</span>
          </div>
          <div class="stat">
              <span class="label">Public repos:&nbsp;</span>
              <span id="public-repos-left" class="public-repos value">${one.public_repos}</span>
          </div>
          <div class="stat">
              <span class="label">'Perfect' Repos:&nbsp;</span>
              <span id="perfect-repos-left" class="perfect-repos value">${one.perfect_repos}</span>
          </div>
          <div class="stat">
              <span class="label">Followers:&nbsp;</span>
              <span id="followers-left" class="followers value">${one.followers}</span>
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
              <span id="titles-right" class="titles value">${two.titles.join(' ')}</span>
          </div>
          <div class="stat">
              <span class="label">Favorite language:&nbsp;</span>
              <span class="favorite-language value">${two.favorite_language}</span>
          </div>
          <div class="stat">
              <span class="label">Total stars:&nbsp;</span>
              <span id="total-stars-right" class="total-stars value">${two.total_stars}</span>
          </div>
          <div class="stat">
              <span class="label">Highest star count:&nbsp;</span>
              <span class="most-starred value">${two.highest_starred}</span>
          </div>
          <div class="stat">
              <span class="label">Public repos:&nbsp;</span>
              <span id="public-repos-right" class="public-repos value">${two.public_repos}</span>
          </div>
          <div class="stat">
              <span class="label">'Perfect' Repos:&nbsp;</span>
              <span id="perfect-repos-right" class="favorite-language value">${two.perfect_repos}</span>
          </div>
          <div class="stat">
              <span class="label">Followers:&nbsp;</span>
              <span id="followers-right" class="followers value">${two.followers}</span>
          </div>
      </div>
</section>`

      $('.duel-container').html(`${leftHtml}\n${rightHtml}`)

      let winnerHTML = determineWinner(one, two) === one ? leftHtml : rightHtml

      setTimeout(() => $('.winner-container').html(winnerHTML), 3000)
    })
    .catch(err => {
      console.log(`Error getting data for ${userOne} and ${userTwo}`)
      console.log(err)

      let errorHtml = `<h1> One of the specified users doesn't exist! </h1>`

      $('.duel-container').html(errorHtml)
    })

  return false
})
