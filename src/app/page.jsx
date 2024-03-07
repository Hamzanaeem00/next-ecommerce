"use client";
import { useSession } from "next-auth/react";
import LandingPage from "../components/landing-page/landingpage";
import { getToken } from "next-auth/jwt";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const token = getToken();
  console.log(token);
  // const router = useRouter();
  // if (!session) {
  //   return (
  //     <div className="bg-white-700 w-screen h-screen flex items-center justify-center">
  //       <div className="w-full" variant="outline">
  //         <button onClick={() => signIn("google")}>Login With Google</button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      {/* <div>Logged In With {session.user.email}</div> */}
      <div>
        <LandingPage />
        {/* <button
          onClick={() => signOut()}
          className="bg-red-400 text-white p-2 px-4 rounded"
        >
          {" "}
          Logout
        </button> */}
      </div>
    </>
  );
}
