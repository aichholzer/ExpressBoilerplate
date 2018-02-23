module.exports = (router, controller) => {
  router.route('/users/:user?')
    .get(controller.read)
    .post(controller.create)
    .delete(controller.delete);

  return router;
};
