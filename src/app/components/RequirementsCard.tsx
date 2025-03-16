"use client";
interface RequirementsCardProps {
  requirement: string;
}

export const RequirementsCard = ({ requirement }: RequirementsCardProps) => {
  return (
    <div className="bg-[var(--background-card)] hover:bg-[var(--background-card-highlight)] justify-center align-middle text-center rounded-xl p-5 ">
      <div className="text-sm">{requirement}</div>
    </div>
  );
}