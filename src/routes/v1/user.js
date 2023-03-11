import express from 'express';

import authorize from '../../middlewares/authorization';

const router = express.Router();

/**
 * GET api/v1/user/me
 */
router.get('/me', authorize, (req, res) => res.send(req.user));

export default router;
