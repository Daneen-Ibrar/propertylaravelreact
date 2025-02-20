import { useForm, Link } from "@inertiajs/react";

export default function Login() {
  const form = useForm({
    email: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault(); // Prevent default form submission
    form.post("/login"); // Replace with your actual login URL
  };

  return (
    <div>
      <form onSubmit={login} className="w-1/2 mx-auto">
        <div>
          <label htmlFor="email" className="label">
            E-mail (username)
          </label>
          <input
            id="email"
            type="text"
            className="input"
            value={form.data.email}
            onChange={(e) => form.setData("email", e.target.value)}
          />
          {form.errors.email && (
            <div className="input-error">{form.errors.email}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
          />
          {form.errors.password && (
            <div className="input-error">{form.errors.password}</div>
          )}
        </div>
        <div className="mt-4">
          <button className="btn-primary w-full" type="submit">
            Login
          </button>
          <div class="mt-2 text-center">
          <Link href="/user-account/create" class="text-sm text-gray-500">
            Need an account? Click here
          </Link>
        </div>
        </div>
      </form>
    </div>
  );
}
