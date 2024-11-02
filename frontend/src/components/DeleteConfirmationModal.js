import React from 'react';
import '../assets/styles/DeleteConfirmationModal.css'; // Add styles for your modal

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, name }) => {
    return (
        isOpen && (
            <div className="modal-overlay1">
                <div className="modal-content">
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete <span>{name}</span>?</p>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="button" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteConfirmationModal;
