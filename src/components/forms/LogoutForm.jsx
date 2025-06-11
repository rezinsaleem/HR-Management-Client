import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import "./candidateform.css";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hrLogout } from "../../service/redux/slices/hrSlice";

export default function LogoutForm({ onClose }) {
  const modalContentRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      dispatch(hrLogout());
      toast.success("Logged Out successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to Log Out");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="add-candidate-modal-overlay">
      <div className="add-candidate-modal-content" ref={modalContentRef}>
        <div className="add-candidate-modal-header">
          <div></div>
          <h2 className="add-candidate-modal-title">Logout</h2>
          <button className="add-candidate-modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="add-candidate-form">
          <div className="new-logout-button">
          <button type="button"className="add-candidate-save-button-red" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="add-candidate-save-button-grey">
            Logout
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
