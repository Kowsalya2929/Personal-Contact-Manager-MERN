import express from 'express'
import { deleteContact, getAllContact, patchContact, postContact } from '../controllers/contactController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/',getAllContact)
// router.get('/:id',getSingleContact)
router.post('/',postContact)
router.patch('/:id',patchContact)
router.delete('/:id',deleteContact)

export default router;