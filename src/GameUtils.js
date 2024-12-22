export function playSound(filePath) {
    // Create a new Audio object
    const sound = new Audio(filePath);

    // Play the sound
    sound.play()
        .then(() => {
            console.log("Sound is playing successfully!");
        })
        .catch((error) => {
            console.error("Error playing sound:", error);
        });
}