import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getCurrentUserData } from "@/modules/auth/actions";
import CreateProblemForm from "@/modules/problems/component/create-problem-form";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CreateProblemPage = async () => {
  const response = await getCurrentUserData();

  if (response.userData?.role!==UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <section className="flex flex-col items-center justify-center  mx-4 my-4">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-amber-400">
          Welcome { response.userData.firstName || "Admin"}! Create a Problem
        </h1>
        <ModeToggle/>
      </div>

      <CreateProblemForm/>
    </section>
  );
};

export default CreateProblemPage;