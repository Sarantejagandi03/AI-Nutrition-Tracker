import { Apple, LogIn } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { loginUser } from "../redux/authSlice.js";

const loginImage =
  "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80')";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((state) => state.auth);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginAttempt = await dispatch(loginUser(loginForm));

    if (loginUser.fulfilled.match(loginAttempt)) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className="grid min-h-screen bg-[#f7faf8] lg:grid-cols-[0.95fr_1.05fr]">
      <section
        className="hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage: loginImage
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
              <p className="text-sm text-slate-500">Welcome back</p>
            </div>
          </div>

          <form className="panel p-5" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-slate-950">Login</h1>

            <ErrorMessage message={error} className="mt-4" />

            <div className="mt-5 space-y-4">
              <label>
                <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
                <input
                      className="field"
                       type="email"
                        autoComplete="email"
                         value={loginForm.email}
                  onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, email: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span className="mb-1 block text-sm font-semibold text-slate-700">Password</span>
                <input
                 className="field"
                 type="password"
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, password: event.target.value }))}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn-primary mt-5 w-full" disabled={status === "loading"}>
              <LogIn size={17} />
              Login
            </button>

            <p className="mt-5 text-center text-sm text-slate-600">
              Need an account?{" "}
              <Link className="font-bold text-leaf hover:text-teal-800" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
