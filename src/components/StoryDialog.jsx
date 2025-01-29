import PropTypes from "prop-types";

const StoryDialog = ({ title, content, background, onClose }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
      style={{
        background: background ? `url(${background}) center/cover no-repeat` : "rgba(0, 0, 0, 0.8)",
        zIndex: 1050
      }}
    >
      <div
        className="card text-center p-4 shadow-lg"
        style={{ maxWidth: "600px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{title}</h2>
        </div>
        <div className="card-body">
          {content.map((paragraph, index) => (
            <p className="card-text text-secondary" key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
          ))}
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

StoryDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  background: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default StoryDialog;
