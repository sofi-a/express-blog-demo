import express from 'express';

const router = express.Router();

/**
 *
 * GET api/v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET api/v1/auth
 */
router.use('/auth', require('./auth').default);

/**
 * GET api/v1/user
 */
router.use('/user', require('./user').default);

export default router;
