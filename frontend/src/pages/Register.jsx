function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3"
        />

        <button className="w-full rounded bg-green-600 p-3 text-white hover:bg-green-700">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
