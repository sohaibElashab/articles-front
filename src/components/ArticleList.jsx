import React, { useContext, useState } from "react";
import ShowPopup from "./ShowPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/AuthContext";

function ArticleList({ articles, onDelete, onEdit }) {
  const [selected, setSelected] = useState(null);
  const [openText, setOpenText] = useState(false);
  const { user } = useContext(AuthContext);

  const handleTitleClick = (content) => {
    setSelected(content);
    setOpenText(true);
  };

  const handleEditClick = (id) => {
    onEdit(id);
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="my-10">
      {articles.length ? (
        articles.map((content) => (
          <div
            key={content._id}
            className="flex justify-between items-start shadow rounded-[20px] p-3 my-2"
          >
            <div>
              <div
                className="font-bold text-pink-600 text-lg cursor-pointer hover:text-lg"
                onClick={() => handleTitleClick(content)}
              >
                {content.title}
              </div>
              <div>{formatDate(content.date)}</div>
            </div>
            {user.role === "writer" ? (
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(content._id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => handleDeleteClick(content._id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ) : (
              <div>{content.publisher}</div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center">No texts to show</div>
      )}
      {openText && selected && (
        <ShowPopup text={selected} closePopup={() => setOpenText(false)} />
      )}
    </div>
  );
}

export default ArticleList;
