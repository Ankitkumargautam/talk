import './SideDrawer.css';

const SideDrawer = ({ isOpenDrawer, closeModalDrawer }) => {
  return (
    <>
      {isOpenDrawer && (
        <div className="drawer">
          <div className="drawer-content">
            <div className="drawer-header">
              <span className="drawer-title">Search Users</span>
              <button
                className="drawer-close-button"
                onClick={closeModalDrawer}
              >
                Close
              </button>
            </div>
            <div className="drawer-body">
              {/* Your existing JSX for the drawer body */}
              {/* ... */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideDrawer;
