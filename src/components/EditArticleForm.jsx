import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getArticleById, updateArticle } from "../api/articles";

function EditArticleForm({ articleId, onUpdate, closeUpdate }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoadingFetch(true);
      try {
        const article = await getArticleById(articleId);
        setTitle(article.title);
        setText(article.text);
        setPrivacy(article.privacy);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.checked ? "public" : "private");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a title");
      return;
    }

    if (!text) {
      alert("Please add text");
      return;
    }

    const articleData = {
      title,
      text,
      publisher: user.name,
      privacy,
    };

    setLoadingUpdate(true);
    try {
      await updateArticle(articleId, articleData);
      onUpdate();
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  if (loadingFetch) {
    return (
      <div className="h-full w-full absolute top-0 left-0 flex justify-center items-center bg-[#b2b2b242]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <span className="text-gray-700">Loading article...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full absolute top-0 left-0 flex justify-center items-center bg-[#b2b2b242]">
      <form
        onSubmit={handleSubmit}
        className="relative h-[80%] w-[60%] bg-white shadow rounded px-5 py-10"
      >
        <button
          type="button"
          onClick={closeUpdate}
          className="font-extrabold absolute right-3 top-1"
        >
          X
        </button>
        <div className="h-[90%] overflow-auto">
          <div className="font-semibold mb-2">Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md outline-none p-2 mb-5"
          />
          <div className="font-semibold mb-2">Text</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-md outline-none p-2 mb-5 h-[60%]"
          />
          <div className="font-semibold mb-2">Privacy</div>
          <div className="flex items-center gap-2 font-semibold">
            <div>Private</div>
            <label className="relative inline-block w-16 h-8">
              <input
                type="checkbox"
                checked={privacy === "public"}
                onChange={handlePrivacyChange}
                className="opacity-0 w-0 h-0 peer"
              />
              <span
                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-400 peer-checked:bg-blue-500 peer-focus:ring-1 peer-focus:ring-blue-500
                      before:absolute before:content-[''] before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-white before:transition before:duration-400 peer-checked:before:translate-x-8 before:rounded-full rounded-full"
              ></span>
            </label>
            <div>Public</div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loadingUpdate}
            className={`bg-green-700 rounded-md py-2 px-10 font-bold text-white mt-4 ${
              loadingUpdate ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingUpdate ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                <span>Updating...</span>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticleForm;
