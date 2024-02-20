import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 2225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${userName}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const res = await axios.get(url, options);
    const $ = cheerio.load(res.data);
    const title = $("#productTitle").text().trim();
    console.log(title);
  } catch (error: any) {
    throw new Error(error);
  }
}
