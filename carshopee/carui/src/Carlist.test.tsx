import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'
import Carlist from "./components/Carlist";
import { Children } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const wrapper = ({ Children }: { Children: React.ReactNode }) => {
    <QueryClientProvider client={
        queryClient}>{Children}
    </QueryClientProvider>
};

describe("Carlist tests", () => {
    test("Component renders", () => {
        render(<Carlist />, { wrapper });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })
})