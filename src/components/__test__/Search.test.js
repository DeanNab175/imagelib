import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

const mockedSearch = jest.fn()

describe("SearchInput", () => {
    test('should render input element', async () => {
      render(
        <Search onSubmit={mockedSearch} />
      );
      const inputElement = screen.getByPlaceholderText(/Search an image/i);
      expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type into input', async () => {
        render(
          <Search onSubmit={mockedSearch} />
        );
        const inputElement = screen.getByPlaceholderText(/Search an image/i);
        fireEvent.change(inputElement, {target: {value: "Green house"}})
        expect(inputElement.value).toBe("Green house");
    });
})
