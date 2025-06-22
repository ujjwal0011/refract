import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";

const PaginationControls = ({ pagination, onPageChange, onRefresh }) => {
  const { page, pages, total, hasNext, hasPrev, limit } = pagination;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pages - 1) {
      rangeWithDots.push("...", pages);
    } else if (pages > 1) {
      rangeWithDots.push(pages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-8"
    >
      <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
        <CardContent className="p-6">
          {/* Stats and Refresh */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>
                Showing{" "}
                <span className="text-white font-medium">{startItem}</span> to{" "}
                <span className="text-white font-medium">{endItem}</span> of{" "}
                <span className="text-white font-medium">{total}</span> reviews
              </span>
            </div>

            <Button
              onClick={onRefresh}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Pagination Controls */}
          {pages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Previous Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => onPageChange(1)}
                  disabled={!hasPrev}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>

                <Button
                  onClick={() => onPageChange(page - 1)}
                  disabled={!hasPrev}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              </div>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {pageNumbers.map((pageNum, index) => (
                  <div key={index}>
                    {pageNum === "..." ? (
                      <span className="px-3 py-2 text-gray-500">
                        <MoreHorizontal className="w-4 h-4" />
                      </span>
                    ) : (
                      <Button
                        onClick={() => onPageChange(pageNum)}
                        variant={pageNum === page ? "default" : "ghost"}
                        size="sm"
                        className={
                          pageNum === page
                            ? "bg-blue-600 text-white hover:bg-blue-700 min-w-[40px]"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50 min-w-[40px] cursor-pointer"
                        }
                      >
                        {pageNum}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => onPageChange(page + 1)}
                  disabled={!hasNext}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  onClick={() => onPageChange(pages)}
                  disabled={!hasNext}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Page Info */}
          <div className="sm:hidden mt-4 text-center text-sm text-gray-400">
            Page <span className="text-white font-medium">{page}</span> of{" "}
            <span className="text-white font-medium">{pages}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaginationControls;
