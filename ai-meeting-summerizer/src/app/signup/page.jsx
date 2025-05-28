"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        profession,
        createdAt: new Date(),
      });

      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center px-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <Image
          src="/logo (2).png"
          alt="logo"
          width={250}
          height={100}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-extrabold text-blue-500 mb-6 drop-shadow-md">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profession"
          className="w-full mb-4 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 underline hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
