const Query = require('../models/Query');

exports.getQueries = async (req, res) => {
  const queries = await Query.find({});
  res.json(queries);
};

exports.getQuery = async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (!query) {
    return res.status(404).json({ message: 'Query not found' });
  }
  res.json(query);
};

exports.createQuery = async (req, res) => {
  const { title, description, serviceType, date, time, phone, contactMethod } = req.body;
  const newQuery = new Query({
    title, description, serviceType, date, time, phone, contactMethod, user: req.user._id
  });
  try {
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    // Actualiza solo los campos que se pasen en la solicitud
    for (let prop in req.body) if (req.body[prop]) query[prop] = req.body[prop];
    const updatedQuery = await query.save();
    res.json(updatedQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Query not found' });
  }
};
