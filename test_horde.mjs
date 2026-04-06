async function testHorde() {
  console.log("Submitting to AI Horde...");
  try {
    const postRes = await fetch("https://aihorde.net/api/v2/generate/async", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "0000000000"
      },
      body: JSON.stringify({
        prompt: "a majestic mountain scenery",
        params: {
          n: 1,
          width: 512,
          height: 512
        }
      })
    });
    
    if (!postRes.ok) throw new Error("Failed to post");
    const postData = await postRes.json();
    console.log(postData);
    
    const id = postData.id;
    let done = false;
    while (!done) {
      console.log("Checking status...");
      await new Promise(r => setTimeout(r, 5000));
      const statusRes = await fetch(`https://aihorde.net/api/v2/generate/status/${id}`);
      const statusData = await statusRes.json();
      console.log(statusData.done, statusData.wait_time);
      if (statusData.done) {
        console.log("done! URL:", statusData.generations[0].img);
        done = true;
      }
    }
  } catch (e) {
    console.error(e);
  }
}
testHorde();
