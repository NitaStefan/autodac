import { CAR_IMAGES_BUCKET_URL } from "../../../utils/constants";
import { imagePathFormat } from "../../../utils/format-utils";

export const postMessage = async (
  message: string,
  mediaIds: string[],
  pageAccessToken: string,
) => {
  const res = await fetch(
    `https://graph.facebook.com/v22.0/${process.env.FB_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        message,
        attached_media: mediaIds.map((mediaId) => ({ media_fbid: mediaId })),
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Error posting message on facebook:", data.error);
    throw new Error(data.error.message || "Failed to post message on facebook");
  }

  return data.id as string;
};

export const getPostLink = async (postId: string, pageAccessToken: string) => {
  const res = await fetch(
    `https://graph.facebook.com/${postId}?fields=permalink_url&access_token=${pageAccessToken}`,
  );

  const data = await res.json();

  return data.permalink_url as string;
};

export const uploadMediaImage = async (
  carId: number,
  index: number,
  version: number,
  pageAccessToken: string,
) => {
  const res = await fetch(
    `https://graph.facebook.com/v22.0/${process.env.FB_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        url: `${CAR_IMAGES_BUCKET_URL}${imagePathFormat(carId, index, version)}`,
        published: false,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Error uploading image to Facebook:", data.error);
    throw new Error(data.error.message || "Failed to upload image to Facebook");
  }

  return data.id as string;
};

export const deleteMedia = async (mediaId: string, pageAccessToken: string) => {
  const res = await fetch(`https://graph.facebook.com/v22.0/${mediaId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${pageAccessToken}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.error("Error deleting media from Facebook:", data.error);
    throw new Error(
      data.error.message || "Failed to delete media from Facebook",
    );
  }
};

export const deletePost = async (postId: string, pageAccessToken: string) => {
  const res = await fetch(`https://graph.facebook.com/v22.0/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${pageAccessToken}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.error("Error deleting Facebook post:", data.error);
    throw new Error(data.error.message || "Failed to delete Facebook post");
  }
};
