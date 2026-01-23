import cloudinary from "./cloudinary";

/**
 * Upload image to Cloudinary (Next.js App Router SAFE)
 */
export async function uploadImage(file, folder = "adilcast") {
  if (!file || typeof file.stream !== "function") {
    throw new Error("Invalid file object");
  }

  const buffer = await streamToBuffer(file.stream());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
