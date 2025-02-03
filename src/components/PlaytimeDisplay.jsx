import PropTypes from "prop-types";

const PlaytimeDisplay = ({ playtime }) => {
  // Convert milliseconds to std:min:sec format
  const formatPlaytime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="d-flex justify-content-center my-3">
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
