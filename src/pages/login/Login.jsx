import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      message.success("Login successful!");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="flex h-screen">
      {/* Left Illustration */}
      <div className="hidden lg:block w-1/2">
        <img
          src="/login-art.jpg"
          alt="art"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="text-sm text-gray-600">Strategy AI - LTDF</div>
          <h1 className="text-4xl font-semibold text-gskOrange mb-4">
            Sign in
          </h1>

          {/* SSO Login */}
          <Button
            block
            type="default"
            size="large"
            onClick={() => navigate("/dashboard")}
            className="mb-6 bg-black text-white"
          >
            Sign in with SSO
          </Button>

          {/* Divider */}
          <div className="flex items-center text-xs text-gray-400 my-4">
            <div className="flex-1 border-t" />
            <div className="px-3">OR SIGN IN WITH LOCAL ACCOUNT</div>
            <div className="flex-1 border-t" />
          </div>

          {/* Username */}
          <label className="text-sm">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`mb-1 ${errors.username ? "border-red-500" : ""}`}
            placeholder="Enter username"
          />
          {errors.username && (
            <div className="text-xs text-red-500 mb-2">{errors.username}</div>
          )}

          {/* Password */}
          <label className="text-sm">Password</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-1 ${errors.password ? "border-red-500" : ""}`}
            placeholder="Enter password"
          />
          {errors.password && (
            <div className="text-xs text-red-500 mb-2">{errors.password}</div>
          )}

          {/* Sign in button */}
          <Button
            block
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!username.trim() || !password.trim()}
            className="bg-gskOrange hover:brightness-95 mt-2"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
