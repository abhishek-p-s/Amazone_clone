import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModal.js";


const productRoute = express.Router()

productRoute.get('/', expressAsyncHandler(async(req, res) => {
    const product = await Product.find({})
    res.send(product)
}))

productRoute.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdProduct = await Product.insertMany(data.products)
    res.send({ createdProduct })
}))

productRoute.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

export default productRoute