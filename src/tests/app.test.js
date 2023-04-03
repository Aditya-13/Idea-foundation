import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should display error message when there is an error fetching posts", async () => {
    // Mock the fetch function to return an error response
    global.fetch = jest.fn(() => Promise.reject("Network error"));

    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(
          "There was an error fetching the posts. Please try again later."
        )
      ).toBeInTheDocument()
    );
  });

  it("should render categories and subcategories with their respective posts", async () => {
    // Mock the fetch function to return sample posts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: "Post 1",
              body: "Post 1 body",
              category: "Category 1",
              subcategory: "Subcategory 1",
            },
            {
              id: 2,
              title: "Post 2",
              body: "Post 2 body",
              category: "Category 1",
              subcategory: "Subcategory 2",
            },
            {
              id: 3,
              title: "Post 3",
              body: "Post 3 body",
              category: "Category 2",
              subcategory: "Subcategory 1",
            },
          ]),
        ok: true,
      })
    );

    render(<App />);

    // Wait for the posts to be rendered
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Subcategory 1")).toBeInTheDocument();
      expect(screen.getByText("Subcategory 2")).toBeInTheDocument();
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
      expect(screen.getByText("Subcategory 1")).toBeInTheDocument();
      expect(screen.getByText("Post 3")).toBeInTheDocument();
    });
  });
});
