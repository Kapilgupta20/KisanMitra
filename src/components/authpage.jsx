import React, { useState } from "react";
import LoginCmp from "./logincmp.jsx";
import RegisterCmp from "./registercmp.jsx";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full">
        {isLogin ? <LoginCmp /> : <RegisterCmp />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-center text-sm text-indigo-600 hover:underline"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
