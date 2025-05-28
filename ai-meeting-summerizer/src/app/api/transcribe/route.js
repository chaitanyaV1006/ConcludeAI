import { NextResponse } from 'next/server';
import axios from 'axios';

const ASSEMBLY_API_KEY = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("audio");

  const buffer = Buffer.from(await file.arrayBuffer());

  // Step 1: Upload audio file to AssemblyAI
  const uploadRes = await axios.post("https://api.assemblyai.com/v2/upload", buffer, {
    headers: {
      "authorization": ASSEMBLY_API_KEY,
      "content-type": "application/octet-stream",
    },
  });

  const uploadUrl = uploadRes.data.upload_url;

  // Step 2: Start transcription
  const transcriptRes = await axios.post("https://api.assemblyai.com/v2/transcript", {
    audio_url: uploadUrl,
  }, {
    headers: {
      authorization: ASSEMBLY_API_KEY,
      "content-type": "application/json",
    },
  });

  return NextResponse.json({ id: transcriptRes.data.id });
}
