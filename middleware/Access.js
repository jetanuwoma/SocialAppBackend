
class Access {

static init(req, res, next) {
  req.secret = process.env.SECRET;
  next()
}

}

export default Access;