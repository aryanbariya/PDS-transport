// import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// export function SignUp() {
//   const URL = import.meta.env.VITE_API_BACK_URL; // Use http, not https

//   const [formData, setFormData] = useState({
//     name: "",
//     surname: "",
//     phone_number: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({}); // Validation errors state

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
//   };

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Password validation function
//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let newErrors = {};

//     // Check if all fields are empty
//     if (
//       !formData.name.trim() &&
//       !formData.surname.trim() &&
//       !formData.phone_number.trim() &&
//       !formData.email.trim() &&
//       !formData.password.trim()
//     ) {
//       setErrors({ allFields: "All fields are required" });
//       return;
//     }

//     // Check each field individually
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.surname.trim()) newErrors.surname = "Surname is required";
//     if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = "Enter a valid email address (e.g., name@example.com)";
//     }
//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (!validatePassword(formData.password)) {
//       newErrors.password =
//         "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
//     }

//     // Stop form submission if errors exist
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const res = await axios.post(`${URL}/signup`, formData);
//       alert(res.data.message);
//       setFormData({ name: "", surname: "", phone_number: "", email: "", password: "" });
//       setErrors({}); // Clear errors after successful submission
//     } catch (err) {
//       alert("Error: " + (err.response?.data?.error || "Something went wrong"));
//     }
//   };

//   return (
//     <section className="m-8 flex flex-col lg:flex-row">
//       <div className="lg:w-2/5 h-full hidden lg:block">
//         <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
//       </div>
//       <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
//         <div className="text-center">
//           <Typography variant="h2" className="font-bold mb-4">
//             Join Us Today
//           </Typography>
//           <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
//             Enter your details to register.
//           </Typography>
//         </div>
//         <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-1/2 space-y-6">
//           {/* Show "All fields required" error */}
//           {errors.allFields && (<Typography variant="small" color="red" className="text-center">           {errors.allFields}         </Typography>)}

//           <div className="flex flex-col xl:flex-row gap-4 w-full">
//             <div className="flex flex-col w-full">
//               <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
//                 Name
//               </Typography>            <Input name="name" size="lg" placeholder="First Name" value={formData.name} onChange={handleChange} />
//               {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
//             </div>
//             <div className="flex flex-col w-full">
//               <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
//                 Surname
//               </Typography>
//               <Input name="surname" size="lg" placeholder="Last Name" value={formData.surname} onChange={handleChange} />
//               {errors.surname && <Typography variant="small" color="red">{errors.surname}</Typography>}
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
//               Phone Number
//             </Typography>
//             <Input name="phone_number" size="lg" type="tel" placeholder="Enter your phone number" value={formData.phone_number} onChange={handleChange} />
//             {errors.phone_number && <Typography variant="small" color="red">{errors.phone_number}</Typography>}
//           </div>
//           <div className="flex flex-col">
//             <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
//               Email
//             </Typography>
//             <Input name="email" size="lg" type="email" placeholder="name@mail.com" value={formData.email} onChange={handleChange} />
//             {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
//           </div>
//           <div className="flex flex-col">
//             <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
//               Password
//             </Typography>
//             <Input name="password" size="lg" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
//             {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
//           </div>
//           <Checkbox
//             label={
//               <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
//                 I agree to the&nbsp;
//                 <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
//                   Terms and Conditions
//                 </a>
//               </Typography>
//             }
//             containerProps={{ className: "-ml-2.5" }}
//           />
//           <Button type="submit" className="mt-6" fullWidth>
//             Register Now
//           </Button>
//           <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
//             Already have an account?
//             <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
//           </Typography>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default SignUp;




import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const URL = import.meta.env.VITE_API_BACK_URL;

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !surname || !phone || !email || !password) {
      toast.error("All fields are required");
      setErrors({ allFields: "Please fill in all fields" });
      return;
    }

    try {
      const response = await axios.post(`${URL}/signup`, {
        firstName,
        surname,
        phone,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration Successful!");
        navigate("/auth/sign-in");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 to-blue-900">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <Typography variant="h3" className="text-center text-blue-800 font-bold">
          Join Us Today
        </Typography>
        <Typography className="text-center text-gray-600 mb-6">
          Enter your details to register.
        </Typography>
        <form onSubmit={handleSignUp}>
          {errors.allFields && (
            <Typography variant="small" color="red" className="text-center">
              {errors.allFields}
            </Typography>
          )}
          <div className="mb-4">
            <Typography className="font-medium">First Name</Typography>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              className="border border-gray-300 rounded-lg p-3 w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Typography className="font-medium">Surname</Typography>
            <Input
              type="text"
              placeholder="Enter your surname"
              value={surname}
              className="border border-gray-300 rounded-lg p-3 w-full"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Typography className="font-medium">Phone Number</Typography>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              className="border border-gray-300 rounded-lg p-3 w-full"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Typography className="font-medium">Email</Typography>
            <Input
              type="email"
              placeholder="name@mail.com"
              value={email}
              className="border border-gray-300 rounded-lg p-3 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <Typography className="font-medium">Password</Typography>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                className="border border-gray-300 rounded-lg p-3 w-full pr-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <Checkbox label={<Typography>Remember me</Typography>} />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
          >
            Sign Up
          </Button>
          <Typography className="text-center text-gray-600 mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-blue-700 ml-1 hover:underline">
              Sign in
            </Link>
          </Typography>
        </form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
}

export default SignUp;
