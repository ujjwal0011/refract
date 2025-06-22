import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Code2, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="relative hidden lg:flex items-center justify-center bg-black p-12 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

      <div className="relative z-20 max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPageLoading(false);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading || pageLoading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-slate-700 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-slate-700 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-slate-700 rounded-full"></div>
        </div>

        <div className="text-center space-y-8 z-10">
          {/* Logo/Brand Section */}
          <div className="space-y-4">
            <div className="relative">
              {/* Animated Logo Container */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-2 border-slate-800 rounded-xl"></div>
                <div
                  className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-xl animate-spin"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, #10b981, #06b6d4, #3b82f6, transparent)",
                    animation: "spin 3s linear infinite",
                  }}
                ></div>
                <div className="absolute inset-1 bg-black rounded-lg flex items-center justify-center">
                  <Code2 className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Brand Name */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-wider">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  REFRACT
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-600"></div>
                <span className="text-sm font-medium tracking-wide">
                  PLATFORM
                </span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-600"></div>
              </div>
            </div>
          </div>

          {/* Loading Section */}
          <div className="space-y-6">
            <p className="text-slate-300 font-medium">
              {pageLoading ? "Loading" : "Ready"}
            </p>

            {/* Progress Bar */}
            <div className="w-80 mx-auto space-y-2">
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Loading components</span>
                <span>{Math.round(Math.min(progress, 100))}%</span>
              </div>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden pt-16">
      <div className="h-full grid lg:grid-cols-2">
        {/* Left Column - AuthImagePattern */}
        <AuthImagePattern
          title="Transform Your Code Reviews"
          subtitle="Experience code reviews like never before with our entertaining AI characters"
        />

        {/* Right Column - Login Form */}
        <div className="relative flex items-center justify-center bg-black h-full p-12">
          {/* Back Button for Mobile */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute left-4 top-4 lg:hidden text-white hover:bg-gray-800 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-gray-400">
                Sign in to continue your code review journey
              </p>
            </div>

            <Card className="bg-gray-900/50 backdrop-blur border border-gray-700/50">
              <CardHeader className="space-y-2 pb-4">
                <CardTitle className="text-xl text-center text-white">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Continue with Google to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={login}
                  className="w-full bg-white text-black hover:bg-gray-100 font-medium h-12 cursor-pointer"
                  size="lg"
                  disabled={loading}
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loading ? "Signing in..." : "Continue with Google"}
                </Button>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <p className="text-sm font-medium text-center text-gray-300">
                    What you'll get:
                  </p>
                  <div className="grid grid-cols-2 gap-3 gap-x-35">
                    {[
                      "Free to use",
                      "Multiple languages",
                      "Fun characters",
                      "Review history",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-gray-300">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Character Preview */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "🦸", text: "Superhero" },
                { emoji: "🕵️", text: "Detective" },
                { emoji: "🏴‍☠️", text: "Pirate" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-3 text-center hover:bg-gray-800/50 bg-gray-900/30 border border-gray-700/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <p className="text-xs text-gray-400">{item.text}</p>
                </Card>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 leading-relaxed">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
