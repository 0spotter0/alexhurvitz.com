import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar title={"ABOUT ME"} />
      <div className="w-full h-full items-center justify-center">
        <div className="flex flex-col gap-8 max-w-[60ch] sm:mt-20">
          <img
            src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/alex.avif`}
            alt="Picture of Alex"
            className="w-1/2"
          />
          <p className="w-full">
            commodo dolore irure nulla exercitation voluptate non voluptate
            velit nisi commodo velit nostrud ad labore magna voluptate voluptate
            amet ipsum ea commodo incididunt enim sunt excepteur eu eiusmod
            magna qui fugiat consectetur magna aute reprehenderit anim magna
            fugiat sunt reprehenderit in reprehenderit in enim anim non eiusmod
            in sit ea
          </p>
        </div>
      </div>
    </>
  );
}
