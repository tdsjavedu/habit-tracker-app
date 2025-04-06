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
  res.status(201).json(habit);
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


router.patch('/habits/markasdone/:id', async (req, res) => {

  try{
    const habits = await Habit.findById(req.params.id);

 // Check if the habit exists
 if (!habits) {
  return res.status(404).json({ message: 'Habit not found' });
}

    habits.lastDone = new Date();
    if(timeDifferenceInHours(habits.lastDone, habits.lastUpdate) < 24){
      habits.days = timeDifferenceInDays(habits.lastDone, habits.startedAt);
      habits.lastUpdate = new Date();
      await habits.save();
      res.status(200).json({ message: 'Habit Marked as done' });
    }else{
      habits.days = 1;
      habits.lastUpdate = new Date();
      await habits.save();
      res.status(200).json({ message: 'Habit Marked restarted' });
    }
    await habits.save();
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Habit not found'});
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return differenceMs / (1000 * 60 * 60);
}

const timeDifferenceInDays = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));

}

module.exports = router;
