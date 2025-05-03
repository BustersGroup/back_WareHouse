import Product from '../product/product.model.js';
import MovementEntry from '../movements/movementEntry.model.js';
import MovementExit from '../movements/movementExit.model.js';

export const getInventoryReport = async (req, res) => {
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
      };
    });

    return res.json({
      totalStock,
      totalInventoryValue,
      products: productDetails
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating inventory report' });
  }
};

export const getMovementSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const entries = await MovementEntry.find({
      date: { $gte: start, $lte: end }
    })
    .populate('product', 'name')
    .populate('employee', 'name');

    const exits = await MovementExit.find({
      date: { $gte: start, $lte: end }
    })
    .populate('product', 'name')
    .populate('employee', 'name')
    .populate('client', 'name');

    return res.json({
      period: { startDate, endDate },
      entries: entries.map(entry => ({
        id: entry._id,
        productId: entry.product._id,
        productName: entry.product.name,
        quantity: entry.quantity,
        date: entry.date,
        employeeName: entry.employee.name,
        motive: entry.motive
      })),
      exits: exits.map(exit => ({
        id: exit._id,
        productId: exit.product._id,
        productName: exit.product.name,
        quantity: exit.quantity,
        date: exit.date,
        employeeName: exit.employee.name,
        clientName: exit.client.name,
        motive: exit.motive
      }))
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating movement summary' });
  }
};
