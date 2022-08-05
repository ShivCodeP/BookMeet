const signature = process.env.SIGN || "shivam"

const authenicateLogin = (req,res,next) => {
    // console.log(req.session.id)
    if (!req.session.isAuth) {
      res.redirect("/error");
    }
    else { 
      next()
    }
  }
  
  const authenicateDev = (req,res,next) => {
    // console.log(req.session)
    if (req.body.token === signature) {
      next();
    }
    else { 
      return res.redirect("/error");
    }
  }

  export {authenicateDev,authenicateLogin}