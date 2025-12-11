"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/Layout/PageLayout";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/swap");
  }, [router]);

  return <PageLayout>Loading...</PageLayout>;
};

export default App;
