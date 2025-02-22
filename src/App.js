import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
//import "@/components/ui/globals.css";
import axios from "axios";

export default function AuthApp() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      setUser({ email, token: response.data.token });
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          {user ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold">Welcome, {user.email}!</h2>
              <Button className="mt-4 w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-center">Login</h2>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-4"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Button className="mt-4 w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
