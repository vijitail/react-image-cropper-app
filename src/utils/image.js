import axios from "axios";
import { IMGUR_CLIENT_ID, IMGUR_URL } from "../constants";

const headers = {
  Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
};

export const uploadImages = async (images) => {
  const requests = images.map((image) =>
    axios.post(
      IMGUR_URL,
      { image: image.src, description: image.name },
      { headers }
    )
  );
  try {
    const responses = await Promise.all(requests);
    const uploadedImages = responses.map(({ data: apiResponse }) => {
      const uploadedImage = apiResponse.data;
      return {
        name: uploadedImage.description,
        link: uploadedImage.link,
      };
    });

    return uploadedImages;
  } catch (err) {
    console.error(err.message);
    return { error: true };
  }
};
