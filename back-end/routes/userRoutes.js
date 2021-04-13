import express from 'express'
import {authUser, getUserProfile , getUsers, registerUser,updateUserProfile} from '../controllers/userController.js'
import {admin, protect} from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login',authUser)
router.route('/profile').get( protect ,getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser).get(protect,admin,getUsers)
export default router