import './UpdateGroupChatModal.css';
import useModal from '../../../hooks/useModal';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, openModal, closeModal } = useModal();
  console.log('isOpen: ', isOpen);
  return (
    <>
      <button className="open-modal" onClick={openModal}>
        Open Modal
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">Modal Title</span>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
            <div className="modal-body">Update Group</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateGroupChatModal;
