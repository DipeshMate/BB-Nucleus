import { useState } from "react";
import { useSnackbar } from "notistack";
import api from "../../api"; // Your Axios instance
import PasswordPopup from "./PasswordPopup";

const ResetPassword = ({ openPopup }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [showPopup, setShowPopup] = useState(false); // State to handle popup visibility


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await api.post("/Account/verify-email/", { email });
      enqueueSnackbar(response.data.message, { variant: "success" });
      setShowPopup(true); // Open password pop-up with email
    } catch (err) {
      setError(err.response?.data?.email || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
      </div>
      {showPopup && <PasswordPopup email={email} onClose={() => setShowPopup(false)} />}

    </div>
  );
};

export default ResetPassword;
