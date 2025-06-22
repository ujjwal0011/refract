import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Plus } from "lucide-react";

const EmptyState = ({ hasReviews, onCreateReview }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
        <CardContent className="p-12">
          <div className="text-center">
            {!hasReviews ? (
              <>
                <motion.div
                  className="w-20 h-20 border-2 border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                >
                  <FileText className="w-10 h-10 text-gray-400" />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-gray-300 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  No reviews yet!
                </motion.h2>
                <motion.p
                  className="text-gray-500 text-base mb-8 max-w-md mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Ready to get some entertaining feedback on your code? Start by
                  creating your first review and let our AI characters roast,
                  praise, or analyze your programming skills!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button
                    onClick={onCreateReview}
                    className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer px-6 py-3 text-base font-medium"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Review
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="w-20 h-20 border-2 border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                >
                  <Search className="w-10 h-10 text-gray-400" />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-gray-300 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  No matching reviews
                </motion.h2>
                <motion.p
                  className="text-gray-500 text-base max-w-md mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Try adjusting your search terms or filters to find the reviews
                  you're looking for, or create a new one!
                </motion.p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;
