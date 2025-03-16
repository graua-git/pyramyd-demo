"use client";
import { useState } from "react";
import apiHost from "../apiHost";
import apiRoutes from "../apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { resetRequirements, setRequirements } from "../state/requirements/requirementsSlice";
import { setCredits } from "../state/credits/creditsSlice";
import { RootState } from "../state/store";

export const TextForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const creditsRemaining = useSelector((state: RootState) => state.credits.credits);

  fetch(apiHost + apiRoutes.credits, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(setCredits(data.credits)))
    .catch((error) => console.log("Error:", error));

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmitRequirements = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetRequirements());
    try {
      const response = await fetch(apiHost + apiRoutes.requirements, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await response.json();

      if (response.status === 400) alert(`Error: ${data.error || "Bad Request"}`);

      dispatch(setRequirements(data.requirements));
      dispatch(setCredits(data.credits));
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending request: " + error);
    }
  }

  const handleBuyCredits = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(apiHost + apiRoutes.credits, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ additionalCredits: 20 }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(setCredits(data.credits)))
      .catch((error) => {
        console.error("Error:", error);
        alert("Error buying credits, please try again.");
      });
  }

	return (
		<div className="flex flex-col items-center justify-center m-10">
      <div className="text-3xl font-bold pb-3 text-center">Enter Software Requirements</div>
      <textarea 
        className="rounded-lg bg-[var(--background-input)] w-100 h-75 p-2 border border-gray-300 focus:outline-none resize-none" 
        value={text}
        onInput={handleInput}
      />
      <div className="m-4">{creditsRemaining} credits remaining</div>
      <button 
        className="rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] w-50 h-10 m-2"
        onClick={handleSubmitRequirements}
      >
        Submit
      </button>
      <button 
        className="rounded-lg bg-[var(--background-card)] hover:bg-[var(--background-card-highlight)] w-50 h-10 m-2"
        onClick={handleBuyCredits}
      >
        Buy More Credits
      </button>
    </div>
	);
}