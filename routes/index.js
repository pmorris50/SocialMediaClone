const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong Route, Stop wasting my Time!'));

module.exports = router;


