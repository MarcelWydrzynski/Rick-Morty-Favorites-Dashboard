import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { session, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    setServerError(null);

    const { email, password } = data;
    const { error } = await signIn(email, password);

    if (error) {
      setServerError(error);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (!authLoading && session) navigate("/dashboard");
  }, [session, authLoading, navigate]);

  if (authLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 border border-zinc-800">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
          </div>

         
          {serverError && <p className="text-sm text-red-400 border-zinc-800 rounded-lg p-2">{serverError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white font-medium disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
