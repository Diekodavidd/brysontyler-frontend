import { useState } from "react";
import {
  Eye,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Image from "@/compat/Image";
import { useRouter } from "@/compat/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ViewAllStreams() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

const streams = [
  {
    id: 1,
    name: "Noir Ember",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80",
    viewers: "4.8k",
  },
  {
    id: 2,
    name: "Kairo Luxe",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
    viewers: "2.3k",
  },
  {
    id: 3,
    name: "Zuri Noir",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80",
    viewers: "6.7k",
  },
  {
    id: 4,
    name: "Saint Monroe",
    image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=900&q=80",
    viewers: "3.5k",
  },
  {
    id: 5,
    name: "Nyla Voss",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
    viewers: "5.9k",
  },
  {
    id: 6,
    name: "Jett Royale",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80",
    viewers: "1.9k",
  },
  {
    id: 7,
    name: "Amina Sol",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=80",
    viewers: "7.2k",
  },
  {
    id: 8,
    name: "Nova Banks",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=900&q=80",
    viewers: "4.1k",
  },
  {
    id: 9,
    name: "Raven Ellis",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=80",
    viewers: "8.4k",
  },
  {
    id: 10,
    name: "Milan Knox",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80",
    viewers: "2.8k",
  },
  {
    id: 11,
    name: "Sage Cartier",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80",
    viewers: "3.7k",
  },
  {
    id: 12,
    name: "Luxe Amari",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80",
    viewers: "6.3k",
  },
];

  const filteredStreams = streams.filter((stream) =>
    stream.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedStreams = filteredStreams.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStreams.length;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#020202] text-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-1">
              <h1 className="text-6xl font-black tracking-tighter uppercase">
                Live
              </h1>

              <p className="text-zinc-500 font-medium tracking-wide">
                Explore active premium broadcasts
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative w-72">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />

                <input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(8);
                  }}
                  className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-full py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-red-600 transition-all placeholder:text-zinc-700"
                />
              </div>

              <button className="flex items-center gap-2 bg-[#0a0a0a] px-8 rounded-full text-xs font-black uppercase tracking-widest border border-white/[0.08] hover:border-red-600/50 hover:text-red-500 transition-all">
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>

          {filteredStreams.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedStreams.map((stream) => (
                  <div
                    key={stream.id}
         onClick={() => router.push("/signup?role=fan")}          
          className="group aspect-[4/3] bg-zinc-900 relative overflow-hidden border border-white/[0.05] transition-all hover:-translate-y-1 hover:border-red-600/50 cursor-pointer"
                  >
                    <Image
                      src={stream.image}
                      alt={stream.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/20 to-transparent p-6 flex flex-col justify-end">

  <span className="px-3 py-1 bg-red-600 rounded-full text-[9px] font-black uppercase tracking-[0.25em] w-fit">

    LIVE NOW

  </span>

  <h3 className="mt-4 text-xl font-black">

    {stream.name}

  </h3>

  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">

    <Eye size={14} className="text-red-500" />

    {stream.viewers} watching

  </div>

  <button
    className="mt-6 w-full rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 transition"
  >
    Join Stream
  </button>

</div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-20 flex justify-center">
                  <button
                    onClick={() =>
                      setVisibleCount((prev) => prev + 4)
                    }
                    className="px-12 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-full"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-3xl">
              <AlertCircle
                size={48}
                className="text-zinc-800 mb-6"
              />

              <h3 className="text-xl font-black uppercase tracking-tight">
                No streams found
              </h3>

              <p className="text-zinc-500 text-sm mt-2 max-w-sm">
                Try adjusting your search terms to find what
                you're looking for.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setVisibleCount(8);
                }}
                className="mt-8 text-red-500 hover:text-white font-bold text-xs uppercase tracking-widest underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}