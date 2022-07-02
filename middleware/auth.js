module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
    checkAuth: function(req, res, next){
      if(req.isAuthenticated()){
        res.redirect('/games')
      }else{
        return next()
      }
    }
  }