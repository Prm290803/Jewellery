const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
// Quotation Schema with soft delete
const quotationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  staffName: { type: String, default: '' },
  quotationNote: { type: String, default: '' },
  metal: { type: String, required: true },
  karat: { type: String, required: true },
  weight: { type: String, required: true },
  rate: { type: String, required: true },
  labourType: { type: String, required: true },
  labourValue: { type: String, required: true },
  stone: { type: String, default: '0' },
  hallmark: { type: String, default: '0' },
  discount: { type: String, default: '0' },
  gst: { type: Number, required: true },
  metalValue: { type: Number, required: true },
  labour: { type: Number, required: true },
  stoneCost: { type: Number, default: 0 },
  hallmarkCost: { type: Number, default: 0 },
  otherCharges: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  gstAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Soft delete fields
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: '' }
});

// Index for efficient querying of deleted records
quotationSchema.index({ isDeleted: 1, deletedAt: 1 });

const Quotation = mongoose.model('Quotation', quotationSchema);

// ============ ROUTES ============

// Get all active quotations (not deleted)
app.get('/api/quotations', async (req, res) => {
  try {
    const quotations = await Quotation.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get deleted quotations (recycle bin)
app.get('/api/quotations/deleted', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const quotations = await Quotation.find({ 
      isDeleted: true,
      deletedAt: { $gte: sevenDaysAgo }
    }).sort({ deletedAt: -1 });
    
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single quotation by ID (including deleted ones)
app.get('/api/quotations/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findOne({ id: req.params.id });
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new quotation
app.post('/api/quotations', async (req, res) => {
  try {
    const quotationData = req.body;
    
    // Check if quotation with same ID exists
    const existingQuotation = await Quotation.findOne({ id: quotationData.id });
    if (existingQuotation) {
      return res.status(400).json({ error: 'Quotation ID already exists' });
    }

    const quotation = new Quotation(quotationData);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quotation
app.put('/api/quotations/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft delete quotation (move to recycle bin)
app.delete('/api/quotations/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndUpdate(
      { id: req.params.id },
      { 
        isDeleted: true, 
        deletedAt: new Date(),
        deletedBy: req.query.staffName || 'System'
      },
      { new: true }
    );
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json({ 
      message: 'Quotation moved to recycle bin', 
      quotation,
      willBePermanentlyDeleted: 'This record will be permanently deleted after 7 days'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Restore quotation from recycle bin
app.post('/api/quotations/:id/restore', async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndUpdate(
      { id: req.params.id },
      { 
        isDeleted: false, 
        deletedAt: null,
        deletedBy: ''
      },
      { new: true }
    );
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json({ message: 'Quotation restored successfully', quotation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Permanently delete quotation (hard delete)
app.delete('/api/quotations/:id/permanent', async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndDelete({ id: req.params.id });
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json({ message: 'Quotation permanently deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clean up deleted records older than 7 days (cron job endpoint)
app.delete('/api/quotations/cleanup', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const result = await Quotation.deleteMany({
      isDeleted: true,
      deletedAt: { $lt: sevenDaysAgo }
    });
    
    res.json({ 
      message: `Cleaned up ${result.deletedCount} records older than 7 days`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get count of deleted quotations (for badge)
app.get('/api/quotations/deleted/count', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const count = await Quotation.countDocuments({
      isDeleted: true,
      deletedAt: { $gte: sevenDaysAgo }
    });
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});