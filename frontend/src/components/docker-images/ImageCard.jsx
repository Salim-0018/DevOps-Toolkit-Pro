import { Layers, Calendar, HardDrive, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function ImageCard({ image, onRefresh }) {

  const deleteImage = async () => {

    const confirmDelete = window.confirm(
      `Delete image "${image.tags?.[0] || image.id}" ?`
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(`/api/docker/images/${image.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Image Deleted Successfully");
        onRefresh && onRefresh();
      } else {
        toast.error(data.error || "Delete Failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-100 p-4 dark:bg-cyan-900/30">
            <Layers className="text-cyan-600" size={28} />
          </div>

          <div>
            <h2 className="font-bold text-lg break-all">
              {image.tags?.[0] || "<none>"}
            </h2>

            <p className="text-sm text-slate-500">
              Docker Image
            </p>
          </div>

        </div>

        <button
          onClick={deleteImage}
          className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="space-y-3 text-sm">

        <div className="flex items-center gap-2">
          <HardDrive size={18} className="text-blue-500" />
          <span>{image.size}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-green-500" />
          <span>{image.created}</span>
        </div>

      </div>

      <div className="mt-5 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">

        <p className="mb-1 text-xs text-slate-500">
          Image ID
        </p>

        <p className="break-all text-xs">
          {image.id}
        </p>

      </div>

    </div>
  );
}

export default ImageCard;
