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
      const queryId = req.params.id;
      const updatedData = {};

      // Solo agregar campos que no estén undefined
      if (req.body.status) updatedData.status = req.body.status;

      const query = await Query.findByIdAndUpdate(queryId, updatedData, { new: true });

      if (!query) {
          return res.status(404).json({ message: 'Consulta no encontrada' });
      }

      res.json(query);
  } catch (error) {
      console.error('Error actualizando consulta:', error);
      res.status(500).json({ message: 'Error actualizando consulta' });
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


exports.getUserQueries = async (req, res) => {
  try {
      const userId = req.user._id;  // req.user debería estar disponible gracias al middleware 'protect'
      const userQueries = await Query.find({ user: userId });
      res.json(userQueries);
  } catch (error) {
      console.error('Failed to fetch user queries:', error);
      res.status(500).json({ message: 'Error fetching user queries' });
  }
};
