import { Button } from "@/components/ui/button.tsx";
import { useLogto } from "@logto/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn } = useLogto();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>

      <Button onClick={() => signIn("http://localhost:5173/auth/callback")}>
        Sign In
      </Button>
    </div>
  );
}
