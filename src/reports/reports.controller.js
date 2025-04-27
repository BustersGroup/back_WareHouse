import Product from '../product/product.model.js'
import Movement from './movement.model.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'



const getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find();

    let totalStock = 0;
    let totalInventoryValue = 0;

    const productDetails = products.map(product => {
      totalStock += product.stock;
      totalInventoryValue += product.stock * product.price;

      return {
        productId: product._id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        value: product.stock * product.price
      }
    })

    return res.json({
      totalStock,
      totalInventoryValue,
      products: productDetails
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating inventory report' })
  }
}

const getMovementSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' })
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const movements = await Movement.find({
      date: { $gte: start, $lte: end } }).populate('product', 'name')

    const entries = movements.filter(m => m.type === 'entrada')
    const exits = movements.filter(m => m.type === 'salida')

    return res.json({
      period: { startDate, endDate },
      entries: entries.map(entry => ({
        id: entry._id,
        productId: entry.product._id,
        productName: entry.product.name,
        quantity: entry.quantity,
        date: entry.date,
        employee: entry.employee,
        motive: entry.motive,
        destination: entry.destination
      })),
      exits: exits.map(exit => ({
        id: exit._id,
        productId: exit.product._id,
        productName: exit.product.name,
        quantity: exit.quantity,
        date: exit.date,
        employee: exit.employee,
        motive: exit.motive,
        destination: exit.destination
      }))
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating movement summary' })
  }
}

