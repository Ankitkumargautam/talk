import './MyProfileModal.css';

const MyProfileModal = ({ isOpen, closeModal }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay-profile">
          <div className="modal-content-profile">
            <div className="modal-header-profile">
              <span className="modal-title-profile">Modal Title</span>
              <button className="close-button-profile" onClick={closeModal}>
                Close
              </button>
            </div>
            <div className="modal-body-profile">Profile</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfileModal;
