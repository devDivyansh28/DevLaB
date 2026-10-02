import Image from "next/image";
import {Button} from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { onBoardUser } from "@/modules/auth/actions";

export default async function Home() {
  await auth.protect();
  await onBoardUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton/>
    </div>
  )
}

