import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../CSS/authCss/auth.css";
import { login } from "../Services/authService/login";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

function Login(){
const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      {/* 1. Background Elements (Animated Orbs) */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="auth-container-glass">
        {/* Left Side: Branding/Visual */}
        <div className="auth-visual">
          <div className="visual-content">
            <Globe className="visual-icon" size={50} />
            <h1>X-PLORE</h1>
            <p>The world is waiting for its next pioneer. Join the elite league of global explorers.</p>
          </div>
          <div className="visual-footer">
            <span>STRICTLY_SECURE_ENCRYPTION</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-section">
          <div className="form-header">
            <h2>{isLogin ? 'LOG_IN' : 'SIGN_UP'}</h2>
            <p>{isLogin ? 'Enter your credentials to deploy' : 'Register your explorer profile'}</p>
          </div>

          <form className="main-form" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="input-group">
                <User className="input-icon" size={18} />
                <input type="text" placeholder="FULL_NAME" required />
              </div>
            )}
            
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input type="email" placeholder="EMAIL_ADDRESS" required />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input type="password" placeholder="PASSWORD" required />
            </div>

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'INITIATE_LOGIN' : 'START_EXPEDITION'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="form-footer">
            <p>
              {isLogin ? "Don't have an ID?" : "Already registered?"}
              <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                {isLogin ? 'REGISTER_NOW' : 'GO_TO_LOGIN'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;