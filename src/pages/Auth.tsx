import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const user = await authAPI.login(formData.email, formData.password);
        login(user);
        navigate('/dashboard');
      } else {
        if (!validateUsername(formData.username)) {
          alert('Username can only contain letters, numbers, and underscores.');
          return;
        }

        const newUser = {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          createdAt: new Date().toISOString(),
          favorites: [],
          following: [],
          followers: []
        };
        
        const user = await authAPI.register(newUser);
        login(user);
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto card p-8"
      >
        <div className="flex justify-center mb-6">
          {isLogin ? (
            <LogIn className="w-12 h-12 text-primary" />
          ) : (
            <User className="w-12 h-12 text-primary" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="input"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  pattern="^[a-zA-Z0-9_]+$"
                  title="Username can only contain letters, numbers, and underscores"
                  required
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {isLogin ? 'Email or Username' : 'Email'}
            </label>
            <input
              type={isLogin ? "text" : "email"}
              className="input"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="input"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', username: '', email: '', password: '' });
            }}
            className="text-primary font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;