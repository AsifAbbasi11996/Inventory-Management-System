import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getOrderById, getTotalOrdersByDate, getTotalOrdersLastMonth, getTotalOrdersLastWeek, getTotalOrdersLastYear, getTotalOrdersToday, getTotalOrdersYesterday, updateOrder } from '../controller/orders.js'

const router = express.Router()

router.get('/', getAllOrders)

router.post('/create', createOrder)

router.get('/get/:id', getOrderById)

router.put('/update/:id', updateOrder)

router.delete('/del/:id', deleteOrder)

router.get('/today', getTotalOrdersToday)
router.get('/yesterday', getTotalOrdersYesterday)
router.get('/lastweek', getTotalOrdersLastWeek)
router.get('/lastmonth', getTotalOrdersLastMonth)
router.get('/lastyear', getTotalOrdersLastYear)
router.get('/:date', getTotalOrdersByDate)

export default router