import { json } from "@sveltejs/kit";

export const GET = async () => {
  const posts = [
    {"version": "0.0.1"}
  ];

  return json(posts)
};