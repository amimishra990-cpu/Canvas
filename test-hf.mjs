

async function test() {
  console.log("Starting fetch...");
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer undefined"
        },
        body: JSON.stringify({ inputs: "cat" }),
      }
    );
    console.log("Status:", response.status);
    const type = response.headers.get('content-type');
    console.log("Content-Type:", type);
    
    if (type && type.includes('json')) {
        const text = await response.text();
        console.log("Body:", text);
    } else {
        const blob = await response.blob();
        console.log("Blob size:", blob.size);
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

test();
