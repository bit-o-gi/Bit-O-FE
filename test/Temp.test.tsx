import { render, screen } from '@testing-library/react';

// Simple component for testing
function Hello() {
    return <h1>Hello, test!</h1>;
}

describe('Example Test', () => {
    it('renders hello message', () => {
        render(<Hello />);
        expect(screen.getByText('Hello, test!')).toBeInTheDocument();
    });

    it('simple assertion', () => {
        expect(1 + 1).toBe(2);
    });
});