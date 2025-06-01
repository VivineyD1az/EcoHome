import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitchToRegister={handleSwitch} />
      ) : (
        <Register onSwitchToLogin={handleSwitch} />
      )}
    </div>
  );
};

export default AuthPage;