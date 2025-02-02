import { getItemImage } from './../GameUtils.js';
import ListHeroStats from "./ListHeroStats";

const CharacterInventoryDialog = ({ show, gameState, onClose }) => {
  if (!show) return null;

  const { hero } = gameState;

  // Define Inventory Grid Slots
  const inventoryGrid = [
    [null, hero.helm, hero.amulet],
    [hero.sword, hero.armor, hero.ring],
    [null, hero.boots, null],
  ];

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title text-white">Character Inventory</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            
            {/* Inventory Grid */}
            <div className="container">
              <div className="row">
                {inventoryGrid.map((row, rowIndex) => (
                  <div className="d-flex justify-content-center" key={rowIndex}>
                    {row.map((item, colIndex) => (
                      <div 
                        key={colIndex} 
                        className="inventory-slot border border-secondary m-2 d-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px", backgroundColor: "#2c2f33" }}
                      >
                        {item ? (
                          <img 
                            src={getItemImage(item)} 
                            alt={item.itemType} 
                            className="img-fluid" 
                            style={{ maxWidth: "75%", maxHeight: "75%" }} 
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Stats Section */}
            <div className="mt-4">
              <ListHeroStats gameState={gameState} />
            </div>

          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInventoryDialog;
