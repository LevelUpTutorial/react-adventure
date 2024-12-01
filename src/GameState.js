import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';

class GameState {
  /* Constants */
  /* Hero Constants */
  static DEFAULT_NAME = 'Unnamed Hero';
  static GENDER_MALE = 'male';
  static GENDER_FEMALE = 'female';
  static DEFAULT_GENDER = GameState.GENDER_MALE;

  /* Location Constants */
  static LOCATION_CITY = 'City';
  static LOCATION_ADVENTURE = 'Adventure';
  static DEFAULT_LOCATION = GameState.LOCATION_CITY;

  /* Asset Constants */
  static IMG_HERO_FEMALE_NEUTRAL = heroFemaleNeutral;
  static IMG_HERO_MALE_NEUTRAL = heroMaleNeutral;

  constructor(heroName, gender, location) {
    this.heroName = heroName;
    this.gender = gender;
    this.location = location;
  }
}

export default GameState;