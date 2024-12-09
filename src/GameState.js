import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero_male_combat.png';
import goblinGreen from './assets/images/enemy_goblin_green.jpg';
import goblinBlue from './assets/images/enemy_goblin_blue.jpg';
import goblinRed from './assets/images/enemy_goblin_red.jpg';
import goblinPurple from './assets/images/enemy_goblin_purple.jpg';
import PropTypes from "prop-types";

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
    attack: 5,
    attack_speed: 2000,
    attack_cooldown: 2000,
    image: goblinGreen
  }
  static ENEMY_GOBLIN_BLUE  = {
    name: 'Goblin Blue',
    level: 1,
    health: 30,
    attack: 15,
    attack_speed: 2500,
    attack_cooldown: 2500,
    image: goblinBlue
  }
  static ENEMY_GOBLIN_RED  = {
    name: 'Goblin Red',
    level: 1,
    health: 20,
    attack: 5,
    attack_speed: 500,
    attack_cooldown: 500,
    image: goblinRed
  }
  static ENEMY_GOBLIN_PURPLE  = {
    name: 'Goblin Purple',
    level: 1,
    health: 40,
    attack: 20,
    attack_speed: 1500,
    attack_cooldown: 1500,
    image: goblinPurple
  }

  next_encounters = [];
  random_encounters = [
    { category: 'combat', enemy: GameState.ENEMY_GOBLIN_GREEN, weight: 25 },
    { category: 'combat', enemy: GameState.ENEMY_GOBLIN_RED, weight: 25 },
    { category: 'combat', enemy: GameState.ENEMY_GOBLIN_BLUE, weight: 25 },
    { category: 'combat', enemy: GameState.ENEMY_GOBLIN_PURPLE, weight: 25 }
  ];

  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      name: heroName,
      gender: gender,
      level: 1,
      health: 100,
      attack: 5,
      attack_speed: 1500, // in Milliseconds because of Interval Ticks
      attack_cooldown: 1500,
      image: (gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL)
    }
    this.location = location;
  }
}

GameState.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default GameState;