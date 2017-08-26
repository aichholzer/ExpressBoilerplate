module.exports = {
  index: (req, res) => {
    res.render('home', {
      message: 'Hello and welcome to your new website!'
    });
  }
};
