import { Profile } from "@/components/User/Profile.tsx";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Profile />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
