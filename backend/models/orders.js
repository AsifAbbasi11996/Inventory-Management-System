import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productname: {
        type: [String],
        required: true
    },
    productbarcode: {
        type: [String],
        required: true
    },
    productbrand: {
        type: [String],
        required: true
    },
    productType: {
        type: [String],
        required: true
    },
    productsize: {
        type: [String],
        required: true
    },
    productprice: {
        type: [Number],
        required: true
    },
    productquantity: {
        type: [Number],
        required: true
    },
    paymentmode: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    orderdate: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 10);
            return currentDate;
        }
    },
    currentTimeStamp: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

export default Order