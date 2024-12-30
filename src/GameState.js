/* Hero */
/* Hero Gear Tier 0 */ 
import heroFemaleNeutral from './assets/images/hero/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero/hero_male_combat.png';
/* Hero Gear Tier 1 */
import heroFemaleCombatT1Fire from './assets/images/hero/hero_female_combat_fire_t1.webp';
import heroFemaleComabtT1Ice from './assets/images/hero/hero_female_combat_ice_t1.webp';
import heroFemaleCombatT1Lightning from './assets/images/hero/hero_female_combat_lightning_t1.webp';
import heroMaleCombatT1Fire from './assets/images/hero/hero_male_combat_fire_t1.webp';
import heroMaleCombatT1Ice from './assets/images/hero/hero_male_combat_ice_t1.webp';
import heroMaleCombatT1Lightning from './assets/images/hero/hero_male_combat_lightning_t1.webp'; 
/* Hero Gear Tier 2 */
/* Hero Gear Tier 3 */
/* Placeholder */
import enemyPlaceholder from './assets/images/enemy_placeholder_card.webp'; 
/* Enemys Act 1 */
import enemyWildBoar from './assets/images/act1/enemy_wild_boar.webp';
import enemyPlagueCrow from './assets/images/act1/enemy_plague_crow.webp';
import enemyGoblinScout from './assets/images/act1/enemy_goblin_scout.webp';
import enemyWildWolf from './assets/images/act1/enemy_wild_wolf.webp';
import enemyMischievousFaerie from './assets/images/act1/src/assets/images/act1/enemy_mischievous_faerie_sprite.webp'; 
import enemyCorruptedForestGuardian from './assets/images/act1/enemy_corrupted_forest_guardian.webp';
import enemyBanditCaptain from './assets/images/act1/enemy_bandit_captian.webp';
import enemyDarkAcolyte from './assets/images/act1/enemy_dark_acolyte.webp';
/* Enemies Act 2 */ 
import enemySandshardStalker from './assets/images/act2/enemy_sandshard_stalker.webp';
import enemyGlassfangVulture from './assets/images/act2/enemy_glassfang_vulture.webp';
import enemyFragmentedSandguardian from './assets/images/act2/enemy_fragmented_sandguardian.webp';
import enemyCinderhound from './assets/images/act2/enemy_cinderhound.webp';
import enemyDuneWraith from './assets/images/act2/enemy_dune_wraith.webp';
import enemyEclipseRevenant from './assets/images/act2/enemy_eclipse_revenant.webp';
import enemyDarkAcolyte2 from './assets/images/act2/enemy_dark_acolyte.webp';
/* Enemies Act 3 */
import enemySnowWarg from './assets/images/act3/enemy_snow_warg.webp';
import enemyIceboundConstruct from './assets/images/act3/enemy_icebound_construct.webp';
import enemyShroudboundHerald from './assets/images/act3/enemy_shroudbound_herald.webp';
import enemyDarkAcolyte3 from './assets/images/act3/enemy_dark_acolyte.webp';
import enemyFrostElemental from './assets/images/act3/enemy_frost_elemental.webp';
import enemyAvalancheBehemoth from './assets/images/act3/enemy_avalanche_behemoth.webp';
import enemyEclipsedFrostguard from './assets/images/act3/enemy_eclipsed_frostguard.webp';
/* Enemies Act 4 */
import enemyDarkAcolyte4 from './assets/images/act4/enemy_dark_acolyte.webp';
/* Enemies Act 5 */
/* Enemies Act 6 */ 
/* Enemies Act 7 */ 
/* Enemies Act 8 */ 
/* LOCATIONS */
// TODO change city background ws and po when available 
import backgroundCityws from './assets/images/backgrounds/background-act1-ws.webp';
import backgroundCitypo from './assets/images/backgrounds/background-act1-po.webp';
import backgroundAct1ws from './assets/images/backgrounds/background-act1-ws.webp';
import backgroundAct1po from './assets/images/backgrounds/background-act1-po.webp';
import backgroundAct2ws from './assets/images/backgrounds/background-act2-ws.webp';
import backgroundAct2po from './assets/images/backgrounds/background-act2-po.webp';
import backgroundAct3ws from './assets/images/backgrounds/background-act3-ws.webp';
import backgroundAct3po from './assets/images/backgrounds/background-act3-po.webp';
import backgroundAct4ws from './assets/images/backgrounds/background-act4-ws.webp';
import backgroundAct4po from './assets/images/backgrounds/background-act4-po.webp';
import backgroundAct5ws from './assets/images/backgrounds/background-act5-ws.webp'; 
import backgroundAct5po from './assets/images/backgrounds/background-act5-po.webp';
import backgroundAct6ws from './assets/images/backgrounds/background-act6-ws.webp';
import backgroundAct6po from './assets/images/backgrounds/background-act6-po.webp';
import backgroundAct7ws from './assets/images/backgrounds/background-act7-ws.webp';
import backgroundAct7po from './assets/images/backgrounds/background-act7-po.webp';
import backgroundAct8ws from './assets/images/backgrounds/background-act8-ws.webp';
import backgroundAct8po from './assets/images/backgrounds/background-act8-po.webp';
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
  static LOCATION_CITY = {name: GameState.CITY_NAME, bg_widescreen: backgroundCityws, bg_portrait: backgroundCitypo};
  static LOCATION_ADVENTURE_ACT1 = {name: GameState.ACT1_LOC1_NAME, bg_widescreen: backgroundAct1ws, bg_portrait: backgroundAct1po};
  static LOCATION_ADVENTURE_ACT2 = {name: GameState.ACT2_LOC1_NAME, bg_widescreen: backgroundAct2ws, bg_portrait: backgroundAct2po};
  static LOCATION_ADVENTURE_ACT3 = {name: GameState.ACT3_LOC1_NAME, bg_widescreen: backgroundAct3ws, bg_portrait: backgroundAct3po};
  static LOCATION_ADVENTURE_ACT4 = {name: GameState.ACT4_LOC1_NAME, bg_widescreen: backgroundAct4ws, bg_portrait: backgroundAct4po};
  static LOCATION_ADVENTURE_ACT5 = {name: GameState.ACT5_LOC1_NAME, bg_widescreen: backgroundAct5ws, bg_portrait: backgroundAct5po};
  static LOCATION_ADVENTURE_ACT6 = {name: GameState.ACT6_LOC1_NAME, bg_widescreen: backgroundAct6ws, bg_portrait: backgroundAct6po};
  static LOCATION_ADVENTURE_ACT7 = {name: GameState.ACT7_LOC1_NAME, bg_widescreen: backgroundAct7ws, bg_portrait: backgroundAct7po};
  static LOCATION_ADVENTURE_ACT8 = {name: GameState.ACT8_LOC1_NAME, bg_widescreen: backgroundAct8ws, bg_portrait: backgroundAct8po};
  static DEFAULT_LOCATION = GameState.LOCATION_CITY;

  /* Asset Constants */
  static IMG_HERO_FEMALE_NEUTRAL = heroFemaleNeutral;
  static IMG_HERO_MALE_NEUTRAL = heroMaleNeutral;
  static IMG_HERO_FEMALE_COMBAT = heroFemaleCombat;
  static IMG_HERO_MALE_COMBAT = heroMaleCombat;

  active_enemy = null;
  /* Enemy Templates Act1 */ 
  static ENEMY_WILD_BOAR = {
    name: 'Wild Boar',
    level: 1,
    health: 10,
    xp_reward: 9, 
    attack: 5,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyWildBoar
  }
  static ENEMY_PLAGUE_CROW = {
    name: 'Plague Crow',
    level: 2,
    health: 15,
    xp_reward: 13, 
    attack: 3,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyPlagueCrow
  }
  static ENEMY_GOBLIN_SCOUT = {
    name: 'Goblin Scout',
    level: 4,
    health: 15,
    xp_reward: 17, 
    attack: 7,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyGoblinScout
  }
  static ENEMY_WILD_WOLF = {
    name: 'Wild Wolf',
    level: 4,
    health: 20,
    xp_reward: 21, 
    attack: 7,
    attack_speed: 700,
    attack_cooldown: 700,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyWildWolf
  }
  static ENEMY_MISCHIEVOUS_FAERIE = {
    name: 'Mischievous Faerie',
    level: 5,
    health: 25,
    xp_reward: 29, 
    attack: 6,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyMischievousFaerie
  }
  static ENEMY_CORRUPTED_FOREST_GUARDIAN = {
    name: 'Corrupted Forest Guardian',
    level: 7,
    health: 40,
    xp_reward: 45, 
    attack: 50,
    attack_speed: 3000,
    attack_cooldown: 3000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCorruptedForestGuardian
  }
  static ENEMY_BANDIT_CAPTAIN = {
    name: 'Bandit Captain',
    level: 9,
    health: 55,
    xp_reward: 63, 
    attack: 30,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyBanditCaptain
  }
  static ENEMY_DARK_ACOLYTE = {
    name: 'Dark Acolyte',
    level: 10,
    xp_reward: 73, 
    health: 150,
    attack: 50,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte
  }
  /* Enemy Templates Act2 */
  static ENEMY_SANDSHARD_STALKER = {
    name: 'Sandshard Stalker',
    level: 10,
    xp_reward: 75, 
    health: 90,
    attack: 30,
    attack_speed: 600,
    attack_cooldown: 600,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySandshardStalker
  }
  static ENEMY_GLASSFANG_VULTURE = {
    name: 'Glassfang Vulture',
    level: 12,
    xp_reward: 90, 
    health: 160,
    attack: 80,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyGlassfangVulture
  }
  static ENEMY_FRAGMENTED_SANDGUARDIAN = {
    name: 'Fragmented Sandguardian',
    level: 14,
    xp_reward: 130, 
    health: 250,
    attack: 150,
    attack_speed: 3000,
    attack_cooldown: 3000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyFragmentedSandguardian
  }
  static ENEMY_CINDERHOUND = {
    name: 'Cinderhound',
    level: 15,
    xp_reward: 150, 
    health: 180,
    attack: 90,
    attack_speed: 900,
    attack_cooldown: 900,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCinderhound
  }
  static ENEMY_DUNE_WRAITH = {
    name: 'Dune Wraith',
    level: 17,
    xp_reward: 180, 
    health: 220,
    attack: 110,
    attack_speed: 1700,
    attack_cooldown: 1700,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDuneWraith
  }
  static ENEMY_ECLIPSED_REVENANT = {
    name: 'Eclipsed Revenant',
    level: 18,
    xp_reward: 190, 
    health: 230,
    attack: 120,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyEclipseRevenant
  }
  static ENEMY_DARK_ACOLYTE2 = {
    name: 'Dark Acolyte',
    level: 20,
    xp_reward: 250, 
    health: 350,
    attack: 160,
    attack_speed: 1700,
    attack_cooldown: 1700,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte2
  }
  /* Enemy Templates Act3 */
  static ENEMY_SNOW_WARG = {
    name: 'Snow Warg',
    level: 18,
    xp_reward: 210, 
    health: 250,
    attack: 130,
    attack_speed: 900,
    attack_cooldown: 900,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySnowWarg
  }
  static ENEMY_ICEBOUND_CONSTRUCT = {
    name: 'Icebound Construct',
    level: 20,
    xp_reward: 270, 
    health: 400,
    attack: 160,
    attack_speed: 2500,
    attack_cooldown: 2500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyIceboundConstruct
  }
  static ENEMY_SHROUDBOUND_HERALD = {
    name: 'Shroudbound Herald',
    level: 20,
    xp_reward: 290, 
    health: 350,
    attack: 150,
    attack_speed: 1100,
    attack_cooldown: 1100,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyShroudboundHerald
  }
  static ENEMY_DARK_ACOLYTE3 = {
    name: 'Dark Acolyte',
    level: 21,
    xp_reward: 310, 
    health: 390,
    attack: 180,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte3
  }
  static ENEMY_FROST_ELEMENTAL = {
    name: 'Frost Elemental',
    level: 23,
    xp_reward: 330, 
    health: 450,
    attack: 200,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyFrostElemental
  }
  static ENEMY_AVALANCHE_BEHEMOTH = {
    name: 'Avalanche Behemoth',
    level: 23,
    xp_reward: 350, 
    health: 500,
    attack: 250,
    attack_speed: 2500,
    attack_cooldown: 2500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyAvalancheBehemoth
  }
  static ENEMY_ECLIPSED_FROSTGUARD = {
    name: 'Eclipsed Frostguard',
    level: 25,
    xp_reward: 370, 
    health: 550,
    attack: 300,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyEclipsedFrostguard
  }
    /* Enemy Templates Act4 */
  static ENEMY_DARK_ACOLYTE4 = {
    name: 'Dark Acolyte',
    level: 35,
    xp_reward: 740, 
    health: 1000,
    attack: 600,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte4
  }
  /* Enemy Templates Act5 */
  /* Enemy Templates Act6 */
  /* Enemy Templates Act7 */
  /* Enemy Templates Act8 */
  /* Enemy Templates Placeholder */
  static ENEMY_PLACEHOLDER  = {
    name: 'Random Enemy',
    level: 50,
    health: 5000,
    xp_reward: 5000, 
    attack: 2000,
    attack_speed: 5000,
    attack_cooldown: 5000,
    evade_chance: 40, 
    crit_chance: 30, 
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
    { category: 'combat', id: 'WILD_BOAR', enemy: GameState.ENEMY_WILD_BOAR, weight: 50 },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 50 },
    { category: 'combat', id: 'GOBLIN_SCOUT', enemy: GameState.ENEMY_GOBLIN_SCOUT, weight: 50 },
    { category: 'combat', id: 'WILD_WOLF', enemy: GameState.ENEMY_WILD_WOLF, weight: 40 },
    { category: 'combat', id: 'MISCHIEVOUS_FAERIE', enemy: GameState.ENEMY_MISCHIEVOUS_FAERIE, weight: 40 },
    { category: 'combat', id: 'CORRUPTED_FOREST_GUARDIAN', enemy: GameState.ENEMY_CORRUPTED_FOREST_GUARDIAN, weight: 20 },
    { category: 'combat', id: 'BANDIT CAPTIAN', enemy: GameState.ENEMY_BANDIT_CAPTAIN, weight: 10 },
    { category: 'combat', id: 'DARK_ACOLYTE', enemy: GameState.ENEMY_DARK_ACOLYTE, weight: 5 },
    { category: 'story', id: 'STORY_ACT1_1', dialog: GameState.STORY_DIALOG_ACT1_1, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false },
    { category: 'story', id: 'STORY_ACT1_SECRET', dialog: GameState.STORY_DIALOG_ACT1_SECRET, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false}
  ];
  static ACT2_ENCOUNTERS = [
    { category: 'combat', id: 'SANDSHARD STALKER', enemy: GameState.ENEMY_SANDSHARD_STALKER, weight: 50 },
    { category: 'combat', id: 'GLASSFANG VULTURE', enemy: GameState.ENEMY_GLASSFANG_VULTURE, weight: 50 },
    { category: 'combat', id: 'FRAGMENTED SANDGUARDIAN', enemy: GameState.ENEMY_FRAGMENTED_SANDGUARDIAN, weight: 40 },
    { category: 'combat', id: 'CINDERHOUND', enemy: GameState.ENEMY_CINDERHOUND, weight: 40 },
    { category: 'combat', id: 'DUNE WRAITH', enemy: GameState.ENEMY_DUNE_WRAITH, weight: 20 },
    { category: 'combat', id: 'ECLIPSED REVENANT', enemy: GameState.ENEMY_ECLIPSED_REVENANT, weight: 15 },
    { category: 'combat', id: 'DARK ACOLYTE 2', enemy: GameState.ENEMY_DARK_ACOLYTE2, weight: 5 },
  ];
  static ACT3_ENCOUNTERS = [
    { category: 'combat', id: 'SNOW WARG', enemy: GameState.ENEMY_SNOW_WARG, weight: 50 },
    { category: 'combat', id: 'ICEBOUND CONSTRUC', enemy: GameState.ENEMY_ICEBOUND_CONSTRUCT, weight: 45 },
    { category: 'combat', id: 'SHROUDBOUND HERALD', enemy: GameState.ENEMY_SHROUDBOUND_HERALD, weight: 45 },
    { category: 'combat', id: 'DARK ACOLYTE 3', enemy: GameState.ENEMY_DARK_ACOLYTE3, weight: 45 },
    { category: 'combat', id: 'FROST ELEMENTAL', enemy: GameState.ENEMY_FROST_ELEMENTAL, weight: 30 },
    { category: 'combat', id: 'AVALANCHE BEHEMOUTH', enemy: GameState.ENEMY_AVALANCHE_BEHEMOTH, weight: 30 },
    { category: 'combat', id: 'ECLIPSED FROSTGUARD', enemy: GameState.ENEMY_ECLIPSED_FROSTGUARD, weight: 10 },
  ];
  static ACT4_ENCOUNTERS = [
    { category: 'combat', id: 'ENEMY_DARK_AKOLYTE 4', enemy: GameState.ENEMY_DARK_ACOLYTE4, weight: 25 }
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

  static XP_TO_LEVEL2 = 75; 
  static XP_SCALING = 1.3; 
    
  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      isInDialog: false,
      name: heroName,
      gender: gender,
      level: 1, 
      xp: 0, 
      xp_to_levelup: GameState.XP_TO_LEVEL2, 
      health: 100,
      health_full: 100, 
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
