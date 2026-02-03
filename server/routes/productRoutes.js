import express from 'express';
import products from '../data/products.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
    res.json(products);
});

// @desc    Fetch spotlight product
// @route   GET /api/products/spotlight
// @access  Public
router.get('/spotlight', (req, res) => {
    const product = products.find((p) => p.id === 1);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Spotlight product not found' });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

export default router;
