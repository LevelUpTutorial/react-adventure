/* Hero */
import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero_male_combat.png';
/* Enemys */
import goblinGreen from './assets/images/enemy_goblin_green.jpg';
import goblinBlue from './assets/images/enemy_goblin_blue.jpg';
import goblinRed from './assets/images/enemy_goblin_red.jpg';
import goblinPurple from './assets/images/enemy_goblin_purple.jpg';
/* sonstiges */
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

  /*
    Complete Story event and set weight to 0
  */
  static markStoryAsCompleted(gameState, encounter_id) {
    const encounter = gameState.random_encounters.find(enc => enc.id === encounter_id);
    if (encounter) {
      encounter.weight = 0; // Set the weight to 0
      encounter.completed = true;
    }
  }

  static STORY_DIALOG_ACT1_1 = {
    title: 'Introduction to the Ruins',
    content: [
      "The once peaceful Hearthfield is now a shadow of its former self. Cultists have ravaged the village, searching for something hidden deep within the ruins.",
      "You stand at the entrance of the forgotten ruins. The wind whispers of lost secrets, and the air carries a sense of unease."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) { // Use a regular function to access 'this'
      // Find the entry with ID 'STORY_ACT1_1' and set its weight to 0
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_1');

      // Add STORY_DIALOG_ACT1_2 to random_encounters
      gameState.random_encounters.push({
        category: 'story',
        id: 'STORY_ACT1_2',
        dialog: GameState.STORY_DIALOG_ACT1_2,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    }
  }

  static STORY_DIALOG_ACT1_2 = {
    title: 'First Clue about the Eclipse',
    content: [
      "A strange symbol etched into the ruin’s stone hints at a larger force at play. The cult speaks of the Eclipse Beyond, a force that could unravel reality.",
      "You examine the symbol closely. Its design is unlike anything you've seen, the two intersecting lines almost seem to... shimmer as if alive."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) {
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_2');
      gameState.random_encounters.push({
        category: 'story',
        id: 'STORY_ACT1_3',
        dialog: GameState.STORY_DIALOG_ACT1_3,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    },
  }

  static STORY_DIALOG_ACT1_3 = {
    title: 'Cultist Confrontation',
    content: [
      "The cultists are relentless, but you manage to take one captive. In his dying breath, he mutters about 'the twin star.'",
      "The cultist glares at you. 'The twin star... you don't understand, it's already begun...' His words fade into the wind."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) {
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_3');
      gameState.random_encounters.push({
        category: 'story',
        id: 'STORY_ACT1_4',
        dialog: GameState.STORY_DIALOG_ACT1_4,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    },
  }

  static STORY_DIALOG_ACT1_4 = {
    title: 'The Village’s Betrayal',
    content: [
      "The mayor of Hearthfield has been aiding the cult. His betrayal runs deeper than anyone knew, and now the village is doomed.",
      "The mayor's eyes flicker with regret. 'I never wanted this... but they promised salvation. I had no choice.'"
    ],
    background: '',
    completed: false,

    onClose: function (gameState) {
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_4');
      gameState.random_encounters.push({
        category: 'story',
        id: 'STORY_ACT1_5',
        dialog: GameState.STORY_DIALOG_ACT1_5,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    }
  }

  static STORY_DIALOG_ACT1_5 = {
    title: 'Discovery of the Shrine',
    content: [
      "Hidden in the woods, an ancient shrine lies abandoned. Its carvings speak of two bound souls destined to determine the fate of the world.",
      "As you kneel before the shrine, a sense of foreboding fills your chest. The carvings seem to pulse with an eerie energy."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) {
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_5');
      gameState.random_encounters.push({
        category: 'story',
        id: 'STORY_ACT1_6',
        dialog: GameState.STORY_DIALOG_ACT1_6,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    }
  }

  static STORY_DIALOG_ACT1_6 = {
    title: 'A Dangerous Path Ahead',
    content: [
      "The path ahead leads deeper into the cult’s influence. The ruins are just the beginning of something far darker, and the Eclipse is drawing near.",
      "With resolve in your heart, you step forward. There is no turning back now, the fate of Hearthfield and the world hangs in the balance."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) {
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_6');
      // advance to act 2 TODO
    }
  }

  static STORY_DIALOG_ACT1_SECRET = {
    title: 'Hidden shrine in the woods',
    content: [
      "A cryptic prophecy carved into stone speaks of two stars, a choice to bind or break, and a power beyond comprehension.",
      "The carvings glow faintly. 'Two bound by fate shall determine the end... or the beginning.' The meaning is unclear, but the weight of it lingers."
    ],
    background: '',
    completed: false,

    onClose: function (gameState) { // Use a regular function to access 'this'
      GameState.markStoryAsCompleted(gameState, 'STORY_ACT1_SECRET');
    }
  }

  next_encounters = [];

  static STORY_DIALOG_DEFAULT_WEIGHT = 25;
  random_encounters = [
    { category: 'combat', id: 'GOBLIN_GREEN', enemy: GameState.ENEMY_GOBLIN_GREEN, weight: 25 },
    { category: 'combat', id: 'GOBLIN_RED', enemy: GameState.ENEMY_GOBLIN_RED, weight: 25 },
    { category: 'combat', id: 'GOBLIN_BLUE', enemy: GameState.ENEMY_GOBLIN_BLUE, weight: 25 },
    { category: 'combat', id: 'GOBLIN_PURPLE', enemy: GameState.ENEMY_GOBLIN_PURPLE, weight: 25 },
    { category: 'story', id: 'STORY_ACT1_1', dialog: GameState.STORY_DIALOG_ACT1_1, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false },
    { category: 'story', id: 'STORY_ACT1_SECRET', dialog: GameState.STORY_DIALOG_ACT1_SECRET, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false}
  ];

  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      isInDialog: false,
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