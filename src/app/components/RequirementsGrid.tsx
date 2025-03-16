"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { RequirementsCard } from "./RequirementsCard";

export const RequirementsGrid = () => {
  const requirements = useSelector((state: RootState) => state.requirements.requirements);

  if (!requirements) {
    return (<></>);
  }

  return (
    <div className="m-10 grid grid-cols-4 gap-10">
      {requirements.map((requirement, index) => (
        <RequirementsCard key={index} requirement={requirement} />
      ))}
    </div>
  );
}