import React, { useEffect, useState } from "react";
import { Calendar, List, Type } from "react-feather";
import Modal from "./Modal";
import CustomInput from "./CustomInput";

function CardInfo({ onClose, card, boardId, updateCard, deleteCard }) {
  const [cardValues, setCardValues] = useState({ ...card });

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const updateDate = (date) => {
    if (!date) return;
    setCardValues({ ...cardValues, date });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  }, [cardValues]);

  return (
    <Modal onClose={onClose}>
      <div className="w-[30vw] shadow-xl bg-red-300 flex justify-center items-center">
        <div className="p-8 flex flex-col gap-8 w-full border overflow-x-hidden bg-white rounded-md">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              <p className="font-bold text-lg">Title</p>
            </div>
            <CustomInput
              defaultValue={cardValues.title}
              text={cardValues.title}
              placeholder="Enter Title"
              onSubmit={updateTitle}
              buttonText="Save"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <List className="h-5 w-5" />
              <p className="font-bold text-lg">Description</p>
            </div>
            <CustomInput
              defaultValue={cardValues.desc}
              text={cardValues.desc || "Add a Description"}
              placeholder="Enter description"
              onSubmit={updateDesc}
              buttonText="Save"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <p className="font-bold text-lg">Date</p>
            </div>
            <input
              type="date"
              defaultValue={cardValues.date}
              min={new Date().toISOString().substr(0, 10)}
              className="p-2 border-2 border-gray-300 rounded-md outline-none"
              onChange={(event) => updateDate(event.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-400 transition-all ease-in-out delay-75 text-white px-4 py-2 rounded"
            onClick={deleteCard}
          >
            Delete card
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
