import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { MdDeleteOutline } from "react-icons/md";
import Card from "./Card";
import CustomInput from "./CustomInput";

function Board(props) {
  const { board, addCard, removeBoard, removeCard, updateCard } = props;

  return (
    <div className="flex-shrink-0 w-72 h-full flex flex-col gap-5">
      <div
        className="bg-secondary p-2 rounded-md flex flex-col gap-3"
        key={board?.id}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold flex items-center text-sm text-lightblack p-2 pr-3">
            {board?.title}
          </p>
          <div
          className="cursor-pointer relative mr-2"
            onClick={() => removeBoard(board?.id)}
          >
            <MdDeleteOutline />
          </div>
        </div>

        <Droppable droppableId={board.id.toString()} type="CARD">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-gray-100 p-2 pb-0 rounded-md flex flex-col gap-3 overflow-y-auto custom-scroll"
            >
              {board?.cards?.map((item, index) => (
                <Card
                  key={item.id}
                  card={item}
                  index={index}
                  boardId={board.id}
                  removeCard={removeCard}
                  updateCard={updateCard}
                />
              ))}
              {provided.placeholder}

              <CustomInput
                text="+ Add a card"
                placeholder="Enter a title or paste a link"
                displayClass="bg-transparent text-lightblack2 font-medium rounded-md w-full h-8 flex items-center"
                editClass="bg-white rounded-md"
                onSubmit={(value) => addCard(board?.id, value)}
                type="list"
              />
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Board;