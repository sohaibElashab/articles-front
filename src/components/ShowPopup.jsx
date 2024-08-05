import React from "react";

function ShowPopup({ text, closePopup }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#b2b2b242]">
      <div className="relative h-[80%] w-[60%] bg-white shadow rounded p-5">
        <button
          onClick={closePopup}
          className="font-extrabold absolute right-3 top-1"
        >
          X
        </button>
        <div className="text-center font-semibold text-lg text-pink-600 my-2">
          {text.title}
        </div>
        <div className="overflow-auto h-[90%]">{text.text}</div>
      </div>
    </div>
  );
}

export default ShowPopup;
