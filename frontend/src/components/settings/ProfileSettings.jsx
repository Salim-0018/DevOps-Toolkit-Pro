import { useState } from "react";

function ProfileSettings() {

  const [profile, setProfile] = useState({
    name: "Salim Khan",
    email: "salim@example.com",
    phone: "",
    role: "DevOps Engineer",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("Profile Saved Successfully");
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-white">
          Profile Settings
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your personal information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-slate-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Role
          </label>

          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

      </div>

      <button
        onClick={saveProfile}
        className="rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
      >
        Save Profile
      </button>

    </div>
  );
}

export default ProfileSettings;
