const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  try {
    const { username, password, role = "user" } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ error: "Username already exists" }); // 409 Conflict
    }

    // Don't log sensitive information
    console.log("Registering user:", username, role);

    const user = new User({ username, password, role });
    const savedUser = await user.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).send({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle different error types
    if (error.name === "ValidationError") {
      return res.status(400).send({ error: error.message });
    }

    res.status(500).send({ error: "Internal server error" });
  }
}
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = generateAuthToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

function generateAuthToken(user) {
  return jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Add to User model
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = {
  register,
  login,
};
