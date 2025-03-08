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




import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export function SignUp() {
  const URL = import.meta.env.VITE_API_BACK_URL; // Use http, not https

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Validation errors state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Check if all fields are empty
    if (
      !formData.name.trim() &&
      !formData.surname.trim() &&
      !formData.phone_number.trim() &&
      !formData.email.trim() &&
      !formData.password.trim()
    ) {
      setErrors({ allFields: "All fields are required" });
      return;
    }

    // Check each field individually
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address (e.g., name@example.com)";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Stop form submission if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post(`${URL}/signup`, formData);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({ name: "", surname: "", phone_number: "", email: "", password: "" });
      setErrors({}); // Clear errors after successful submission
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <section className="m-8 flex flex-col lg:flex-row">
      <div className="lg:w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to register.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-1/2 space-y-6">
          {/* Show "All fields required" error */}
          {errors.allFields && (
            <Typography variant="small" color="red" className="text-center">
              {errors.allFields}
            </Typography>
          )}

          <div className="flex flex-col xl:flex-row gap-4 w-full">
            <div className="flex flex-col w-full">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Name
              </Typography>
              <Input
                name="name"
                size="lg"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
            </div>
            <div className="flex flex-col w-full">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Surname
              </Typography>
              <Input
                name="surname"
                size="lg"
                placeholder="Last Name"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && <Typography variant="small" color="red">{errors.surname}</Typography>}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Phone Number
            </Typography>
            <Input
              name="phone_number"
              size="lg"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && <Typography variant="small" color="red">{errors.phone_number}</Typography>}
          </div>
          <div className="flex flex-col">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Email
            </Typography>
            <Input
              name="email"
              size="lg"
              type="email"
              placeholder="name@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
          </div>
          <div className="flex flex-col">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              size="lg"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
          </div>
          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
