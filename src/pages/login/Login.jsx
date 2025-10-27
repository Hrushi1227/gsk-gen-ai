import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block w-1/2">
        <img
          src="/login-art.jpg"
          alt="art"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="text-sm text-gray-600">Strategy AI - LTDF</div>
          <h1 className="text-4xl font-semibold text-gskOrange mb-4">
            Sign in
          </h1>

          <Button
            block
            type="default"
            size="large"
            onClick={() => navigate("/dashboard")}
            className="mb-6 bg-black text-white"
          >
            Sign in with SSO
          </Button>

          <div className="flex items-center text-xs text-gray-400 my-4">
            <div className="flex-1 border-t" />
            <div className="px-3">OR SIGN IN WITH LOCAL ACCOUNT</div>
            <div className="flex-1 border-t" />
          </div>

          <label className="text-sm">Username</label>
          <Input className="mb-3" />
          <label className="text-sm">Password</label>
          <Input.Password className="mb-4" />

          <Button block onClick={() => navigate("/dashboard")}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
