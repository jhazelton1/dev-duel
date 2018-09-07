import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token.js'
import validation from './validation'

export default () => {
  let router = Router()

  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /api/health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  const getUser = username => {
    return axios
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: token
        },
        responseType: 'json'
      })
      .then(({ data }) => data)
  }

  const getUserRepos = username => {
    return axios
      .get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: token
        },
        responseType: 'json'
      })
      .then(({ data }) => data)
  }

  const readMultipleUsers = arr =>
    arr.reduce((arr, c) => {
      let u = getUser(c)
      let r = getUserRepos(c)
      arr.push(u)
      arr.push(r)
      return arr
    }, [])

  const traverse = (user, repo) => {
    return {
      username: user.login,
      name: user.name,
      location: user.location,
      bio: user.bio,
      avatar: user.avatar_url,
      titles: getTitles(repo, user),
      favorite_language: getFavoriteLanguage(repo),
      public_repos: user.public_repos,
      total_stars: getStarGazerCount(repo),
      highest_starred: getHighestStarred(repo),
      perfect_repos: getOpenIssues(repo),
      followers: user.followers,
      following: user.following
    }
  }

  const isPopular = user => {
    return user.followers / 2 > user.following
  }

  const isStalker = user => {
    return user.following / 2 > user.followers
  }

  const isJackOfAllTrades = repo => {
    let set = new Set()
    for (let i of repo) {
      set.add(i.language)
    }
    return set.length >= 10
  }

  const isOneTrickPony = repo => {
    let language = repo[0].language
    return repo.every(l => l.language === language)
  }

  const isForker = repo => {
    let forkCount = repo.reduce((sum, c) => {
      if (c.fork) {
        sum += 1
      }
      return sum
    }, 0)

    return repo.length / 2 < forkCount
  }

  const getTitles = (repo, user) => {
    let titles = []
    if (isForker(repo)) {
      titles.push('Forker')
    }
    if (isOneTrickPony(repo)) {
      titles.push('One-Trick Pony')
    }
    if (isJackOfAllTrades(repo)) {
      titles.push('Jack of All Trades')
    }
    if (isStalker(user)) {
      titles.push('Stalker')
    }
    if (isPopular(user)) {
      titles.push('Mr. Popular')
    }

    return titles
  }

  const getFavoriteLanguage = repo => {
    let languageObject = repo.reduce((obj, c) => {
      obj.hasOwnProperty(c.language)
        ? (obj[c.language] += 1)
        : (obj[c.language] = 1)
      return obj
    }, {})
    let count = 0
    let language = ''
    for (let key in languageObject) {
      languageObject[key] > count
        ? ((count = languageObject[key]), (language = key))
        : (count = count)
    }
    return language
  }

  const getStarGazerCount = repo => {
    return repo.reduce((num, c) => (num += c.stargazers_count), 0)
  }

  const getOpenIssues = repo => {
    return repo.reduce((num, c) => (c.has_issues ? num : (num += 1)), 0)
  }

  const getHighestStarred = repo => {
    return repo.reduce(
      (num, c) =>
        (c.stargazers_count > num ? (num = c.stargazers_count) : (num = num)),
      0
    )
  }

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    const username = req.params.username
    Promise.all([
      getUser(username),
      getUserRepos(username)
    ]).then(([user, repo]) => {
      res.json(traverse(user, repo))
    })
  })

  /** GET /api/users?username - Get users */
  router.get('/users?', validate(validation.users), (req, res) => {
    const usernames = req.query.username
    Promise.all(
      readMultipleUsers(usernames)
    ).then(([user, repo, userTwo, repoTwo]) => {
      let arr = [traverse(user, repo), traverse(userTwo, repoTwo)]
      res.json(arr)
    })
  })

  return router
}
