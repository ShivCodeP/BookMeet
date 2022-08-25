const signature = process.env.SIGN || "shivam"

const authenticateLogin = (req,res,next) => {
    // console.log(req.session.id)
    if (!req.session.isAuth) {
      res.redirect("/login");
    }
    else { 
      next()
    }
  }
  
  const authenticateDev = (req,res,next) => {
    // console.log(req.session)
    if (req.body.token === signature) {
      req.session.Dev = true;
      next();
    }
    else { 
      return res.redirect("/error");
    }
  }

  export {authenticateDev,authenticateLogin}