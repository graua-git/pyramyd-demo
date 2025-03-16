"use client";
import { TextForm } from "./components/textForm";
import { RequirementsGrid } from "./components/RequirementsGrid";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import { motion } from "framer-motion";

export default function Home() {
  const requirements = useSelector((state: RootState) => state.requirements.requirements);

  const showRequirements = requirements && requirements.length > 0;
  
  return (
    <div className="flex">
      <div className="w-1/2">
        <TextForm />
      </div>
      {showRequirements && (
        <motion.div
        className="w-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <RequirementsGrid />
      </motion.div>
      )}  
    </div>
  );
}
