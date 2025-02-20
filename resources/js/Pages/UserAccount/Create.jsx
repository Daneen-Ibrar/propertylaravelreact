import React from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const register = (e) => {
    e.preventDefault();
    post("/user-account/store"); // Backend route for registration
  };

  return (
    <form onSubmit={register} className="w-1/2 mx-auto">
      <div>
        <label htmlFor="name" className="label">Your Name</label>
        <input
          id="name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          type="text"
          className="input"
        />
        {errors.name && <div className="input-error">{errors.name}</div>}
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="label">E-mail</label>
        <input
          id="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          type="text"
          className="input"
        />
        {errors.email && <div className="input-error">{errors.email}</div>}
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          type="password"
          className="input"
        />
        {errors.password && <div className="input-error">{errors.password}</div>}
      </div>

      <div className="mt-4">
        <label htmlFor="password_confirmation" className="label">Confirm Password</label>
        <input
          id="password_confirmation"
          value={data.password_confirmation}
          onChange={(e) => setData("password_confirmation", e.target.value)}
          type="password"
          className="input"
        />
      </div>

      <div className="mt-4">
        <button className="btn-primary w-full" type="submit">
          Create Account
        </button>
        <div class="mt-2 text-center">
          <Link
            href="/login"
            class="text-sm text-gray-500"
          >
            Already have an account? Click here
          </Link>
        </div>
      </div>
    </form>
  );
}
