import React from "react";
import { motion } from "framer-motion";
import { CheckOutlined } from "@ant-design/icons";

const TickBoxComponent = ({ label, checked, onChange }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer transition-all rounded-lg p-4 w-full border ${
        checked
          ? "border-primary border-2 bg-blue-50"
          : "border-input hover:border-gray-300 bg-white"
      }`}
      onClick={onChange}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm ${checked ? "font-medium text-gray-900" : "text-gray-700"}`}>
          {label}
        </span>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-primary"
          >
            <CheckOutlined className="text-lg" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TickBoxComponent;