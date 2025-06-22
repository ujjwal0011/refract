"use client";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard, History, Code2 } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loading, login, logout } = useAuth();
  const isAuthenticated = !!user;

  const handleLogin = () => {
    login();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <nav className="bg-black border-b border-white/10 backdrop-blur-md fixed top-0 left-0 right-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-br from-white to-white/80 rounded-lg flex items-center justify-center shadow-lg shadow-white/20 group-hover:shadow-white/30 transition-all duration-300">
                  <Code2 className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                  Refract
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </nav>
    );
  }

  return (
    <nav className="bg-transparent border-b border-white/10 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-white/80 rounded-lg flex items-center justify-center shadow-lg shadow-white/20 group-hover:shadow-white/30 transition-all duration-300">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                Refract
              </span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleLogin}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm hover:shadow-lg hover:shadow-white/5 transition-all duration-300 h-9 cursor-pointer"
                >
                  <span className="w-4 h-4 mr-2">🔐</span>
                  Login with Google
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                {/* Dashboard Link */}
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer h-9 px-3"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>

                {/* History Link */}
                <Button
                  onClick={() => navigate("/history")}
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer h-9 px-3"
                >
                  <History className="w-4 h-4 mr-2" />
                  Archive
                </Button>

                {/* User Avatar and Name */}
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Avatar className="w-7 h-7 border border-white/20">
                    <AvatarImage
                      src={user?.picture || user?.avatar}
                      alt={user?.name || user?.displayName}
                    />
                    <AvatarFallback className="bg-white/10 text-white text-xs">
                      {getInitials(user?.name || user?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-white/90 max-w-32 truncate">
                    {user?.name || user?.displayName || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all duration-300 cursor-pointer h-9 px-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
}
