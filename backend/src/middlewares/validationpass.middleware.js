const validatePassword = (req, res, next) => {
  const { password } = req.body;

  // Regex untuk validasi
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.'
    });
  }

  next();
};

module.exports = validatePassword;
