import { useEffect, useMemo, useState } from "react";

import {
  Search,
  RefreshCw,
  Package,
  Download,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getImages,
  pullImage,
} from "../api/dockerApi";

import ImageCard from "../components/docker-images/ImageCard";

function DockerImages() {

  const [images, setImages] = useState([]);

  const [search, setSearch] = useState("");

  const [imageName, setImageName] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [loadingPull, setLoadingPull] = useState(false);

  const [loadingImages, setLoadingImages] = useState(true);



  const loadImages = async () => {

    try {

      setLoadingImages(true);

      const data = await getImages();

      setImages(data);

    } catch (err) {

      console.error(err);

      toast.error("Unable to load Docker Images");

    } finally {

      setLoadingImages(false);

    }

  };



  const searchDockerHub = async (value) => {

    setImageName(value);

    if (value.length < 2) {

      setSuggestions([]);

      return;

    }

    try {

      const res = await fetch(

        `https://hub.docker.com/v2/search/repositories/?query=${value}&page_size=6`
      );

      const data = await res.json();

      setSuggestions(data.results || []);

    } catch (err) {

      console.log(err);

    }

  };



  const handlePullImage = async () => {

    if (!imageName.trim()) {

      toast.error("Enter Docker Image Name");

      return;

    }

    try {

      setLoadingPull(true);

      await pullImage(imageName);

      toast.success("Docker Image Pulled Successfully");

      setImageName("");

      setSuggestions([]);

      loadImages();

    } catch (err) {

      toast.error("Failed To Pull Image");

    } finally {

      setLoadingPull(false);

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

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <Sparkles size={34} />

              <h1 className="text-5xl font-black">

                Docker Images

              </h1>

            </div>

            <p className="mt-4 text-cyan-100 text-lg">

              Pull, Search, Delete and Manage Docker Images

            </p>

          </div>

          <button

            onClick={loadImages}

            className="rounded-2xl bg-white/20 p-4 backdrop-blur transition hover:rotate-180 hover:bg-white/30"

          >

            <RefreshCw size={28} />

          </button>

        </div>

      </div>
      
             {/* Pull Docker Image */}

      <div className="mb-8 rounded-3xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center gap-3">

          <Download className="text-cyan-600" size={28} />

          <h2 className="text-2xl font-bold">
            Pull Docker Image
          </h2>

        </div>

        <div className="flex gap-4">

          <div className="relative flex-1">

            <input
              type="text"
              value={imageName}
              onChange={(e) => searchDockerHub(e.target.value)}
              placeholder="Example : nginx:latest"
              className="w-full rounded-2xl border border-slate-300 p-4 text-lg outline-none focus:border-cyan-500"
            />

            {suggestions.length > 0 && (

              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border bg-white shadow-2xl">

                {suggestions.map((item) => (

                  <div
                    key={item.repo_name}
                    onClick={() => {
                      setImageName(item.repo_name);
                      setSuggestions([]);
                    }}
                    className="cursor-pointer border-b p-4 transition hover:bg-cyan-50"
                  >

                    <div className="font-bold">
                      {item.repo_name}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">

                      ⭐ {item.star_count} Stars

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          <button
            onClick={handlePullImage}
            disabled={loadingPull}
            className="rounded-2xl bg-cyan-600 px-8 text-lg font-bold text-white transition hover:bg-cyan-700 disabled:bg-gray-400"
          >

            {loadingPull ? "Pulling..." : "Pull Image"}

          </button>

        </div>

      </div>



      {/* Summary */}

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white shadow-xl">

          <p>Total Images</p>

          <h2 className="mt-2 text-5xl font-black">

            {images.length}

          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-xl">

          <p>Visible Images</p>

          <h2 className="mt-2 text-5xl font-black">

            {filteredImages.length}

          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white shadow-xl">

          <p>Docker Engine</p>

          <h2 className="mt-2 text-3xl font-black">

            ONLINE

          </h2>

        </div>

      </div>



      {/* Search */}

      <div className="relative mb-8">

        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={22}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Installed Docker Images..."
          className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-4 text-lg shadow-sm outline-none focus:border-cyan-500"
        />

      </div>    
     

              {/* Images Grid */}

      {loadingImages ? (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[1,2,3,4,5,6].map((item) => (

            <div
              key={item}
              className="h-72 animate-pulse rounded-3xl bg-slate-200"
            />

          ))}

        </div>

      ) : filteredImages.length === 0 ? (

        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-20 text-center shadow-lg">

          <Package
            size={70}
            className="mx-auto mb-6 text-slate-400"
          />

          <h2 className="text-3xl font-bold">

            No Docker Images Found

          </h2>

          <p className="mt-3 text-slate-500">

            Pull a Docker image or change your search.

          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredImages.map((image) => (

            <ImageCard
              key={image.id}
              image={image}
              onRefresh={loadImages}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default DockerImages;
