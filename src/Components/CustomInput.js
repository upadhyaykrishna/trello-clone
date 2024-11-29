import React, { useState } from "react";
import { X } from "react-feather";

function CustomInput({
  text,
  onSubmit,
  displayClass = "",
  editClass = "",
  placeholder,
  defaultValue = "",
  buttonText = "Add",
  type = "normal",
}) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue);

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <div className="w-full">
      {isCustomInput ? (
        <form
          className={`flex flex-col gap-2 ${editClass}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(e) => setInputText(e.target.value)}
            autoFocus
            className={`w-64 h-8 px-2 py-3 focus:border focus:border-blueBorder focus:outline-none text-sm ${
              type === "list"
                ? "shadow-[0px_1px_0px_1px_rgba(0,_0,_0,_0.1)] border-t p-2 h-14 rounded-lg"
                : ""
            }`}
          />
          {type === "list" ? null : (
            <div className="flex items-center gap-1">
              <button
                type="submit"
                className="text-sm px-2 py-3 w-20 h-8 bg-blue-500 text-white transition hover:bg-blue-600 active:translate-y-1 rounded-[4px] flex items-center justify-center"
              >
                {buttonText}
              </button>

              <div className="hover:bg-gray-300 h-8 flex justify-center items-center w-8 rounded-sm">
                <X
                  onClick={() => setIsCustomInput(false)}
                  className="cursor-pointer h-5 w-5 text-primary"
                />
              </div>
            </div>
          )}
        </form>
      ) : (
        <>
          <p
            className={`p-2 rounded-md bg-gray-200 text-black cursor-pointer w-fit transition hover:bg-gray-300 ${displayClass}`}
            onClick={() => setIsCustomInput(true)}
          >
            {text}
          </p>
        </>
      )}
      {placeholder === "Enter a title or paste a link" && isCustomInput ? (
        <div className="flex items-center gap-1 mt-3">
          <button
            type="submit"
            className="text-sm px-2 py-3 w-20 h-8 bg-blue-500 text-white transition hover:bg-blue-600 active:translate-y-1 rounded-[4px] flex items-center justify-center"
            onClick={submission}
          >
            Add card
          </button>

          <div className="hover:bg-gray-300 h-8 flex justify-center items-center w-8 rounded-sm">
            <X
              onClick={() => setIsCustomInput(false)}
              className="cursor-pointer h-5 w-5 text-primary"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CustomInput;
