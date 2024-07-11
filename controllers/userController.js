const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const userId = req.user._id;  // ID extraído del token JWT en el middleware `protect`
  const { name, email, password } = req.body;

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        const salt = await bcrypt.genSalt(10); // Generar salt
            const hashedPassword = await bcrypt.hash(password, salt); // Hashear la nueva contraseña
            user.password = hashedPassword; // Asegúrate de que se asigna correctamente
        }

      await user.save();
      res.json({ message: "User updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
