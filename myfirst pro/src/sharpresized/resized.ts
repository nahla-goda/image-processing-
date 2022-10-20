import sharp, { Sharp } from 'sharp'

export const resized = async (
  imagename: string | null,
  height: number | null,
  width: number | null
): Promise<Sharp> => {
  const buffer = `src/images/${imagename}.jpg`
  const image = await sharp(buffer)
  const resizedimage = await image.resize(width, height)
  return resizedimage
}

export default resized
