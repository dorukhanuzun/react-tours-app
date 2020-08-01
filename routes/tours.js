const { index, show, create, update, delete: _delete, tourTypes } = require('../controllers/ToursController');

module.exports = router => {
  router.get('/tours/tourTypes', tourTypes);
  router.get('/tours', index);
  router.get('/tours/:id', show);
  router.post('/tours', create);
  router.post('/tours/update', update);
  router.post('/tours/delete', _delete);
};