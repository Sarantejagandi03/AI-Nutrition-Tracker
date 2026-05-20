import { Apple, UserPlus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { registerUser } from "../redux/authSlice.js";

const registerImage =
  "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80')";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerAttempt = await dispatch(registerUser(registerForm));

    if (registerUser.fulfilled.match(registerAttempt)) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <main className="grid min-h-screen bg-[#f7faf8] lg:grid-cols-[0.95fr_1.05fr]">
      <section
        className="hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage: registerImage
        }}
      />

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-leaf text-white">
              <Apple size={24} />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-950">AI Nutrition Tracker</p>
              <p className="text-sm text-slate-500">Create your profile</p>
            </div>
          </div>

          <form className="panel p-5" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-slate-950">Register</h1>

            <ErrorMessage message={error} className="mt-4" />

            <div className="mt-5 space-y-4">
              <label>
                <span className="mb-1 block text-sm font-semibold text-slate-700">Name</span>
                <input
                  className="field"
                  value={registerForm.name}
                  onChange={(event) => setRegisterForm((currentForm) => ({ ...currentForm, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
                <input
                  className="field"
                  type="email"
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm((currentForm) => ({ ...currentForm, email: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  className="field"
                  type="password"
                  minLength="6"
                  value={registerForm.password}
                  onChange={(event) => setRegisterForm((currentForm) => ({ ...currentForm, password: event.target.value }))}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn-primary mt-5 w-full" disabled={status === "loading"}>
              <UserPlus size={17} />
              Register
            </button>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already registered?{" "}
              <Link className="font-bold text-leaf hover:text-teal-800" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
