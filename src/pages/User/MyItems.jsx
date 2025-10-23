import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [recoveries, setRecoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch user's items & recoveries
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = auth.currentUser;
        if (!user) throw new Error("Please sign in to view your items");

        const token = await user.getIdToken();
        const email = user.email;

        // Fetch My Items
        const itemsRes = await fetch(
          `http://localhost:5000/api/my-items?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const itemsData = await itemsRes.json();

        // Fetch Recoveries
        const recoveryRes = await fetch(
          "http://localhost:5000/api/recoveries",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const recoveryData = await recoveryRes.json();

        setItems(itemsData.items || itemsData.sampleItems || itemsData);
        setRecoveries(recoveryData || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (itemId) => navigate(`/updateItems/${itemId}`);

  const handleDelete = async (itemId) => {
    if (isDeleting) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setIsDeleting(true);
      setDeleteId(itemId);

      const user = auth.currentUser;
      if (!user) throw new Error("Please sign in to delete items");

      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete item");
      }

      setItems((prev) => prev.filter((i) => i._id !== itemId));
      toast.success("Item deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Handle marking item as fully recovered
  const handleMarkRecovered = async (recoveryId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await fetch(`http://localhost:5000/api/recoveries/${recoveryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recoveryStatus: "fully-recovered" }),
      });

      toast.success("Item marked as fully recovered ✅");
      setRecoveries((prev) =>
        prev.map((r) =>
          r._id === recoveryId ? { ...r, recoveryStatus: "fully-recovered" } : r
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update recovery");
    }
  };

  if (loading) return <LoadingSpinner className="mt-8" />;
  if (error) return <ErrorMessage message={error} className="mt-8" />;

  const getRecoveryForItem = (itemId) =>
    recoveries.find((r) => r.itemId === itemId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Posted Items</h1>
        <button
          onClick={() => navigate("/add-item")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          Add New Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-2 text-gray-600">
            You haven’t posted any items yet. Click “Add New Item” to get
            started.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date Posted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => {
                  const recovery = getRecoveryForItem(item._id);
                  const isRecovered =
                    recovery?.recoveryStatus === "fully-recovered";
                  const isPending = recovery?.recoveryStatus === "pending";

                  return (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start gap-3">
                          {item.thumbnail && (
                            <img
                              className="h-12 w-12 rounded-md object-cover"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.category}
                            </div>

                            {/* 🔥 Finder info section */}
                            {recovery?.recoveredBy && (
                              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-md p-3">
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  Finder Information:
                                </p>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={recovery.recoveredBy.photoURL}
                                    alt={recovery.recoveredBy.name}
                                    className="w-8 h-8 rounded-full object-cover border"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {recovery.recoveredBy.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {recovery.recoveredBy.email}
                                    </p>
                                  </div>
                                </div>

                                {recovery.recoveredLocation && (
                                  <p className="text-xs text-gray-600 mt-2">
                                    📍 {recovery.recoveredLocation}
                                  </p>
                                )}
                                {recovery.notes && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    📝 {recovery.notes}
                                  </p>
                                )}

                                {/* 📬 Contact Finder */}
                                <a
                                  href={`https://mail.google.com/mail/?view=cm&to=${recovery.recoveredBy.email}&su=Regarding your found item: ${item.title}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Contact Finder
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Other columns remain unchanged */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                            item.postType === "found"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.postType}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                            isRecovered
                              ? "bg-blue-100 text-blue-800"
                              : isPending
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {isRecovered
                            ? "Fully Recovered"
                            : isPending
                            ? "Pending Confirmation"
                            : item.status || "Not Recovered"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(
                          item.createdAt || item.date
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-3">
                        {recovery &&
                          recovery.originalOwner?.email ===
                            auth.currentUser?.email &&
                          recovery.recoveryStatus === "pending" && (
                            <button
                              onClick={() => handleMarkRecovered(recovery._id)}
                              className="text-green-600 hover:text-green-800 font-medium"
                            >
                              Mark as Fully Recovered
                            </button>
                          )}

                        <button
                          onClick={() => handleEdit(item._id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeleting && deleteId === item._id}
                        >
                          {isDeleting && deleteId === item._id ? (
                            <LoadingSpinner size="small" />
                          ) : (
                            <FiTrash2 className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItems;
