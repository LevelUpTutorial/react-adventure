import { useState } from "react";
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

  // State to track the selected item for showing description
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to toggle selected item
  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null); // Deselect if the same item is clicked
    } else {
      setSelectedItem(item); // Set the new selected item
    }
  };

  // Function to get rarity-based border color
  const getRarityBorderClass = (rarity) => {
    const classes = {
      common: "border-secondary",
      uncommon: "border-success",
      rare: "border-primary",
      epic: "border-purple",
      legendary: "border-dark-orange",
      perfectLegendary: "border-dark-orange",
    };
    return classes[rarity] || "border-muted";
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white">Character Inventory</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            {/* Inventory Grid */}
            <div className="container d-flex flex-column">
              {inventoryGrid.map((row, rowIndex) => (
                <div className="d-flex justify-content-between" key={rowIndex}>
                  {row.map((item, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`inventory-slot border ${item ? getRarityBorderClass(item.itemRarity) : "border-secondary"} d-flex flex-column align-items-center`}
                      style={{ 
                        width: "100px", 
                        height: selectedItem === item ? "auto" : "100px", // Expand slot for selected item
                        backgroundColor: "#2c2f33", 
                        borderWidth: "4px", 
                        borderStyle: "solid", 
                        padding: "4px", 
                        margin: "0 8px", 
                      }}
                      onClick={() => handleItemClick(item)}
                    >
                      {item ? (
                        <>
                          <img 
                            src={getItemImage(item)} 
                            alt={item.itemType} 
                            className="img-fluid" 
                            style={{ width: "auto", height: "auto" }} 
                          />
                          {selectedItem === item && item.statDescriptions && (
                            <p className="text-white text-center mt-1" style={{ fontSize: "12px", lineHeight: "1.2" }}>
                              {item.statDescriptions.join(" • ")}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Centered Hero Stats Section */}
          <div className="mt-1">
            <ListHeroStats gameState={gameState} />
          </div>
          {/* Centered Close Button */}
          <div className="modal-footer d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInventoryDialog;
