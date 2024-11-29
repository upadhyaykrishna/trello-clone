import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Board from "../Components/Board";
import CustomInput from "../Components/CustomInput";
import { updateLocalStorageBoards } from "../Helper/APILayers";

function Dashboard() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("data") || "[]");
    setBoards(localStorageData);
  }, []);

  const addBoardHandler = (name) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
  };

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const addCardHandler = (boardId, title) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId, cardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId, cardId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "BOARD") {
      const tempBoardsList = [...boards];
      const [reorderedBoard] = tempBoardsList.splice(source.index, 1);
      tempBoardsList.splice(destination.index, 0, reorderedBoard);
      setBoards(tempBoardsList);
      return;
    }

    if (type === "CARD") {
      const tempBoardsList = [...boards];

      const sourceBoardIndex = tempBoardsList.findIndex(
        (board) => board.id.toString() === source.droppableId
      );
      const destBoardIndex = tempBoardsList.findIndex(
        (board) => board.id.toString() === destination.droppableId
      );

      const [movedCard] = tempBoardsList[sourceBoardIndex].cards.splice(
        source.index,
        1
      );

      tempBoardsList[destBoardIndex].cards.splice(
        destination.index,
        0,
        movedCard
      );
      setBoards(tempBoardsList);
    }
  };

  const resetBoardData = () => {
    localStorage.removeItem("data");
    setBoards([]);
  };

  useEffect(() => {
    updateLocalStorageBoards(boards);
  }, [boards]);

  return (
    <div className="w-full h-screen flex flex-col bg-cover bg-center bg-[hsl(215,84.6%,17.9%)] bg-gradient-to-br from-[#0b2754] to-[#4e3164]">
      <div className="flex justify-between items-center p-4 shadow-md sticky top-0 backdrop-blur-xl bg-primary/20 text-white text-lg font-semibold">
        <span>Trello Board</span>
        <button
          className="bg-orange-500 hover:bg-orange-400 transition-all ease-in-out delay-75 text-white px-4 py-2 rounded"
          onClick={resetBoardData}
        >
          Reset Board
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board-container"
          direction="horizontal"
          type="BOARD"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 w-full overflow-auto pt-5 bg-gradient-to-br from-[#1a3570] to-[#ca519c]"
            >
              <div className="flex gap-6 px-8">
                {boards.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                          ${
                            snapshot.isDragging
                              ? "rotate-2 scale-105 shadow-xl"
                              : ""
                          }
                          transition-all duration-200
                        `}
                      >
                        <Board
                          board={item}
                          addCard={addCardHandler}
                          removeBoard={() => removeBoard(item.id)}
                          removeCard={removeCard}
                          updateCard={updateCard}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                <div className="flex-shrink-0 w-[272px]">
                  <CustomInput
                    displayClass="text-white rounded-lg shadow p-2 pl-4 backdrop-blur-md bg-white/20 w-full hover:bg-gray-300/20 transition duration-300"
                    editClass="rounded-md p-2 bg-white transition duration-300"
                    placeholder="Enter list name..."
                    text="+ Add another list"
                    buttonText="Add list"
                    onSubmit={addBoardHandler}
                  />
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
