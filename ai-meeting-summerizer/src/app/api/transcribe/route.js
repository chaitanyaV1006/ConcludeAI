import { NextResponse } from 'next/server';
import axios from 'axios';

const ASSEMBLY_API_KEY = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());

  // Step 1: Upload audio
  const uploadRes = await axios.post("https://api.assemblyai.com/v2/upload", buffer, {
    headers: {
      authorization: ASSEMBLY_API_KEY,
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

  const transcriptId = transcriptRes.data.id;

  // Step 3: Poll until transcription completes
  let status = "processing";
  let transcriptData = null;

  while (status === "queued" || status === "processing") {
    await new Promise(res => setTimeout(res, 3000)); // wait 3 seconds
    const pollingRes = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: { authorization: ASSEMBLY_API_KEY },
    });
    status = pollingRes.data.status;
    transcriptData = pollingRes.data;
  }

  if (status === "completed") {
    return NextResponse.json({ transcript: transcriptData.text });
  } else {
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
