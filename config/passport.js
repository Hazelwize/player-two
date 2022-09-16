const mongoose = require('mongoose')
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User')


module.exports = function(passport){
    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_REDIRECT_URL, //redirect URL
        scope: ['identify']
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('auth: ', profile)
        const newUser = {
          discordID: profile.id,
          username: `${profile.username}#${profile.discriminator}`,
          avatar: profile.avatar, 
        }

        try {
          let user = await User.findOne({ discordID: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } 
        catch (err) {
          console.error(err)
        }

      } 
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
