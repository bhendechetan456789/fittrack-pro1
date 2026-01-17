const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer'); // Trainer model import

// GET all trainers (list)
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find(); // sab trainers DB se le lo
    res.json(trainers); // frontend ko bhej do
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST new trainer (add)
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newTrainer = new Trainer({ name, email, role });
    await newTrainer.save(); // DB mein save kar do
    res.status(201).json(newTrainer); // naya trainer return kar do
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE trainer (by ID)
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ msg: 'Trainer not found' });
    }
    res.json({ msg: 'Trainer deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT - Update trainer by ID (naya route)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body; // frontend se new data le lo

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id, // trainer ka ID URL se
      { name, email, role }, // jo change karna hai
      { new: true } // updated trainer return karo
    );

    if (!trainer) {
      return res.status(404).json({ msg: 'Trainer not found' });
    }

    res.json(trainer); // updated trainer frontend ko bhej do
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;