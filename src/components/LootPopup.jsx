import { getItemImage } from './../GameUtils.js';

const LootPopup = ({ show, currentItem, newItem, onEquip, onKeep }) => {
  if (!show) return null; // Don't render the popup if not visible

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Loot Drop!</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onKeep}
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-around align-items-center">
            {/* Current Item */}
            <div className="text-center">
              <h5>equipped</h5>
              <img
                src={getItemImage(currentItem)}
                alt="Current Item"
                className="img-fluid"
                style={{ maxWidth: "100px" }}
              />
              <p>
                <strong>Rarity:</strong> {currentItem.itemRarity}
              </p>
              <p>
                <strong>{currentItem.statDesc}:</strong> {currentItem.itemStat}%
              </p>
            </div>

            {/* New Item */}
            <div className="text-center">
              <h5>New {newItem.itemType}</h5>
              <img
                src={getItemImage(newItem)}
                alt="New Item"
                className="img-fluid"
                style={{ maxWidth: "100px" }}
              />
              <p>
                <strong>Rarity:</strong> {newItem.itemRarity}
              </p>
              <p>
                <strong>{newItem.statDesc}:</strong> {newItem.itemStat}%
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={onKeep}>
              Keep Equipped
            </button>
            <button className="btn btn-success" onClick={onEquip}>
              Equip New {newItem.itemType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LootPopup;
