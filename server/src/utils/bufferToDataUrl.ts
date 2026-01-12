export const bufferToDataUrl = (file: Express.Multer.File): string => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};
