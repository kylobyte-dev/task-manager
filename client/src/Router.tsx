// Import the generated route tree
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useLogto } from "@logto/react";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const Router = () => {
  const { isAuthenticated, isLoading } = useLogto();

  if (isLoading) {
    return null;
  }

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
};
