import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleForm from "../components/ArticleForm";
import EditArticleForm from "../components/EditArticleForm";
import { AuthContext } from "../contexts/AuthContext";
import { deleteArticle, getArticles } from "../api/articles";
import socket from "../api/socket";

function Home() {
  const { user, fetchUser } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const fetchArticles = useCallback(async () => {
    if (userRef.current) {
      setLoading(true);
      try {
        const articles = await getArticles(userRef.current);
        setArticles(articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    socket.on("articleUpdate", async () => {
      await fetchArticles();
    });

    return () => {
      socket.off("articleUpdate");
    };
  }, [fetchArticles]);

  const handleDelete = useCallback(
    async (id) => {
      setDeleting(true);
      try {
        await deleteArticle(id);
      } catch (error) {
        console.error("Failed to delete article:", error);
      } finally {
        setDeleting(false);
      }
    },
    []
  );

  const addContent = useCallback(() => {
  }, []);

  const editContent = useCallback((id) => {
    setEditingArticleId(id);
  }, []);

  const updateContent = useCallback(() => {
    setEditingArticleId(null);
  }, []);

  if (!user) {
    return null;
  }

  const { role } = user;

  return (
    <div className="px-[20%]">
      <Header roleChange={fetchArticles} />
      {role === "writer" && <ArticleForm onAdd={addContent} />}
      {loading ? (
        <div className="text-center my-5">
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <span className="text-gray-700">Loading articles...</span>
          </div>
        </div>
      ) : deleting ? (
        <div className="text-center my-5">
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-6 h-6 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <span className="text-gray-700">Deleting article...</span>
          </div>
        </div>
      ) : (
        <ArticleList
          articles={articles}
          onDelete={handleDelete}
          onEdit={editContent}
        />
      )}
      {editingArticleId && (
        <EditArticleForm
          articleId={editingArticleId}
          onUpdate={updateContent}
          closeUpdate={() => setEditingArticleId(null)}
        />
      )}
    </div>
  );
}

export default Home;
