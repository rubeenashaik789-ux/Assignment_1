import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { useState } from "react";

function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+91",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      newErrors.email = "Valid email required";
    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "10 digit phone required";
    if (!form.country) newErrors.country = "Country required";
    if (!form.city) newErrors.city = "City required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan))
      newErrors.pan = "Invalid PAN";
    if (!/^\d{12}$/.test(form.aadhaar))
      newErrors.aadhaar = "Invalid Aadhaar";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/details", { state: form });
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    Object.values(form).every((v) => v);

  return (
    <div className="container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
            />
            {errors[key] && (
              <p className="error">{errors[key]}</p>
            )}
          </div>
        ))}

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

function DetailsPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="container">
      <h2>Submitted Details</h2>

      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
