import { useHandleSignInCallback } from "@logto/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { isLoading } = useHandleSignInCallback(() => {
    router.navigate({ to: "/" });
  });

  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  return null;
}
