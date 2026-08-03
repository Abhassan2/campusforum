import { IoIosTrendingUp } from "react-icons/io";
import { IoSparkles } from "react-icons/io5";

const InfoPanel = ({ type = "suggestions", items = [] }) => {
  const isTrending = type === "trending";

  return (
    <div className="min-h-screen bg-white border-l border-slate-200 p-5">
      <div className="mb-6">
        <div className="flex items-center gap-3 text-slate-900 mb-3">
          {isTrending ? (
            <IoIosTrendingUp className="w-6 h-6 text-indigo-600" />
          ) : (
            <IoSparkles className="w-6 h-6 text-amber-500" />
          )}
          <h2 className="text-xl font-semibold">
            {isTrending ? "Trending now" : "Suggestions"}
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          {isTrending
            ? "Explore the hottest posts and topics right now."
            : "Ideas and profiles you might want to check out."}
        </p>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No items to show yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
