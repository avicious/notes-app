export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];

  if (!password) {
    return { isValid: false, errors: ["Password cannot be empty."] };
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    );
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
