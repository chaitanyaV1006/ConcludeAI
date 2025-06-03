'use client';

import { useUser } from "@/hooks/useUser";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Home() {
  const { profile, isLoading } = useUser();
  const router = useRouter();
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [actionItems, setActionItems] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const getInitials = (name) => {
    if (!name) return "AI";
    const parts = name.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
  if (!audioFile) return alert("Please upload an audio file.");

  const formData = new FormData();
  formData.append("file", audioFile);

  const uploadRes = await fetch("/api/transcribe", {
    method: "POST",
    body: formData,
  });

  const uploadData = await uploadRes.json();
  setTranscript(uploadData.transcript);

  const gptRes = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript: uploadData.transcript }),
  });

  const result = await gptRes.json();
  setSummary(result.summary || "");
  setActionItems(result.action_items || []);
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-6 py-10 flex flex-col items-center relative">
      <div className="absolute top-6 right-6 z-10">
        {isLoading ? (
          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
        ) : profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  {profile.photoURL ? (
                    <AvatarImage src={profile.photoURL} alt={profile.displayName || profile.email || "User avatar"} />
                  ) : (
                    <AvatarFallback>{getInitials(profile.displayName || profile.email)}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile.displayName || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/login")} variant="ghost">Login</Button>
        )}
      </div>

      <div className="absolute mt-5 ml-3 top-0 left-0 p-4">
        <Image src="/logo (2).png" alt="logo" width={200} height={100} />
      </div>

      <div className="flex items-start mt-12 mb-10">
        <div className="text-center flex-1">
          <h1 className="text-5xl font-extrabold text-blue-500 drop-shadow-lg mb-2">ConcludeAI</h1>
          <p className="text-lg text-gray-300 tracking-wide">Smart Meeting Summarizer</p>
        </div>
      </div>

      <div className="w-full border-t border-white/20 mb-10"></div>

      <Card className="w-full max-w-xl mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md">
        <CardContent className="p-6">
          <label className="block mb-2 font-medium text-white">Upload Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="mb-4 text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />
          <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold">Submit</Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-xl mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-white">Transcript</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{transcript || "[Transcript will appear here]"}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-xl mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-white">Summary</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{summary || "[Summary will appear here]"}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-xl mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-white">Action Items</h2>
          <ul className="list-disc list-inside text-gray-300">
            {actionItems.length ? (
              actionItems.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>[Action Items will appear here]</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
