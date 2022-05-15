import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const MockedImages = () => {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

describe("Images", () => {
    test('should render an image', async () => {
      render(
        <MockedImages />
      );
      const imageDivElement = await screen.findByTestId(/image-gallery-item-0/i);
      expect(imageDivElement).toBeInTheDocument();
    });

    test('should render 30 images', async () => {
        render(
          <MockedImages />
        );
        const imageDivElements = await screen.findAllByTestId(/image-gallery-item/i);
        expect(imageDivElements.length).toBe(30);
    });
})