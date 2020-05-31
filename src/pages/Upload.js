import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ImageCropper from "../components/ImageCropper";
import ImageUploader from "../components/ImageUploader";

import { IMAGE_SIZES as imageSizes } from "../constants";
import Button from "../components/Button";
import { uploadImages } from "../utils/image";
import Message from "../components/Message";
import ImageSizesPanel from "../components/ImageSizesPanel";

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Upload = ({ history }) => {
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [resizedImages, setResizedImages] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [isUploadingToServer, setUploadingToServer] = useState(false);

  useEffect(() => {
    if (!uploadedImageSrc) return;

    setActiveSizeIndex(0);
    setUploadError(null);
  }, [uploadedImageSrc]);

  const addImageSrc = (src) => {
    const resizedImage = {
      name: imageSizes[activeSizeIndex].name,
      src,
    };

    setResizedImages([...resizedImages, resizedImage]);

    if (activeSizeIndex !== imageSizes.length - 1)
      setActiveSizeIndex(activeSizeIndex + 1);
  };

  const uploadImageHandler = async () => {
    setUploadingToServer(true);
    const uploadedImages = await uploadImages(resizedImages);
    setUploadingToServer(false);
    if (!uploadImages.error)
      history.push({ pathname: "/images", state: { uploadedImages } });
    else setUploadError("Images could not be uploaded 😢");
  };

  const hasFinishedCropping = imageSizes.length === resizedImages.length;
  return (
    <div className="columns">
      <div className="column is-three-fifths">
        <ImageCropper
          src={uploadedImageSrc}
          width={uploadedImageSrc && imageSizes[activeSizeIndex].width}
          height={uploadedImageSrc && imageSizes[activeSizeIndex].height}
          onCrop={(imgSrc) => addImageSrc(imgSrc)}
          disableCrop={hasFinishedCropping}
        />
      </div>
      <div className="column">
        <div className="sizes-container">
          <Message
            variant="default"
            title="Note"
            text="The image size on the left is not the final size and only serves as a guide for cropping"
          />
          {uploadError && (
            <Message variant="danger" title="Error" text={uploadError} />
          )}
          {hasFinishedCropping && (
            <>
              <Message
                variant="success"
                title="Success"
                text="Your images have been cropped successfully. Please click on the upload button."
              />

              <Button
                variant="primary"
                text={
                  !isUploadingToServer
                    ? "Save and Upload Images"
                    : "Uploading Images..."
                }
                onClick={uploadImageHandler}
                disabled={isUploadingToServer}
              />
            </>
          )}
          {!hasFinishedCropping && (
            <ImageSizesPanel activeSizeIndex={activeSizeIndex} />
          )}
          <ImageUploader
            onUploadSuccess={(src) => setUploadedImageSrc(src)}
            onUploadError={(msg) => setUploadError(msg)}
          />
        </div>
      </div>
    </div>
  );
};

Upload.propTypes = propTypes;

export default Upload;
