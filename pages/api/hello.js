// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
// config.js
export const API_BASE_URL = "https://api.ud-sandbox.com/resolve/domains/";
export const API_TOKEN = "umf1jhfeil4djfjlnp51e2ns-hok6o093gc4vztpa4ztodh5";
