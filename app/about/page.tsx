import { Navbar } from "@/components/navbar";

export default async function AboutPage() {
  return (
    <>
      <Navbar title={"ABOUT ME"} />
      <div className="bg-yellow-500/20 w-full h-full flex items-center justify-center text-3xl">
        content here
      </div>
    </>
  );
}
