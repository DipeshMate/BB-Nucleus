import { useForm} from "react-hook-form";
import Six from "../../assets/Six.jpg";
import Victory from "../../assets/Victory.jpg";
import api from "../../api";
// import { toast } from "react-toastify";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
const SignupPage = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm();
  const password = watch("password")
  const navigate = useNavigate();
  const { enqueueSnackbar} = useSnackbar();

  const onSubmit = (data) => {
    api.post("/Account/registeruser/", data)
      .then((res) => {
        console.log('on registeration:', res.data);
        enqueueSnackbar("You have Successfully Created an Account!!", { variant: "success" });  
        // toast.success("You have Successfully Created an Account!!");
        reset();
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        if (err.response?.status === 400) {
          enqueueSnackbar("User already exist", { variant: "warning" });  
          // toast.error("User already exist");
          
        }
        const errorMsg = err.response?.data?.detail || "Registration failed. Please try again.";
        console.log(errorMsg);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Image */}
      <img
        src={Victory}
        alt="Left Side Illustration"
        className="hidden md:block w-1/3 h-auto object-cover"
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full md:w-2/3 flex flex-col gap-3"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">
            Sign Up Form
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account to get started!
          </p>
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300">First Name</label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            className="border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          />
          {errors.first_name && <small className="text-red-600">{errors.first_name.message}</small>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300">Last Name</label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required" })}
            className="border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          />
          {errors.last_name && <small className="text-red-600">{errors.last_name.message}</small>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
            })}
            className="border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          />
          {errors.email && <small className="text-red-600">{errors.email.message}</small>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            className="border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          />
          {errors.password && <small className="text-red-600">{errors.password.message}</small>}
        </div>

              {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            {...register("password2", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match",
            })}
            className="border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          />
          {errors.password2 && <small className="text-red-600">{errors.password2.message}</small>}
        </div>

        {/* Submit Button */}
        <button
          type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition-all">
          Sign Up
        </button>
               
            <p className="text-gray-800 text-sm mt-1">Already a User? <Link to={'/login'} className="text-blue-600 text-lg font-semibold  hover:underline ml-1 ">Login here</Link></p>
        
      </form>

      {/* Right Image */}
      <img
        src={Six}
        alt="Right Side Illustration"
        className="hidden md:block w-1/3 h-auto object-cover"
      />

    </div>
  );
};

export default SignupPage;
