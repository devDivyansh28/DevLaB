import Image from "next/image";
import {Button} from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await auth.protect();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton/>
    </div>
  )
}
