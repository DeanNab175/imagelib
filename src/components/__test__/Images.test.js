import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Images from '../Images';

const MockedImages = ({images, searched}) => {
    return (
        <BrowserRouter>
            <Images images={images} searched={searched} />
        </BrowserRouter>
    )
}

describe("Images", () => {
    test('should render an image', async () => {
      render(
        <MockedImages images={[]} searched=""/>
      );
      screen.debug()
      const imageDivElement = await screen.findByTestId(/image-gallery-item-0/i);
      expect(imageDivElement).toBeInTheDocument();
    });
})
