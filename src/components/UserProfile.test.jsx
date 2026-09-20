import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import UserProfile from "./UserProfile";

describe("UserProfile", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows loading indicator", () => {
        vi.spyOn(globalThis, "fetch").mockImplementation(
            () => new Promise(() => {}),
        );

        render(<UserProfile />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows user data after successful request", async () => {
        const mockUser = {
            name: "Leanne Graham",
            email: "leanne@example.com",
            phone: "1-770-736-8031",
            website: "hildegard.org",
        };

        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        });

        render(<UserProfile />);

        expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();

        expect(screen.getByText("leanne@example.com")).toBeInTheDocument();

        expect(screen.getByText("1-770-736-8031")).toBeInTheDocument();

        expect(screen.getByText("hildegard.org")).toBeInTheDocument();
    });

    it("shows error message when request fails", async () => {
        vi.spyOn(globalThis, "fetch").mockRejectedValue(
            new Error("Network error"),
        );

        render(<UserProfile />);

        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent(
                "Failed to load user",
            );
        });
    });
});
