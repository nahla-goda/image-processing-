import { resized } from '../sharpresized/resized'
describe('Testing image processing', () => {


  it('it  sucess when passing the right imagename, height and width parameters', async () => {
    await expectAsync(resized('fjord', 250, 400)).toBeResolved();
  });
});
