const Query = require('../models/Query');

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

// Obtener las consultas del usuario autenticado
exports.getUserQueries = async (req, res) => {
    try {
        const queries = await Query.find({ user: req.user._id });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consultas del usuario' });
    }
};

// Obtener todas las consultas
exports.getQueries = async (req, res) => {
    try {
        const queries = await Query.find().populate('user', 'name email');
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consultas' });
    }
};

// Obtener una consulta específica por ID
exports.getQuery = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id).populate('user', 'name email');
        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }
        res.json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo consulta' });
    }
};

// Actualizar una consulta
exports.updateQuery = async (req, res) => {
    const { title, description, serviceType, date, time, phone, contactMethod } = req.body;

    try {
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        if (query.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No autorizado para actualizar esta consulta' });
        }

        // Solo actualizar los campos proporcionados
        if (title) query.title = title;
        if (description) query.description = description;
        if (serviceType) query.serviceType = serviceType;
        if (date) query.date = date;
        if (time) query.time = time;
        if (phone) query.phone = phone;
        if (contactMethod) query.contactMethod = contactMethod;

        await query.save();
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando consulta' });
    }
};

// Eliminar una consulta
exports.deleteQuery = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }

        if (query.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No autorizado para eliminar esta consulta' });
        }

        await query.remove();
        res.status(200).json({ message: 'Consulta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando consulta', error: error.message });
    }
};