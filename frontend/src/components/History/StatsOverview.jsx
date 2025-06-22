import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  History,
  Code2,
  Languages,
  Filter,
  TrendingUp,
  Clock,
  Archive,
} from "lucide-react";

const StatsOverview = ({
  totalReviews,
  filteredCount,
  uniqueLanguages,
  pagination,
}) => {
  const { total } = pagination;

  const stats = [
    {
      title: "Total Reviews",
      value: total || totalReviews,
      icon: Archive,
      trend: totalReviews > 0 ? "+100%" : "0%",
      trendColor: totalReviews > 0 ? "text-emerald-400" : "text-gray-400",
      description: totalReviews > 0 ? "All time reviews" : "Start coding!",
      iconBg: "bg-gradient-to-br from-blue-500/30 to-purple-500/30",
      iconGlow: "shadow-lg shadow-blue-500/20",
      border: "border-blue-500/20",
      glow: "shadow-blue-500/20",
      gradient: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "Languages Used",
      value: uniqueLanguages,
      icon: Languages,
      trend: uniqueLanguages > 0 ? `${uniqueLanguages}` : "0",
      trendColor: "text-emerald-400",
      description: uniqueLanguages > 0 ? "Active languages" : "None yet",
      iconBg: "bg-gradient-to-br from-emerald-500/30 to-green-500/30",
      iconGlow: "shadow-lg shadow-emerald-500/20",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/20",
      gradient: "from-emerald-500/10 to-green-500/10",
    },
    {
      title: "Filtered Results",
      value: filteredCount,
      icon: Filter,
      trend: `${Math.round(
        (filteredCount / (total || totalReviews || 1)) * 100
      )}%`,
      trendColor: "text-purple-400",
      description: "Currently shown",
      iconBg: "bg-gradient-to-br from-purple-500/30 to-pink-500/30",
      iconGlow: "shadow-lg shadow-purple-500/20",
      border: "border-purple-500/20",
      glow: "shadow-purple-500/20",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Recent Activity",
      value: totalReviews > 0 ? "Active" : "None",
      icon: TrendingUp,
      trend: totalReviews > 0 ? "Live" : "0",
      trendColor: totalReviews > 0 ? "text-emerald-400" : "text-gray-400",
      description: totalReviews > 0 ? "This session" : "Start coding!",
      iconBg: "bg-gradient-to-br from-orange-500/30 to-red-500/30",
      iconGlow: "shadow-lg shadow-orange-500/20",
      border: "border-orange-500/20",
      glow: "shadow-orange-500/20",
      gradient: "from-orange-500/10 to-red-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 mt-15"
    >
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/20">
                  <Archive className="w-6 h-6 text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Review Archive
                </h1>
                <p className="text-gray-400 text-sm font-medium">
                  Track your code review history and insights
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-300 font-medium">Live</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="group"
            >
              <Card
                className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${stat.border} hover:${stat.glow} hover:shadow-lg transition-all duration-300 group-hover:border-opacity-60 rounded-sm`}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Subtle animated pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                <CardContent className="p-4 relative z-10">
                  {/* Header with icon and trend */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`${stat.iconBg} ${stat.iconGlow} p-2 rounded-none border ${stat.border} group-hover:scale-105 transition-all duration-300`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-sm font-bold ${stat.trendColor} group-hover:scale-105 transition-transform duration-300`}
                      >
                        {stat.trend}
                      </span>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-white group-hover:text-opacity-90 transition-colors duration-300">
                          {typeof stat.value === "number"
                            ? stat.value.toLocaleString()
                            : stat.value}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-gray-700/30">
                      <p className="text-xs text-gray-400 font-medium">
                        {stat.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 p-3 bg-gradient-to-r from-gray-900/30 via-gray-800/20 to-gray-900/30 border border-gray-700/30 backdrop-blur-sm">
          {[
            { color: "bg-blue-400", text: "Use filters to refine your search" },
            { color: "bg-emerald-400", text: "Click items to expand details" },
            { color: "bg-purple-400", text: "Sort to organize your reviews" },
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center space-x-2 text-xs text-gray-300"
            >
              <div
                className={`w-2 h-2 ${tip.color} rounded-full shadow-lg animate-pulse`}
              />
              <span className="font-medium">{tip.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsOverview;
