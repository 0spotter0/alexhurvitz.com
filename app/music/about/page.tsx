import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto w-full px-6">
      <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-6">
        About
      </h1>
      <div className="text-gray-600 leading-relaxed flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-6/10 flex flex-col gap-4">
          <p>
            Alex Hurvitz is a pianist, composer, educator, and photographer
            based in Los Angeles, whose work is centered on creating memorable
            music that resonates with listeners and inspires them to explore
            their own musical emotions. He began studying classical piano at the
            age of three, and when a sophomore at the Los Angeles County High
            School for the Arts, discovered jazz, which formed the foundation of
            an artistic practice now spanning classical tradition, jazz
            performance, and contemporary creative work that blends structured
            interpretation with improvisation and creative exploration.
          </p>
          <p>
            As a performer, Alex has appeared with ensembles including the Brent
            Wallarab Big Band, Wayne Wallace Latin Jazz Big Band, John Raymond
            Big Band, and Rodney Whitaker Big Band. His work has been shaped
            through collaborations and mentorship within the jazz and
            contemporary music community, and he continues to develop his
            artistry through performance and study.
          </p>
          <p>
            Alex was a fellow in the LA Philharmonic's Nancy and Barry Sanders
            Composer Fellowship Program, where he studied under Andrew Norman,
            Sarah Gibson, and Thomas Kotcheff while receiving private
            instruction from USC/DU's Sean Friar. His compositions have been
            presented at six U.S. National Junior Original Concerts, and
            represented the United States at the 45th Yamaha International JOC
            in Tokyo. In 2017, Alex became the highest scoring and youngest
            winner pre college of the ASCAP Morton Gould Young Composer
            Competition and received the ASCAP Charlotte V. Bergen Scholarship,
            before going on to win the ASCAP Herb Alpert Young Jazz Composers
            Award the following year.
          </p>
          <p>
            Alex recently earned his Bachelor of Music degree in jazz piano from
            Indiana University, Jacobs School of Music, where he studied with
            artists Luke Gillespie, Sean Dobbins, Greg Ward, Brent Wallarab, and
            John Raymond. Alex has also studied with artists David Dzubay, Don
            Freund, PQ Phan, Alex Hahn, Daniel Rotem, Jeremy Siskind, Glenn
            Zaleski, Tierney Sutton, and Christian Jacob.
          </p>
          <p>
            Now based in Los Angeles, Alex performs regularly throughout the
            city, plays with the San Gabriel Jazz Symphony, composes original
            music, and teaches piano students of all ages. He continues to study
            jazz voice while expanding his creative work in photography,
            pursuing projects that connect musical expression with visual
            storytelling.
          </p>
        </div>
        <div className="w-full md:w-4/10 flex flex-row md:flex-col gap-4 sm:gap-10 text-white">
          <div className="min-w-0 flex-1 md:flex-none md:w-full relative">
            <img
              src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/music/aboutme-alex.webp`}
              alt="Picture of Alex"
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 px-2 py-1 backdrop-blur-sm w-full bg-black/10">
              <p className="text-xs text-right">
                Annie Wu @anniedotexe
              </p>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:flex-none md:w-full relative">
            <img
              src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/music/023.webp`}
              alt="Picture of Alex"
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 px-2 py-1 backdrop-blur-sm w-full bg-black/10">
              <p className="text-xs text-right">
                Kamaron Farver @photos.by.farver
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
