import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
}

export async function uploadToCloudinary(
  buffer: Buffer,
  folder = "xemiy/projects",
): Promise<{ url: string; publicId: string }> {
  const cl = getCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cl.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string) {
  const cl = getCloudinary();
  await cl.uploader.destroy(publicId);
}
