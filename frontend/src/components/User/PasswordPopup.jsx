import { useState } from "react";
import { useSnackbar } from "notistack";
import api from "../../api"; // Your API instance
import { useNavigate } from "react-router-dom"; // For redirect


const PasswordPopup = ({ email, onClose }) => {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize navigation

  const validateForm = () => {
    let newErrors = {};
    if (!formData.newPassword || formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post("/Account/set-new-password/", {
        email,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      });
      
      enqueueSnackbar(response.data.message, { variant: "success" });
        onClose(); // Close popup and redirect
        navigate('/login');
    } catch (err) {
      setErrors(err.response?.data || { general: "Something went wrong" });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Set New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label>New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;
