export default async function handler(req, res) {
  return res.status(200).json({
    reply: "AI backend connected successfully!"
  });
}
