import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AlignLeft, Clock } from "react-feather";
import { formatDate } from "../Helper/Util";
import Chip from "./Chip";
import CardInfo from "./CardInfo";

function Card(props) {
  const { card, boardId, index, removeCard, updateCard } = props;
  const { id, title, desc, date, labels } = card;

  const [showModal, setShowModal] = useState(false);

  const deleteCard = (e) => {
    e.stopPropagation();
    removeCard(boardId, id);
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      )}
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="px-4 hover:border hover:border-blueBorder py-2 group relative flex flex-col bg-white rounded-[10px] hover:shadow-none shadow-[0px_1px_0px_1px_rgba(0,_0,_0,_0.1)] border-t cursor-pointer transition-shadow"
            key={card.id}
            onClick={() => setShowModal(true)}
          >
            <div className="flex items-start">
              <div className="flex-1 flex flex-wrap gap-2 text-sm leading-5">
                {labels?.map((item, index) => (
                  <Chip key={index} item={item} />
                ))}
              </div>
            </div>
            <div className="text-sm leading-7 text-lightblack">{title}</div>
            <div title={desc} className="text-gray-600 ml-1">
              {desc && <AlignLeft size={16} />}
            </div>
            <div className="flex justify-between items-center">
              {date && (
                <p className="rounded-full px-3 py-1 mt-1 bg-gray-200 text-black text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {formatDate(date)}
                </p>
              )}
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Card;
