var express = require('express');
const Habit = require('../models/Habit');
var router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authenticateToken = (req, res, next) => {
 const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {	
    return res.Status(401).json({ message: 'Acceso Denegado. Token no proporcionado' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
}catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Token no valido o expirado' });
  }
   // if (err) { 
    //  return res.Status(403).json({ error: 'Token no valido o expirado' });
   // }

   // req.user = user;
   // next();
 // });
  // const token = req.headers['authorization'];
};

//const authenticateToken = (req, res, next) => {
//  const token = req.headers['authorization'];
 // if(!token){
 //   return res.sendStatus(401).json({ message: 'Acceso Denegado. Token no proporcionado' });
 // }
//  try{
 //   const tokenWithoutBearer = token.replace("Bearer ","");
 //   const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
//    req.user = verified;
 //   next(); 
 // }catch(error){
 //   console.error(error);
 //   res.status(403).json({ error: 'Token no valido o expirado' });
 // }
//}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});
router.get('/habits', authenticateToken, async (req, res) => {
try {
  if (!req.user || !req.user.userId) {
    return res.status(500).json({ message: 'User ID not found in token' });
  }

  const habits = await Habit.find({ userId: new mongoose.Types.ObjectId(req.user.userId) });
  return res.status(200).json(habits);
} catch (err) {
  console.error(err);
  return res.status(500).json({ message: 'Error retrieving habits' });
}

 // try {
   // let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: 'Error retrieving habits' });
    //const habits = await Habit.find({ 'userId': new mongoose.Types.ObjectId(userId) });
    //res.status(200).json(habits);
  //} catch (err) {
  //  res.status(500).json({ message: 'Error retrieving habits' });
 // }
 
});
router.post('/habits', authenticateToken, async (req, res) => {
  
  try {
    const { title, description } = req.body;
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const newHabit = new Habit({
      title,
      description,
      userId: new mongoose.Types.ObjectId(req.user.userId),
    });
    await newHabit.save();
    return res.status(201).json(newHabit);
  } catch (err) {
    console.error(err);
    console.log("Decoded user from token:", req.user);
    return res.status(500).json({ message: 'Error creating habit' });
    
  }
  
  
  //try{
 // const {title, description} = req.body;
 // let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: 'Error adding habits' });
 // userId = new mongoose.Types.ObjectId(userId);
 // const habit = new Habit({ title, description, userId });
 // await habit.save();
 // res.status(201).json(habit);
 // }catch(err){
 //   res.status.apply(400).json({ message: 'Error Creating Habit' });
 // }
});


router.delete('/habits/:id', authenticateToken, async (req, res) => {
  try{
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit Deleted' });
  }catch(err){
    res.status(500).json({ message: 'Habit not found'});
  }
})


router.patch('/habits/markasdone/:id', authenticateToken, async (req, res) => {

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
      return res.status(200).json({ message: 'Habit Marked as done' });
    }else{
      habits.days = 1;
      habits.lastUpdate = new Date();
      await habits.save();
      return res.status(200).json({ message: 'Habit Marked restarted' });
    }
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
