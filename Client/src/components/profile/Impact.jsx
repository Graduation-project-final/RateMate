import React from "react";

const Impact = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Impact</h2>
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="font-semibold text-sm mb-3">Review reactions</h3>
          <div className="space-y-2 text-sm">
            {[
              { icon: "💡", label: "Helpful", count: 38 },
              { icon: "👍", label: "Thanks", count: 2 },
              { icon: "❤️", label: "Love this", count: 17 },
              { icon: "😮", label: "Oh no", count: 0 },
            ].map((reaction) => (
              <div key={reaction.label} className="flex justify-between">
                <span>
                  {reaction.icon} {reaction.label}
                </span>
                <span>{reaction.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-3">Stats</h3>
          <div className="space-y-2 text-sm">
            {[
              { icon: "✏️", label: "Review updates", count: 3 },
              { icon: "🥇", label: "First reviews", count: 2 },
              { icon: "👥", label: "Followers", count: 1 },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between">
                <span>
                  {stat.icon} {stat.label}
                </span>
                <span>{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-3">Compliments</h3>
        <div className="flex gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
            😎 You're cool 1
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
            🙏 Thank you 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default Impact;
