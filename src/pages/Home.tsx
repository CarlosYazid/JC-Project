import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  // Get authentication status to determine redirection
  const { isAuthenticated } = useAuth();

  // Features array for the landing page
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Discover Places",
      description: "Explore unique destinations shared by travelers worldwide"
    },
    {
      icon: <Star className="w-8 h-8 text-secondary" />,
      title: "Rate & Review",
      description: "Share your experiences and help others plan their trips"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Stay Updated",
      description: "Follow the latest travel trends and hidden gems"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6">
          Share Your Travel Adventures
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and share amazing destinations around the world
        </p>
        {/* Redirect to dashboard if authenticated, otherwise to auth page */}
        <Link to={isAuthenticated ? "/dashboard" : "/auth"} className="btn btn-primary">
          {isAuthenticated ? "Go to Dashboard" : "Start Sharing"}
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="card p-6 text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
          alt="Travel Adventure"
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />
      </motion.div>
    </div>
  );
};

export default Home;