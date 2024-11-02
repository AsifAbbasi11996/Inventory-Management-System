import express from 'express'
import { createUser, getAllUsers, getUserById, deleteUserById, updateUserById, loginUser, resetPassword, forgotPassword, fetchRoles } from '../controller/user.js'

const router = express.Router()

router.post('/create', createUser)
router.get('/', getAllUsers)
router.get('/roles', fetchRoles)
router.get('/get/:id', getUserById)
router.delete('/del/:id', deleteUserById)
router.put('/update/:id', updateUserById)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.put('reset-password', resetPassword)

export default router