const Query = require('../models/Query');

// Obtener todas las consultas
exports.getQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consultas' });
    }
};

// Obtener una consulta por ID
exports.getQuery = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }
        res.json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consulta' });
    }
};

// Crear una nueva consulta
exports.createQuery = async (req, res) => {
    const { title, description, serviceType, date, time, phone, contactMethod } = req.body;

    try {
        const query = new Query({
            title,
            description,
            serviceType,
            date,
            time,
            phone,
            contactMethod,
            status: 'pending',
            user: req.user._id
        });

        await query.save();

        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error creando consulta' });
    }
};

// Actualizar una consulta
exports.updateQuery = async (req, res) => {
    const { title, description, serviceType, date, time, phone, contactMethod, status } = req.body;

    try {
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        query.title = title || query.title;
        query.description = description || query.description;
        query.serviceType = serviceType || query.serviceType;
        query.date = date || query.date;
        query.time = time || query.time;
        query.phone = phone || query.phone;
        query.contactMethod = contactMethod || query.contactMethod;
        query.status = status || query.status;

        await query.save();

        res.json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando consulta' });
    }
};

// Eliminar una consulta
exports.deleteQuery = async (req, res) => {
    try {
        const query = await Query.findByIdAndDelete(req.params.id);

        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        res.json({ message: 'Consulta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando consulta' });
    }
};

// Obtener consultas del usuario logueado
exports.getUserQueries = async (req, res) => {
    try {
        const queries = await Query.find({ user: req.user._id });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consultas' });
    }
};
