import { Search, Filter } from "lucide-react";

export default function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-5">

      {/* Search */}

      <div className="relative flex-1">

        <Search
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search content..."
          className="w-full h-14 rounded-2xl bg-zinc-900 border border-white/5 pl-14 pr-5 outline-none focus:border-yellow-500 transition"
        />

      </div>

      {/* Filter */}

      <div className="relative">

        <Filter
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="appearance-none h-14 rounded-2xl bg-zinc-900 border border-white/5 pl-14 pr-12 outline-none focus:border-yellow-500 transition min-w-[220px]"
        >
          <option value="all">
            All Content
          </option>

          <option value="videos">
            Videos
          </option>

          <option value="photos">
            Photos
          </option>

          <option value="premium">
            Premium
          </option>

          <option value="subscriber">
            Subscribers Only
          </option>

          <option value="free">
            Free
          </option>

          <option value="draft">
            Drafts
          </option>

          <option value="scheduled">
            Scheduled
          </option>
        </select>

      </div>

    </div>
  );
}