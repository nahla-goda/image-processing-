import express from 'express'
import path from 'path'
import { Request, Response } from 'express'
import checkfile from '../../sharpresized/checkfile'
import resized from '../../sharpresized/resized'

const param = express.Router()
//check paramters vailation
param.get('/', async (req: Request, res: Response): Promise<void> => {
  const imagename: string = req.query.imagename as string
  const widthh: string = req.query.width as string
  const heightt: string = req.query.height as string
  const height = parseInt(heightt)
  const width = parseInt(widthh)

  //in this case  http://localhoast/api/images
  if (
    !('imagename' in req.query) &&
    !('width' in req.query) &&
    !(height in req.query)
  ) {
    res.send('please enter your api paramteres imagename & width& height')
    return
  }

  //in this case  http://localhoast/api/images?imagename=(string)&width= (number)
  else if (!('width' in req.query) && 'imagename' in req.query) {
    res.status(400).send('missing your correct width')
    return
  } else if (width <= 0 || Number.isNaN(width)==false) {
    res.status(400).send('width should be number')
    return
  }
  //in this case  http://localhoast/api/images?imagename=(string)&width=(number)&height=(number)
  else if (!('height' in req.query)) {
    res.status(400).send('missing your correct height')
    return
  } else if (height <= 0 || Number.isNaN(height)==false) {
    res.status(400).send('height should be number')
    return
  }

  // check fileexitand cached and calling resized function
  try {
    const imagePath = `${imagename}${width}x${height}.jpg`
    const resizePath = `./dist/${imagename}${width}x${height}.jpg`
    const imagePathExists = await checkfile(path.join('dist', imagePath))
    if (imagePathExists) {
      
      res.sendFile(
        path.join(__dirname, '../', '../', '../', 'dist/' + imagePath)
      )
    } else {
      // call resized function and pass 3 parmemter
      const response = await resized(imagename, width, height)
      response.toFile(resizePath, (error: Error) => {
        if (error) {
          res.status(403).send({
            ok: 'failed',
            message: error.message
          })
        } else {
          res.sendFile(
            path.join(__dirname, '../', '../', '../', 'dist/' + imagePath)
          )
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
})

export default param
