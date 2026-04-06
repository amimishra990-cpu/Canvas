import fs from 'fs';
import path from 'path';

async function testHuggingFace() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envFile = fs.readFileSync(envPath, 'utf8');
  const tokenMatch = envFile.match(/VITE_HF_API_TOKEN=(.+)/);
  const token = tokenMatch ? tokenMatch[1].trim() : null;

  if (!token) {
    console.log("No token found");
    return;
  }

  const models = [
    "runwayml/stable-diffusion-v1-5",
    "stabilityai/stable-diffusion-2-1",
    "prompthero/openjourney"
  ];

  for (const model of models) {
    console.log(`Testing ${model}...`);
    try {
        const response = await fetch(
            `https://router.huggingface.co/hf-inference/models/${model}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ inputs: "cat" }),
            }
        );
        const text = await response.text();
        console.log(`[${response.status}] ${text.substring(0, 100)}...`);
    } catch (e) {
        console.error(e.message);
    }
  }
}

testHuggingFace();
