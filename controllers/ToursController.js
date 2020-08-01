const Tour = require('../models/tour');
const User = require('../models/user');

const getUser = async req => {
  const { user: email } = req.session.passport;
  return await User.findOne({email: email});
}

exports.tourTypes = async (req, res) => {
  try {
    const tourTypes = await Tour.tourTypes();
    res.status(200).json(tourTypes);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `Couldn't get the tour types.`, error});
  }
};

exports.index = async (req, res) => {
  try {
    const user = await getUser(req);

    const tours = await Tour
      .find({user: user._id})
      .populate('user')
      .sort({updatedAt: 'desc'});
    
    res.status(200).json(tours);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the tours.`, error});
  }
};

exports.show = async (req, res) => {
  try {
    const user = await getUser(req);

    const tour = await Tour
      .findOne({user: user._id, _id: req.params.id})
      .populate('user');
      
    if (!tour) throw new Error('Tour could not be found');
    
    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the tour.`, error});
  }
};

exports.create = async (req, res) => {
  try {
    const user = await getUser(req);

    const tour = await Tour.create({user: user._id, ...req.body});

    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in creating the tour.`, error});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);
    let tour = await Tour
      .findOne({user: user._id, _id: req.body.id});
    
    if (!tour) throw new Error('Tour could not be found');
    
    const attributes = {user: user._id, ...req.body};
    await Tour.validate(attributes);   

    await Tour.updateOne({_id: req.body.id, user: user._id}, {...req.body});

    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in updating the tour.`, error});
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await getUser(req);
    let tour = await Tour
      .findOne({user: user._id, _id: req.body.id});
      if (!tour) throw new Error('Tour could not be found');

    await Tour.deleteOne({_id: req.body.id, user: user._id});

    res.status(200).json({message: 'Tour was deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in deleting the tour.`, error});
  }
};
