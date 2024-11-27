class GameState {

  static LOCATION_CITY = 'City';
  static LOCATION_ADVENTURE = 'Adventure';
  static DEFAULT_LOCATION = GameState.LOCATION_CITY;

  constructor(heroName, gender, location) {
    this.heroName = heroName;
    this.gender = gender;
    this.location = location;
  }
}

export default GameState;