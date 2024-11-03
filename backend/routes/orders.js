import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controller/orders.js'

const router = express.Router()

router.get('/', getAllOrders)

router.post('/create', createOrder)

router.get('/get/:id', getOrderById)

router.put('/update/:id', updateOrder)

router.delete('/del/:id', deleteOrder)

export default router