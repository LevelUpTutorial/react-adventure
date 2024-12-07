import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero_male_combat.png';
import goblinGreen from './assets/images/enemy_goblin_green.jpg';

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
  static IMG_HERO_FEMALE_COMBAT = heroFemaleCombat;
  static IMG_HERO_MALE_COMBAT = heroMaleCombat;

  active_enemy = null;
  static ENEMY_GOBLIN_GREEN  = {
    name: 'Goblin Green',
    level: 1,
    health: 10,
    attack_cooldown: 0,
    attackSpeed: 2000,
    image: goblinGreen
  }

  active_encounter = null;

  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      name: heroName,
      gender: gender,
      level: 1,
      health: 100,
      attack: 5,
      attack_cooldown: 0,
      attack_speed: 1500, // in Milliseconds because of Interval Ticks
      image: (gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL)
    }
    this.location = location;
  }
}

export default GameState;