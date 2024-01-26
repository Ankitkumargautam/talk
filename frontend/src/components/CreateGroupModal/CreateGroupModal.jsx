import './CreateGroupModal.css';

const CreateGroupModal = ({ isOpenGroup, closeModalGroup }) => {
  return (
    <>
      {isOpenGroup && (
        <div className="modal-overlay-group">
          <div className="modal-content-group">
            <div className="modal-header-group">
              <span className="modal-title-group">Modal Title</span>
              <button className="close-button-group" onClick={closeModalGroup}>
                Close
              </button>
            </div>
            <div className="modal-body-group">Create Group</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupModal;
