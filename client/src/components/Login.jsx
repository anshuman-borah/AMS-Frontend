import { useState } from "react";
import { Eye, EyeOff, Layers, Users, Shield } from "lucide-react";
import logo from "../assets/AMSlogo.png";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#021B34] to-[#0B2E4F] text-white items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* LOGO */}
          <div className="flex justify-center mb-16 -mt-20">
            <img
              src={logo}
              alt="AMS Logo"
              className="w-40 bg-white px-4 py-2 rounded-full"
            />
          </div>
          {/* TITLE */}
          <h1 className="text-3xl font-serif text-center mb-2">
            Anusandhan Management System
          </h1>
          {/* SUBTITLE */}
          <p className="text-gray-300 text-center mb-16">
            Research Management System
          </p>
          {/* FEATURES */}
          <div className="space-y-10 text-lg text-gray-200">
            <div className="flex items-center gap-4">
              <Layers size={28} />
              <p>Smart Research Workflow</p>
            </div>
            <div className="flex items-center gap-4">
              <Users size={28} />
              <p>Collaborative Review</p>
            </div>
            <div className="flex items-center gap-4">
              <Shield size={28} />
              <p>Similarity Detection</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F5F7FA] p-4 min-h-screen">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

          <h2 className="text-center text-gray-600 mb-6 text-lg font-semibold">
            Login to your account
          </h2>

          {/* EMAIL */}
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full mt-1 mb-4 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
          />

          {/* PASSWORD */}
          <div className="flex justify-between text-sm text-gray-500">
            <label>Password</label>
            <span className="text-blue-500 cursor-pointer">Forgot?</span>
          </div>

          <div className="relative mt-1 mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            />
            {showPassword ? (
              <EyeOff
                size={18}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                size={18}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login now
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't Have An Account?
            <span className="text-blue-500 ml-2 cursor-pointer">Sign Up</span>
          </p>

        </div>
      </div>
    </div>
  );
}