function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="mb-6 w-full rounded border p-3"
        />

        <button className="w-full rounded bg-orange-500 p-3 text-white hover:bg-orange-600">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
