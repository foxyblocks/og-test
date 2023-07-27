import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

/*
The following will work because it is a valid URL, but will only work locally because the root is hardcoded
*/
// const imgPromise = fetch(`http://localhost:8888/img.png`).then((file) =>
//   file.arrayBuffer()
// );

/*
But if we don't want to hardcode the URL, we can't use a relative url because it's not valid
And will throw the following error
`error: Uncaught (in promise) TypeError: Invalid URL: '/img.png'`
*/
// const relativeImgPromise = fetch(`/img.png`).then((file) => file.arrayBuffer());

/**
 * Maybe we can use Netlify.env.get('URL') to get the url. This works for the current project
 * but doesn't seem to work for a default next.js project that I've setup https://github.com/foxyblocks/netlify-edge-image-test/commit/214d6970c0d23b3806c2f42791fea1d430b60202
 * because in that repo the Netlify object isn't avalabile globally outside the function scope
 */

const BASE_URL = "http://localhost:8888" || Netlify.env.get("URL");
const envImgPromise = fetch(`${BASE_URL}/img.png`).then((file) =>
  file.arrayBuffer()
);

export default async function handler(req: Request) {
  const img = await envImgPromise;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 128,
          background: "lavender",
        }}
      >
        Hello!
        <img src={img} />
      </div>
    )
  );
}

export const config = {
  path: "/og",
};
