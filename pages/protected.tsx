import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <div>Protected content for {session.user?.name}</div>;
  }

  return null;
};

export default ProtectedPage;
