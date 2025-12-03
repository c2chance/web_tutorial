import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'
import Carlist from "./components/Carlist";

describe("Carlist tests", () => {
    test("Component renders", () => {
        render(<Carlist />);
        expect(screen.getByText(/Loading/)).toBeInTheDocument();
    })
})