import express from 'express'
import { getAuth, postSignIn, postSignUp } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/',authMiddleware,getAuth)
router.post('/signUp',postSignUp)
router.post('/signin',postSignIn)
// router.post('/logout',authMiddleware,postLogout)

export default router;