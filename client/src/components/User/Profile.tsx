import { useLogto } from "@logto/react";
import { Button } from "../ui/button.tsx";
import { useQuery } from "@tanstack/react-query";

export function Profile() {
  const { signIn, signOut, isAuthenticated, fetchUserInfo } = useLogto();

  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    enabled: isAuthenticated,
  });

  return isAuthenticated ? (
    <div>
      <div>Hello {userInfo.data?.name}</div>
      <Button onClick={() => signOut("http://localhost:5173/")}>
        Sign Out
      </Button>
    </div>
  ) : (
    <Button onClick={() => signIn("http://localhost:5173/auth/callback")}>
      Sign In
    </Button>
  );
}
