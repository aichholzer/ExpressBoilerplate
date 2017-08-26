module.exports = (router, controller) => {
  router.get('/', controller.index);
  return router;
};
