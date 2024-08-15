import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (username.trim().length === 0) {
      tempErrors.username = 'Username is required.';
      valid = false;
    }
    if (password.trim().length === 0) {
      tempErrors.password = 'Password is required.';
      valid = false;
    }
    if (confirmPassword.trim().length === 0) {
      tempErrors.confirmPassword = 'Confirm Password is required.';
      valid = false;
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('/api/register', { username, password });
        // Redirect to the login page after successful registration
        router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Registration failed. Please try again.');
      }
    }
  };

  const handleInputChange = (e, setValue, field) => {
    setValue(e.target.value);
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername, 'username')}
              className={`w-full px-4 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:border-gray-600`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword, 'password')}
              className={`w-full px-4 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:border-gray-600`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, setConfirmPassword, 'confirmPassword')}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:border-gray-600`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-gray-800 underline hover:text-gray-600">login</a>
        </p>
      </div>
    </div>
  );
}
