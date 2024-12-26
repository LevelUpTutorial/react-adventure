/* Hero */
import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero_male_combat.png';
/* Enemys */
import goblinGreen from './assets/images/enemy_goblin_green.webp';
import goblinBlue from './assets/images/enemy_goblin_blue.jpg';
import goblinRed from './assets/images/enemy_goblin_red.jpg';
import goblinPurple from './assets/images/enemy_goblin_purple.jpg';
import enemyPlaceholder from './assets/images/enemy_placeholder_card.webp'; 
import enemyBanditCaptain from './assets/images/enemy_bandit_captian.webp';
import enemyDarkAcolyte from './assets/images/enemy_dark_acolyte.webp';
import enemyWildWolf from './assets/images/enemy_wild_wolf.webp';
import enemyPlagueCrow from './assets/images/enemy_plague_crow.webp';
/* LOCATIONS */
import backgroundCity from './assets/images/background-default.jpg';
import backgroundAct1ws from './assets/images/background-act1-ws.webp';
import backgroundAct2ws from './assets/images/background-act2-ws.webp';
import backgroundAct3ws from './assets/images/background-act3-ws.webp';
import backgroundAct3sq from './assets/images/background-act3-sq.webp';
import backgroundAct4sq from './assets/images/background-act4-sq.webp';
import backgroundAct5sq from './assets/images/background-act5-sq.webp';
import backgroundAct6 from './assets/images/background-act6.webp';
import backgroundAct7 from './assets/images/background-act7.webp';
import backgroundAct8 from './assets/images/background-act8.webp';
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
  static CITY_NAME = 'City';
  static ACT1_LOC1_NAME = 'Act 1: Hearthfield Plains'; 
  static ACT2_LOC1_NAME = 'Act 2: The Crimson Dunes';
  static ACT3_LOC1_NAME = 'Act 3: Frostspire Peaks';
  static ACT4_LOC1_NAME = 'Act 4: The Whispering Forest';
  static ACT5_LOC1_NAME = 'Act 5: The Marshes of Ebonreach';
  static ACT6_LOC1_NAME = 'Act 6: The Radiant Spire';
  static ACT7_LOC1_NAME = 'Act 7: The Shattered Steppe';
  static ACT8_LOC1_NAME = 'Act 8: The Eclipse Gate';
  static LOCATION_CITY = {name: GameState.CITY_NAME, background: backgroundCity};
  static LOCATION_ADVENTURE_ACT1 = {name: GameState.ACT1_LOC1_NAME, background: backgroundAct1ws};
  static LOCATION_ADVENTURE_ACT2 = {name: GameState.ACT2_LOC1_NAME, background: backgroundAct2ws};
  static LOCATION_ADVENTURE_ACT3 = {name: GameState.ACT3_LOC1_NAME, background: backgroundAct3ws};
  static LOCATION_ADVENTURE_ACT4 = {name: GameState.ACT4_LOC1_NAME, background: backgroundAct4sq};
  static LOCATION_ADVENTURE_ACT5 = {name: GameState.ACT5_LOC1_NAME, background: backgroundAct5sq};
  static LOCATION_ADVENTURE_ACT6 = {name: GameState.ACT6_LOC1_NAME, background: backgroundAct6};
  static LOCATION_ADVENTURE_ACT7 = {name: GameState.ACT7_LOC1_NAME, background: backgroundAct7};
  static LOCATION_ADVENTURE_ACT8 = {name: GameState.ACT8_LOC1_NAME, background: backgroundAct8};
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
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: goblinGreen
  }
  static ENEMY_GOBLIN_BLUE  = {
    name: 'Goblin Blue',
    level: 1,
    health: 30,
    attack: 15,
    attack_speed: 2500,
    attack_cooldown: 2500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: goblinBlue
  }
  static ENEMY_GOBLIN_RED  = {
    name: 'Goblin Red',
    level: 1,
    health: 20,
    attack: 5,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: goblinRed
  }
  static ENEMY_GOBLIN_PURPLE  = {
    name: 'Goblin Purple',
    level: 1,
    health: 40,
    attack: 20,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: goblinPurple
  }
  static ENEMY_PLAGUE_CROW  = {
    name: 'Plague Crow',
    level: 1,
    health: 10,
    attack: 5,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyPlagueCrow
  }
  static ENEMY_WILD_WOLF  = {
    name: 'Wild Wolf',
    level: 2,
    health: 20,
    attack: 10,
    attack_speed: 750,
    attack_cooldown: 750,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyWildWolf
  }
  static ENEMY_BANDIT_CAPTAIN  = {
    name: 'Bandit Captain',
    level: 3,
    health: 30,
    attack: 10,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyBanditCaptain
  }
  static ENEMY_DARK_ACOLYTE  = {
    name: 'Dark Acolyte',
    level: 5,
    health: 50,
    attack: 20,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte
  }
  static ENEMY_PLACEHOLDER  = {
    name: 'Random Enemy',
    level: 1,
    health: 50,
    attack: 20,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyPlaceholder
  }

/*
  
*/
static findEncounterList(gameState, location_id) {
  const entry = gameState.random_encounters.find(enc => enc.location === location_id);
  console.log(`findEncounterList: ${entry}`);
  const rnd_encounters = entry.encounters;
  console.log(`findEncounterList: ${rnd_encounters}`);
  return rnd_encounters;
}

  /*
    Complete Story event and set weight to 0
  */
  static markStoryAsCompleted(gameState, location_id, encounter_id) {
    const encounter_list = GameState.findEncounterList(gameState, location_id);
    
    const encounter = encounter_list.find(enc => enc.id === encounter_id);
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_1');

      // Add STORY_DIALOG_ACT1_2 to random_encounters
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_2');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_3');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_4');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_5');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_6');
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
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_SECRET');
    }
  }

  static STORY_DIALOG_DEFAULT_WEIGHT = 25;
  static ACT1_ENCOUNTERS = [
    { category: 'combat', id: 'GOBLIN_GREEN', enemy: GameState.ENEMY_GOBLIN_GREEN, weight: 25 },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 25 },
    { category: 'combat', id: 'WILD_WOLF', enemy: GameState.ENEMY_WILD_WOLF, weight: 25 },
    { category: 'combat', id: 'Bandit Captain', enemy: GameState.ENEMY_WILD_WOLF, weight: 5 },
    { category: 'combat', id: 'DARK_ACOLYTE', enemy: GameState.ENEMY_DARK_ACOLYTE, weight: 5 },
    { category: 'story', id: 'STORY_ACT1_1', dialog: GameState.STORY_DIALOG_ACT1_1, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false },
    { category: 'story', id: 'STORY_ACT1_SECRET', dialog: GameState.STORY_DIALOG_ACT1_SECRET, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false}
  ];
  static ACT2_ENCOUNTERS = [
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 30 },
    { category: 'combat', id: 'GOBLIN_RED', enemy: GameState.ENEMY_GOBLIN_RED, weight: 30 },
    { category: 'combat', id: 'GOBLIN_BLUE', enemy: GameState.ENEMY_GOBLIN_BLUE, weight: 5 },
    { category: 'combat', id: 'GOBLIN_PURPLE', enemy: GameState.ENEMY_GOBLIN_PURPLE, weight: 5 },
    { category: 'combat', id: 'DARK_ACOLYTE', enemy: GameState.ENEMY_DARK_ACOLYTE, weight: 20 },
  ];
  static ACT3_ENCOUNTERS = [
    { category: 'combat', id: 'DARK_ACOLYTE', enemy: GameState.ENEMY_DARK_ACOLYTE, weight: 25 },
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 5 }
  ];
  static ACT4_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 25 }
  ];
  static ACT5_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 25 }
  ];
  static ACT6_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 25 }
  ];
  static ACT7_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 25 }
  ];
  static ACT8_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_PLACEHOLDER', enemy: GameState.ENEMY_PLACEHOLDER, weight: 25 }
  ];

  next_encounters = [];
  random_encounters = [
    {location: GameState.ACT1_LOC1_NAME, encounters: GameState.ACT1_ENCOUNTERS},
    {location: GameState.ACT2_LOC1_NAME, encounters: GameState.ACT2_ENCOUNTERS},
    {location: GameState.ACT3_LOC1_NAME, encounters: GameState.ACT3_ENCOUNTERS},
    {location: GameState.ACT4_LOC1_NAME, encounters: GameState.ACT4_ENCOUNTERS},
    {location: GameState.ACT5_LOC1_NAME, encounters: GameState.ACT5_ENCOUNTERS},
    {location: GameState.ACT6_LOC1_NAME, encounters: GameState.ACT6_ENCOUNTERS},
    {location: GameState.ACT7_LOC1_NAME, encounters: GameState.ACT7_ENCOUNTERS},
    {location: GameState.ACT8_LOC1_NAME, encounters: GameState.ACT8_ENCOUNTERS},
  ];

  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      isInDialog: false,
      name: heroName,
      gender: gender,
      level: 1, 
      xp: 0, 
      health: 100,
      attack: 5,
      attack_speed: 1500, // in Milliseconds because of Interval Ticks
      attack_cooldown: 1500,
      evade_chance: 30, 
      crit_chance: 15, 
      crit_damage: 100, 
      last_combat_event: "", 
      image: (gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL)
    }
    this.location = location;
  }
}

GameState.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GameState;
