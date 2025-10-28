import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(express.text({ type: "*/*" }));

app.post("/*", async (req, res) => {
  const target = "https://itechmarineapi.onrender.com" + req.path;
  console.log("[relay] →", target);
  try {
    const r = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": req.headers["x-device-id"] || "",
        "X-Signature": req.headers["x-signature"] || ""
      },
      body: req.body,
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Relay error");
  }
});

app.listen(80, () => console.log("HTTP relay aktif: port 80"));
