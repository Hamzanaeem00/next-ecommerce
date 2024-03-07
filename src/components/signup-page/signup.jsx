/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/W2OIis2T3oo
 */
"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useState } from "react";

export function Signup() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(register);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!register.email || !register.username || !register.password) {
      setError("Provide All the Cred");
    } else {
      setError("");
      try {
        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
        });

        if (res.ok) {
          setPending(false);
          setRegister({ username: "", email: "", password: "" });
          console.log("User Registered");
          setSuccess("User Created Successfully");
        } else {
          const errorData = await res.json();
          setError(errorData.message);
          setPending(false);
        }
      } catch (error) {
        setPending(false);
        console.log("Something Went Wrong");
      }
    }
  };
  return (
    <div className="mx-auto max-w-sm p-6 rounded border mt-6 space-y-6">
      {error ? (
        <div className="text-white bg-red-300 p-1 rounded text-center">
          {error}
        </div>
      ) : success ? (
        <div className="text-white bg-green-300 p-1 rounded text-center">
          {success}
        </div>
      ) : (
        ""
      )}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          onChange={handleChange}
          id="name"
          name="username"
          placeholder="Hamza Naeem"
          required
          type="name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          onChange={handleChange}
          id="email"
          name="email"
          placeholder="m@example.com"
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={handleChange}
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full" type="submit">
        Sign Up
      </Button>
      <Separator className="my-8" />
      <Button className="w-full">Sign up with Google</Button>
      <div className="mt-4 text-center text-sm">
        Already have an account?
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
