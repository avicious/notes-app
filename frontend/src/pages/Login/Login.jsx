import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-300 rounded-2xl bg-ghost p-6">
          <form onSubmit={() => {}}>
            <h3 className="text-2xl mb-7">Login</h3>

            <input type="text" placeholder="Email" className="input-box" />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-accent underline cursor-pointer"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
