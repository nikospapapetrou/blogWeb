import { getSinglePost } from "@/lib/getSinglePost";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }) {
  const { data } = await getSinglePost(params.slug);
  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img
          src={`https://strapi.nikospap.blog${data[0].attributes.main_image.data.attributes.formats.thumbnail.url}`}
          alt={data[0].attributes.title}
        />
        <div tw="absolute flex bg-black opacity-50 inset-0 " />
        <div tw="absolute flex items-center top-2 w-full ">
          <p tw="text-white text-4xl flex font-bold m-5">
            {data[0].attributes.title}
          </p>
          <p tw="text-indigo-200 text-xl flex font-bold m-5">{`${data[0].attributes.admin_user.data.attributes.firstname} ${data[0].attributes.admin_user.data.attributes.lastname}`}</p>
          <p tw="text-purple-200 text-xl flex font-bold m-5">
            {data[0].attributes.updatedAt}
          </p>
        </div>
      </div>
    ),
    ...size
  );
}
