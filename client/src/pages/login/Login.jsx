import "./login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define a validation schema for the login form
const schema = yup.object({
  email: yup
    .string()
    .email("Email must be valid") // Validate email format
    .required("Email is required"), // Email is required
  password: yup.string().required("Password is required"), // Password is required
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); // Initialize form validation using the schema

  const [error, setError] = useState(null); // State to store login error

  const navigate = useNavigate(); // Access the navigation function from React Router

  const { login } = useContext(AuthContext); // Access login function from the AuthContext

  // Function to handle form submission
  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(user); // Call the login function from AuthContext
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      setError(error.response.data); // Set the error state if login fails
    }
  };

  // Function to clear the error state
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Study Buddy</h1>
          <p>
            Discover the Perfect Study Partner with Study Buddy – Elevate Your
            Learning, Together!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              onChange={clearError}
            />
            {errors.email && <p className="error">{errors.email?.message}</p>}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              onChange={clearError}
            />
            {errors.password && (
              <p className="error">{errors.password?.message}</p>
            )}
            {error && <p className="error">{error}</p>}
            <input type="submit" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
