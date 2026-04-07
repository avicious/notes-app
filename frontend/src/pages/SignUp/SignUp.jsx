import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail, validatePassword } from "../../utils/helper";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const validate = validatePassword(password);

    if (!validate.isValid) {
      setError(validate.errors[0]);
      return;
    }

    setError("");

    //Signup
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border border-gray-200 rounded-2xl bg-ghost p-6">
          <form onSubmit={handleSignUp}>
            <h3 className="text-2xl mb-7">Sign Up</h3>

            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-accent underline hover:decoration-none cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
