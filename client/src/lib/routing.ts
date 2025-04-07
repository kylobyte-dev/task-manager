import { redirect } from "@tanstack/react-router";

export type RouterContext = {
  isAuthenticated: boolean;
};

export const authBeforeLoad = ({ context }: { context: RouterContext }) => {
  if (!context.isAuthenticated) {
    throw redirect({
      to: "/login",
    });
  }
};
