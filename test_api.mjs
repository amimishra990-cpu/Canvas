async function test() {
  const url = 'https://api.airforce/v1/imagine?prompt=make%20a%20sofa';
  try {
    const res = await fetch(url);
    console.log(res.status);
  } catch (e) {
    console.log(e);
  }
}
test();
