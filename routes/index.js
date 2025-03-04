var express = require('express');
const Habit = require('../models/Habit');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/habits', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});
router.post('/habits', async (req, res) => {
  try{
  const {title, description} = req.body;
  const habit = new Habit({ title, description });
  await habit.save();
  res.json(habit);
  }catch(err){
    res.status.apply(400).json({ message: 'Error Creating Habit' });
  }
});
router.delete('/habits/:id', async (req, res) => {
  try{
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit Deleted' });
  }catch(err){
    res.status(500).json({ message: 'Habit not found'});
  }
})



module.exports = router;
