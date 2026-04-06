async function test() {
  const url = 'https://api.airforce/v1/imagine?prompt=make%20a%20sofa';
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type");
    console.log(res.status, contentType);
    if (contentType.includes("image")) {
        console.log("SUCCESS! WE FOUND AN IMAGE ENDPOINT!");
    } else {
        const text = await res.text();
        console.log(text.substring(0, 100)); // might be HTML redirect page
    }
  } catch (e) {
    console.log(e);
  }
}
test();
