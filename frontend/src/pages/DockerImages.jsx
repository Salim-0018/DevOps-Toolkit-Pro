import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, Package } from "lucide-react";
import { getImages } from "../api/dockerApi";
import ImageCard from "../components/docker-images/ImageCard";

function DockerImages() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const loadImages = async () => {
    try {
      const data = await getImages();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const filteredImages = useMemo(() => {
    return images.filter((image) =>
      (image.tags?.[0] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [images, search]);

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-extrabold">
              Docker Images
            </h1>

            <p className="mt-2 text-cyan-100">
              Manage all Docker images from one place
            </p>
          </div>

          <button
            onClick={loadImages}
            className="rounded-xl bg-white/20 p-3 backdrop-blur hover:bg-white/30"
          >
            <RefreshCw size={24} />
          </button>

        </div>

      </div>

      {/* Summary Card */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

        <div className="flex items-center gap-4">

          <Package
            size={34}
            className="text-cyan-600"
          />

          <div>

            <p className="text-slate-500">
              Total Images
            </p>

            <h2 className="text-4xl font-bold">
              {images.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Search */}
      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Docker Images..."
          className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 shadow-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

      </div>

      {/* Image Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredImages.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onRefresh={loadImages}
      />

        ))}

      </div>

    </div>
  );
}

export default DockerImages;
