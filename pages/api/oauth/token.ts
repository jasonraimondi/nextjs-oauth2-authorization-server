export default function Token(req, res) {
  if (req.method.toLowerCase() !== "post") {
    res.status(400);
    res.send("unsupported method");
    return;
  }

  res.statusCode = 200;
  res.json({ name: "" });
}
