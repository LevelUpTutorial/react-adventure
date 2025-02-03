import PropTypes from "prop-types";

const PlaytimeDisplay = ({ playtime }) => {
  // Convert milliseconds to mm:ss format
  const formatPlaytime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="d-flex justify-content-center my-2">
      <p className="fw-bold text-primary">
        Run Time: {formatPlaytime(playtime)}
      </p>
    </div>
  );
};

PlaytimeDisplay.propTypes = {
  playtime: PropTypes.number.isRequired, // Playtime in milliseconds
};

export default PlaytimeDisplay;
