import fs from 'fs'

export const checkfile = async (imagepath: string): Promise<boolean> => {
  const response = await fs.existsSync(imagepath)
  return response
}

export default checkfile
