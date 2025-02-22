import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import axios from "axios";

export default function AuthApp() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setCart([]);
  };

  const products = [
    { id: 1, name: "Product A", price: 20 },
    { id: 2, name: "Product B", price: 35 },
    { id: 3, name: "Product C", price: 50 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handlePayment = () => {
    setShowPayment(true);
    setTimeout(() => {
      setShowPayment(false);
      setShowSuccess(true);
      setCart([]);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1000);
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

      {user && (
        <div className="mt-6 w-96">
          <h2 className="text-xl font-semibold">Products</h2>
          {products.map((product) => (
            <div key={product.id} className="flex justify-between p-2 border-b">
              <span>{product.name} - ${product.price}</span>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </div>
          ))}

          <h2 className="text-xl font-semibold mt-4">Cart</h2>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <div key={index} className="p-2 border-b">
                  {item.name} - ${item.price}
                </div>
              ))}
              <Button className="mt-4 w-full bg-green-500" onClick={handlePayment}>
                Pay Now
              </Button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Processing Payment...</h2>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold text-green-500">Payment Successful!</h2>
          </div>
        </div>
      )}
    </div>
  );
}
