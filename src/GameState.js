import { 
  mergeList2inList1, updateLocation, ID_NONE, 
  UPGRADE_DAMAGE, UPGRADE_MAX_HEALTH, UPGRADE_CRIT_CHANCE, 
  UPGRADE_CRIT_DAMAGE, UPGRADE_EVADE_CHANCE, UPGRADE_ATTACK_SPEED,
} from './GameUtils.js'; 

/* Hero */
/* Hero Gear Tier 0 */ 
import heroFemaleNeutral from './assets/images/hero/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero/hero_male_neutral.jpg';
import heroFemaleCombat from './assets/images/hero/hero_female_combat.png';
import heroMaleCombat from './assets/images/hero/hero_male_combat.png';
/* Placeholder */
import enemyPlaceholder from './assets/images/enemy_placeholder_card.webp'; 
/* Enemys Act 1 */
import enemyWildBoar from './assets/images/act1/enemy_wild_boar.webp';
import enemyPlagueCrow from './assets/images/act1/enemy_plague_crow.webp';
import enemyGoblinScout from './assets/images/act1/enemy_goblin_scout.webp';
import enemyWildWolf from './assets/images/act1/enemy_wild_wolf.webp';
import enemyMischievousFaerie from './assets/images/act1/enemy_mischievous_faerie_sprite.webp'; 
import enemyCorruptedForestGuardian from './assets/images/act1/enemy_corrupted_forest_guardian.webp';
import enemyBanditCaptain from './assets/images/act1/enemy_bandit_captian.webp';
import enemyDarkAcolyte from './assets/images/act1/enemy_dark_acolyte.webp';
/* Enemies Act 2 */ 
import enemySandshardStalker from './assets/images/act2/enemy_sandshard_stalker.webp';
import enemyGlassfangVulture from './assets/images/act2/enemy_glassfang_vulture.webp';
import enemyFragmentedSentinel from './assets/images/act2/enemy_fragmented_sentinel.webp'; 
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
import enemyKaelithsWraith from './assets/images/act3/enemy_kaeliths_wraith.webp';
import enemyChillrendColossus from './assets/images/act3/enemy_chillrend_colossus.webp';
/* Enemies Act 4 */
import enemyDarkAcolyte4 from './assets/images/act4/enemy_dark_acolyte.webp';
import enemyCreepingVine from './assets/images/act4/enemy_creeping_vine.webp'; 
import enemyEchoedGuardian from './assets/images/act4/enemy_echoed_guardian.webp';
import enemyForestGuardian from './assets/images/act4/enemy_forest_guardian.webp';
import enemyKaelithsShadow from './assets/images/act4/enemy_kaeliths_shadow.webp';
import enemyPhantomStalker from './assets/images/act4/enemy_phantom_stalker.webp';
import enemyShadowSprite from './assets/images/act4/enemy_shadow_sprite.webp';
import enemyTwistedBeast from './assets/images/act4/enemy_twisted_beast.webp';
/* Enemies Act 5 */
import enemyAncientSentinel from './assets/images/act5/enemy_ancient_sentinel.webp'; 
import enemyCollapsedPhantom from './assets/images/act5/enemy_collapsed_phantom.webp'; 
import enemyCultExcavator from './assets/images/act5/enemy_cult_excavator.webp'; 
import enemyRuneWroughtTitan from './assets/images/act5/enemy_rune_wrought_titan.webp'; 
import enemyShadowSpider from './assets/images/act5/enemy_shadow_spider.webp'; 
import enemyTheForsakenArchivist from './assets/images/act5/enemy_the_forsaken_archivist.webp'; 
/* Enemies Act 6 */ 
import enemyEclipsedCultOperative from './assets/images/act6/enemy_eclipsed_cult_operative.webp'; 
import enemyGildedWretch from './assets/images/act6/enemy_gilded_wretch.webp'; 
import enemySkybornHarbinger from './assets/images/act6/enemy_skyborn_harbinger.webp'; 
import enemySunlitPhantom from './assets/images/act6/enemy_sunlit_phantom.webp'; 
import enemySunstoneConstruct from './assets/images/act6/enemy_sunstone_construct.webp'; 
import enemyTyrantsEnforcer from './assets/images/act6/enemy_tyrants_enforcer.webp'; 
/* Enemies Act 7 */ 
import enemyAshWraith from './assets/images/act7/enemy_ash_wraith.webp'; 
import enemyCultPyromancer from './assets/images/act7/enemy_cult_pyromancer.webp'; 
import enemyEclipsedMarauder from './assets/images/act7/enemy_eclipsed_marauder.webp'; 
import enemySteppeCrawler from './assets/images/act7/enemy_steppe_crawler.webp'; 
import enemyStormboundFiend from './assets/images/act7/enemy_stormbound_fiend.webp'; 
import enemyTheHeraldOfDespair from './assets/images/act7/enemy_the_herald_of_despair.webp'; 
/* Enemies Act 8 */ 
import enemyAbyssalWisps from './assets/images/act8/enemy_abyssal_wisps.webp'; 
import enemyCosmicSentinel from './assets/images/act8/enemy_cosmic_sentinel.webp'; 
import enemyEclipseShardlings from './assets/images/act8/enemy_eclipse_shardlings.webp'; 
import enemyRealityFragments from './assets/images/act8/enemy_reality_fragments.webp'; 
import enemyVoidRevenant from './assets/images/act8/enemy_void_revenant.webp'; 
/* Enemies Mid-Act Bosses */
import enemyA1B1TheCorruptedChieftain from './assets/images/mid_act_bosses/act1_boss1_the_corrupted_chieftain.webp'; 
import enemyA2B1TheScorchscaleBehemoth from './assets/images/mid_act_bosses/act2_boss1_the_scorchscale_behemoth.webp'; 
import enemyA3B1FrostclawAlpha from './assets/images/mid_act_bosses/act3_boss1_frostclaw_alpha.webp'; 
import enemyA4B1TheWhisperingEldertree from './assets/images/mid_act_bosses/act4_boss1_the_whispering_eldertree.webp'; 
import enemyA5B1TheObsidianMaw from './assets/images/mid_act_bosses/act5_boss1_the_obsidian_maw.webp'; 
import enemyA6B1TheShardboundOracle from './assets/images/mid_act_bosses/act6_boss1_the_shardbound_oracle.webp'; 
import enemyA7B1TheSteppeTitan from './assets/images/mid_act_bosses/act7_boss1_the_steppe_titan.webp'; 
import enemyA8B1TheRiftbornDevourer from './assets/images/mid_act_bosses/act8_boss1_the_riftborn_devourer.webp'; 
/* Enemies End-Act Bosses */
import enemyA1B2TheCultInfiltrator from './assets/images/act-bosses/act1_boss2_the_cult_infiltrator.webp'; 
import enemyA2B2TheAshbinderPriestess from './assets/images/act-bosses/act2_boss2_the_ashbinder_priestess.webp'; 
import enemyA3B2TheBoundMonk from './assets/images/act-bosses/act3_boss2_the_bound_monk.webp'; 
import enemyA4B2KaelithsNightmare from './assets/images/act-bosses/act4_boss2_kaeliths_nightmare.webp'; 
import enemyA5B2TheKeeperOfTheAbyss from './assets/images/act-bosses/act5_boss2_the_keeper_of_the_abyss.webp'; 
import enemyA6B2TheTyrantKing from './assets/images/act-bosses/act6_boss2_the_tyrant_king.webp'; 
import enemyA7B2TheShroudboundHighPriest from './assets/images/act-bosses/act7_boss2_the_shroudbound_high_priest.webp'; 
import enemyA8B2TheEclipseAvatar from './assets/images/act-bosses/act8_boss2_the_eclipse_avatar.webp'; 
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
  static COMPATABILITY = 0; 
  /* Hero Constants */
  static DEFAULT_NAME = 'Unnamed Hero';
  static GENDER_MALE = 'male';
  static GENDER_FEMALE = 'female';
  static DEFAULT_GENDER = GameState.GENDER_MALE;
  static MAX_LEVEL = 70;
  static XP_TO_LEVEL2 = 65; 
  static XP_SCALING = 1.3; 
  static UPGRADE_LIMITS = {
    [UPGRADE_DAMAGE]: 999,
    [UPGRADE_MAX_HEALTH]: 999,
    [UPGRADE_CRIT_CHANCE]: 42,
    [UPGRADE_CRIT_DAMAGE]: 999,
    [UPGRADE_EVADE_CHANCE]: 10,
    [UPGRADE_ATTACK_SPEED]: 30,
  };

  /* Location Constants */
  static CITY_NAME = 'City';
  static ACT1_LOC1_NAME = 'Act 1: Hearthfield Plains'; 
  static ACT2_LOC1_NAME = 'Act 2: The Crimson Dunes';
  static ACT3_LOC1_NAME = 'Act 3: Frostspire Peaks';
  static ACT4_LOC1_NAME = 'Act 4: The Whispering Forest';
  static ACT5_LOC1_NAME = 'Act 5: The Forgotten Underground City';
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

  /* Enemy Templates Act1 */ 
  static ENEMY_WILD_BOAR = {
    name: 'Wild Boar',
    level: 1,
    health: 40,
    xp_reward: 18, 
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
    health: 60,
    xp_reward: 26, 
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
    health: 60,
    xp_reward: 34, 
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
    health: 80,
    xp_reward: 44, 
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
    health: 100,
    xp_reward: 58, 
    attack: 6,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyMischievousFaerie
  }
  static ENEMY_A1B1_THE_CORRUPTED_CHIEFTAIN = {
    name: 'The Corrupted Chieftain (elite)',
    level: 5,
    health: 600,
    xp_reward: 310, 
    attack: 50,
    attack_speed: 3000,
    attack_cooldown: 3000,
    evade_chance: 10, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyA1B1TheCorruptedChieftain, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA1B1TheCorruptedChieftain', 
  }
  static ENEMY_CORRUPTED_FOREST_GUARDIAN = {
    name: 'Corrupted Forest Guardian',
    level: 7,
    health: 160,
    xp_reward: 90, 
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
    health: 220,
    xp_reward: 126, 
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
    xp_reward: 146, 
    health: 600,
    attack: 50,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte
  }
  static ENEMY_A1B2_THE_CULT_INFILTRATOR = {
    name: 'The Cult Infiltrator (Boss)',
    level: 10,
    xp_reward: 1800, 
    health: 900,
    attack: 45,
    attack_speed: 900,
    attack_cooldown: 900,
    evade_chance: 30, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyA1B2TheCultInfiltrator, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA1B2TheCultInfiltrator',  
  }
  /* Enemy Templates Act2 */
  static ENEMY_SANDSHARD_STALKER = {
    name: 'Sandshard Stalker',
    level: 10,
    xp_reward: 150, 
    health: 360,
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
    xp_reward: 180, 
    health: 640,
    attack: 80,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyGlassfangVulture
  }
  static ENEMY_FRAGMENTED_SENTINEL = {
    name: 'Fragmented Sentinel',
    level: 14,
    xp_reward: 260, 
    health: 1000,
    attack: 150,
    attack_speed: 3000,
    attack_cooldown: 3000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyFragmentedSentinel 
  }
  static ENEMY_CINDERHOUND = {
    name: 'Cinderhound',
    level: 15,
    xp_reward: 300, 
    health: 720,
    attack: 90,
    attack_speed: 900,
    attack_cooldown: 900,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCinderhound
  }
  static ENEMY_A2B1_THE_SCORCHSCALE_BEHEMOTH = {
    name: 'The Scourchscale Behemoth (elite)',
    level: 15,
    health: 2000,
    xp_reward: 1500, 
    attack: 320,
    attack_speed: 3000,
    attack_cooldown: 3000,
    evade_chance: 10, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyA2B1TheScorchscaleBehemoth, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA2B1TheScorchscaleBehemoth', 
  }
  static ENEMY_DUNE_WRAITH = {
    name: 'Dune Wraith',
    level: 17,
    xp_reward: 720, 
    health: 440,
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
    xp_reward: 380, 
    health: 920,
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
    xp_reward: 500, 
    health: 1400,
    attack: 160,
    attack_speed: 1700,
    attack_cooldown: 1700,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte2
  }
  static ENEMY_A2B2_THE_ASHBINDER_PRIESTESS = {
    name: 'The Ashbinder Priestess (Boss)',
    level: 20,
    health: 4200,
    xp_reward: 2500, 
    attack: 280,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA2B2TheAshbinderPriestess, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA2B2TheAshbinderPriestess', 
  }
  /* Enemy Templates Act3 */
  static ENEMY_SNOW_WARG = {
    name: 'Snow Warg',
    level: 18,
    xp_reward: 420, 
    health: 1000,
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
    xp_reward: 440, 
    health: 1600,
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
    xp_reward: 580, 
    health: 1400,
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
    xp_reward: 620, 
    health: 1560,
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
    xp_reward: 660, 
    health: 1800,
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
    xp_reward: 700, 
    health: 2000,
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
    xp_reward: 740, 
    health: 2200,
    attack: 300,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyEclipsedFrostguard
  }
  static ENEMY_A3B1_FROSTCLAW_ALPHA = {
    name: 'Frostclaw Alpha (elite)',
    level: 25,
    health: 1500,
    xp_reward: 1000, 
    attack: 230,
    attack_speed: 1100,
    attack_cooldown: 1100,
    evade_chance: 30, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyA3B1FrostclawAlpha, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA3B1FrostclawAlpha', 
  }
  static ENEMY_KAELITHS_WRAITH = {
    name: "Kaelith's Wraith",
    level: 27,
    xp_reward: 890, 
    health: 2600,
    attack: 300,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyKaelithsWraith
  }
  static ENEMY_CHILLREND_COLOSSUS = {  
    name: 'Chillrend Colossus',
    level: 28,
    xp_reward: 950, 
    health: 3800,
    attack: 450,
    attack_speed: 3500,
    attack_cooldown: 3500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyChillrendColossus 
  }
  static ENEMY_A3B2_THE_BOUND_MONK = {
    name: 'The Bound Monk (Boss)',
    level: 30,
    health: 7200,
    xp_reward: 5000, 
    attack: 450,
    attack_speed: 2500,
    attack_cooldown: 2500,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA3B2TheBoundMonk, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA3B2TheBoundMonk', 
  }
  /* Enemy Templates Act4 */
  static ENEMY_SHADOW_SPRITE = {
    name: 'Shadow Sprite',
    level: 30,
    xp_reward: 1100, 
    health: 2600,
    attack: 300,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyShadowSprite,
  }
  static ENEMY_CREEPING_VINE = {
    name: 'Creeping Vine',
    level: 31,
    xp_reward: 1100, 
    health: 2800,
    attack: 310,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCreepingVine,
  }
  static ENEMY_PHANTOM_STALKER = {
    name: 'Phantom Stalker',
    level: 33,
    xp_reward: 1450, 
    health: 3700,
    attack: 590,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyPhantomStalker,
  }
  static ENEMY_TWISTED_BEAST = {
    name: 'Twisted Beast',
    level: 33,
    xp_reward: 1550, 
    health: 3700,
    attack: 250,
    attack_speed: 500,
    attack_cooldown: 500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyTwistedBeast,
  }
  static ENEMY_DARK_ACOLYTE4 = {
    name: 'Dark Acolyte',
    level: 35,
    xp_reward: 1660, 
    health: 4000,
    attack: 600,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyDarkAcolyte4
  }
  static ENEMY_A4B1_THE_WHISPERING_ELDERTREE = {
    name: 'The Whispering Eldertree (elite)',
    level: 35,
    health: 9000,
    xp_reward: 3000, 
    attack: 1200,
    attack_speed: 2500,
    attack_cooldown: 2500,
    evade_chance: 25, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyA4B1TheWhisperingEldertree, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA4B1TheWhisperingEldertree', 
  }
  static ENEMY_ECHOED_GUARDIAN = {
    name: 'Echoed Guardian',
    level: 36,
    xp_reward: 1800, 
    health: 4500,
    attack: 800,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyEchoedGuardian,
  }
  static ENEMY_KAELITHS_SHADOW = {
    name: "Kaelith's Shadow",
    level: 38,
    xp_reward: 2000, 
    health: 4800,
    attack: 800,
    attack_speed: 1100,
    attack_cooldown: 1100,
    evade_chance: 20, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyKaelithsShadow,
  }  
  static ENEMY_A4B2_KAELITHS_NIGHTMARE = {
    name: "Kaelith's Nightmare (Boss)",
    level: 40,
    health: 9000,
    xp_reward: 4000, 
    attack: 1000,
    attack_speed: 1300,
    attack_cooldown: 1300,
    evade_chance: 30, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA4B2KaelithsNightmare, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA4B2KaelithsNightmare',
  }
  /* Enemy Templates Act5 */
  static ENEMY_ANCIENT_SENTINEL = {
    name: "Ancient Sentinel",
    level: 40,
    xp_reward: 2290, 
    health: 5000,
    attack: 880,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyAncientSentinel,
  }
  static ENEMY_COLLAPSED_PHANTOM = {
    name: "Collapsed Phantom",
    level: 41,
    xp_reward: 2360, 
    health: 5100,
    attack: 910,
    attack_speed: 1400,
    attack_cooldown: 1400,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCollapsedPhantom,
  }
  static ENEMY_SHADOW_SPIDER = {
    name: "Shadow Spider",
    level: 42,
    xp_reward: 2550, 
    health: 5800,
    attack: 1100,
    attack_speed: 1900,
    attack_cooldown: 1900,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyShadowSpider,
  }
  static ENEMY_CULT_EXCAVATOR = {
    name: "Cult Excavator",
    level: 43,
    xp_reward: 2670, 
    health: 5800,
    attack: 1100,
    attack_speed: 1400,
    attack_cooldown: 1400,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyCultExcavator,
  }
  static ENEMY_A5B1_THE_OBSIDIAN_MAW = {
    name: 'The Obsidian Maw (elite)',
    level: 43,
    health: 10000,
    xp_reward: 3500, 
    attack: 1450,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 25, 
    crit_chance: 35, 
    crit_damage: 50,
    image: enemyA5B1TheObsidianMaw, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA5B1TheObsidianMaw', 
  }
  static ENEMY_RUNE_WROUGHT_TITAN = {
    name: "Rune-Wrought Titan",
    level: 45,
    xp_reward: 3070, 
    health: 7000,
    attack: 2000,
    attack_speed: 2100,
    attack_cooldown: 2100,
    evade_chance: 10, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyRuneWroughtTitan,
  }
  static ENEMY_THE_FORSAKEN_ARCHIVIST = {
    name: "Forsaken Archivist",
    level: 45,
    xp_reward: 3090, 
    health: 6300,
    attack: 1250,
    attack_speed: 1400,
    attack_cooldown: 1400,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyTheForsakenArchivist,
  }
  static ENEMY_A5B2_THE_KEEPER_OF_THE_ABYSS = {
    name: "The Keeper of the Abyss (Boss)",
    level: 45,
    health: 15000,
    xp_reward: 8000, 
    attack: 1900,
    attack_speed: 1800,
    attack_cooldown: 1800,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA5B2TheKeeperOfTheAbyss, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA5B2TheKeeperOfTheAbyss',
  }
  /* Enemy Templates Act6 */
  static ENEMY_GILDED_WRETCH = {
    name: "Gilded Wretch",
    level: 48,
    xp_reward: 3390, 
    health: 6800,
    attack: 1250,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyGildedWretch,
  }
  static ENEMY_SUNSTONE_CONSTRUCT = {
    name: "Sunstone Construct",
    level: 49,
    xp_reward: 3490, 
    health: 7800,
    attack: 1600,
    attack_speed: 1800,
    attack_cooldown: 1800,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySunstoneConstruct,
  }
  static ENEMY_SKYBORN_HARBINGER = {
    name: "Skyborn Harbinger",
    level: 50,
    xp_reward: 3490, 
    health: 7200,
    attack: 1500,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySkybornHarbinger,
  }
  static ENEMY_A6B1_THE_SHARDBOUND_ORACLE = {
    name: 'The Shardbound Oracle (elite)',
    level: 50,
    health: 15000,
    xp_reward: 9000, 
    attack: 1950,
    attack_speed: 1700,
    attack_cooldown: 1700,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA6B1TheShardboundOracle, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA6B1TheShardboundOracle', 
  }
  static ENEMY_TYRANTS_ENFORCER = {
    name: "Tyrant's Enforcer",
    level: 50,
    xp_reward: 3490, 
    health: 7200,
    attack: 1500,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyTyrantsEnforcer,
  }
  static ENEMY_ECLIPSED_CULT_OPERATIVE = {
    name: "Eclipsed Cult Operative",
    level: 51,
    xp_reward: 3610, 
    health: 7820,
    attack: 1350,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 15, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyEclipsedCultOperative,
  }
  static ENEMY_SUNLIT_PHANTOM = {
    name: "Sunlit Phantom",
    level: 53,
    xp_reward: 3830, 
    health: 7860,
    attack: 1470,
    attack_speed: 1300,
    attack_cooldown: 1300,
    evade_chance: 20, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySunlitPhantom,
  }
  static ENEMY_A6B2_THE_TYRANT_KING = {
    name: "The Tyrant King (Boss)",
    level: 53,
    health: 18000,
    xp_reward: 12000, 
    attack: 2300,
    attack_speed: 1400,
    attack_cooldown: 1400,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA6B2TheTyrantKing, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA6B2TheTyrantKing',
  }
  /* Enemy Templates Act7 */
  static ENEMY_STORMBOUND_FIEND = {
    name: "Stormbound Fiend",
    level: 55,
    xp_reward: 4100, 
    health: 9000,
    attack: 1600,
    attack_speed: 1400,
    attack_cooldown: 1400,
    evade_chance: 15, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemyStormboundFiend,
  }
  static ENEMY_STEPPE_CRAWLER = {
    name: "Steppe Crawler",
    level: 55,
    xp_reward: 4050, 
    health: 8800,
    attack: 1600,
    attack_speed: 1700,
    attack_cooldown: 1700,
    evade_chance: 10, 
    crit_chance: 15, 
    crit_damage: 50,
    image: enemySteppeCrawler,
  }
  static ENEMY_ASH_WRAITH = {
    name: "Ash Wraith",
    level: 56,
    xp_reward: 4290, 
    health: 8200,
    attack: 1630,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 20, 
    crit_chance: 25, 
    crit_damage: 50,
    image: enemyAshWraith,
  }
  static ENEMY_CULT_PYROMANCER = {
    name: "Cult Pyromancer",
    level: 56,
    xp_reward: 4410, 
    health: 8800,
    attack: 900,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 65, 
    crit_damage: 50,
    image: enemyCultPyromancer,
  }
  static ENEMY_A7B1_THE_STEPPE_TITAN = {
    name: 'The Steppe Titan (elite)',
    level: 56,
    health: 27500,
    xp_reward: 14000, 
    attack: 2600, 
    attack_speed: 1800,
    attack_cooldown: 1800,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA7B1TheSteppeTitan, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA7B1TheSteppeTitan', 
  }
  static ENEMY_ECLIPSED_MARAUDER = {
    name: "Eclipsed Marauder",
    level: 58,
    xp_reward: 4790, 
    health: 9800,
    attack: 1850,
    attack_speed: 1600,
    attack_cooldown: 1600,
    evade_chance: 10, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyEclipsedMarauder,
  }
  static ENEMY_THE_HERALD_OF_DESPAIR = {
    name: "Herald of Despair",
    level: 59,
    xp_reward: 4930, 
    health: 9800,
    attack: 1950,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 10, 
    crit_chance: 55, 
    crit_damage: 50,
    image: enemyTheHeraldOfDespair,
  }
  static ENEMY_A7B2_THE_SHROUDBOUND_HIGH_PRIEST = {
    name: "The Shroudbound High Priest (Boss)",
    level: 60,
    health: 32000,
    xp_reward: 17000, 
    attack: 1850,
    attack_speed: 1300,
    attack_cooldown: 1300,
    evade_chance: 30, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA7B2TheShroudboundHighPriest, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA7B2TheShroudboundHighPriest',
  }
  /* Enemy  Act8 */
  static ENEMY_REALITY_FRAGMENTS = {
    name: "Reality Fragments",
    level: 60,
    xp_reward: 5110, 
    health: 10000,
    attack: 1700,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 25, 
    crit_chance: 20, 
    crit_damage: 50,
    image: enemyRealityFragments,
  }
  static ENEMY_ABYSSAL_WISPS = {
    name: "Abyssal Wisps",
    level: 60,
    xp_reward: 5110, 
    health: 10000,
    attack: 1700,
    attack_speed: 1000,
    attack_cooldown: 1000,
    evade_chance: 25, 
    crit_chance: 20, 
    crit_damage: 50,
    image: enemyAbyssalWisps,
  }
  static ENEMY_COSMIC_SENTINEL = {
    name: "Cosmic Sentinel",
    level: 62,
    xp_reward: 5490, 
    health: 11200,
    attack: 1990,
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 30, 
    crit_damage: 50,
    image: enemyCosmicSentinel,
  }
  static ENEMY_ECLIPSE_SHARDLINGS = {
    name: "Eclipse Shardlings",
    level: 62,
    xp_reward: 5490, 
    health: 10200,
    attack: 1890,
    attack_speed: 1500,
    attack_cooldown: 1500,
    evade_chance: 15, 
    crit_chance: 30, 
    crit_damage: 50,
    image: enemyEclipseShardlings,
  }
  static ENEMY_A8B1_THE_RIFTBORN_DEVOURER = {
    name: 'The Riftborn Devourer (elite)',
    level: 63,
    health: 35000,
    xp_reward: 19500, 
    attack: 2350, 
    attack_speed: 1900,
    attack_cooldown: 1900,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA8B1TheRiftbornDevourer, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA8B1TheRiftbornDevourer', 
  }
  static ENEMY_VOID_REVENANT = {
    name: "Void Revenant",
    level: 63,
    xp_reward: 5790, 
    health: 11000,
    attack: 2090,
    attack_speed: 1300,
    attack_cooldown: 1300,
    evade_chance: 10, 
    crit_chance: 30, 
    crit_damage: 50,
    image: enemyVoidRevenant,
  }
  static ENEMY_A8B2_THE_ECLIPSE_AVATAR = {
    name: "The Eclipse Avatar (Final-Boss)",
    level: 70,
    health: 60000,
    xp_reward: 30000, 
    attack: 2450,
    attack_speed: 1200,
    attack_cooldown: 1200,
    evade_chance: 25, 
    crit_chance: 45, 
    crit_damage: 50,
    image: enemyA8B2TheEclipseAvatar, 
    isElite: true, 
    runAfterKey: 'runAfterEnemyA8B2TheEclipseAvatar',
  }
  /* Enemy Templates Placeholder */
  static ENEMY_PLACEHOLDER  = {
    name: 'Random Enemy',
    level: 65,
    health: 14000,
    xp_reward: 5950, 
    attack: 2500, 
    attack_speed: 2000,
    attack_cooldown: 2000,
    evade_chance: 10, 
    crit_chance: 50, 
    crit_damage: 50,
    image: enemyPlaceholder
  }

  /* 
    Static registry for post-deserialization logic
    Mapping of enemy keys to functions that should be run after the enemy is defeated 
  */
  static RUN_AFTER_ENEMY_REGISTRY = {
    runAfterEnemyA1B1TheCorruptedChieftain: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT1_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT1_ENCOUNTERS_2);
      console.log(`runAfter Chieftain done`);
    },
    runAfterEnemyA1B2TheCultInfiltrator: (gameState) => {
      gameState.acts_progression = 2; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT2);
      const list2 = [{ category: 'combat', id: 'The Cult Infiltrator', enemy: GameState.ENEMY_A1B2_THE_CULT_INFILTRATOR, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT1_LOC1_NAME);
      mergeList2inList1(list, list2); 
    },
    runAfterEnemyA2B1TheScorchscaleBehemoth: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT2_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT2_ENCOUNTERS_2);
    },
    runAfterEnemyA2B2TheAshbinderPriestess: (gameState) => {
      gameState.acts_progression = 3; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT3);
      const list2 = [{ category: 'combat', id: 'The Ashbinder Priestess', enemy: GameState.ENEMY_A2B2_THE_ASHBINDER_PRIESTESS, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT2_LOC1_NAME);
      mergeList2inList1(list, list2);
    }, 
    runAfterEnemyA3B1FrostclawAlpha: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT3_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT3_ENCOUNTERS_2);
    },
    runAfterEnemyA3B2TheBoundMonk: (gameState) => {
      gameState.acts_progression = 4; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT4);
      const list2 = [{ category: 'combat', id: 'THE BOUND MONK', enemy: GameState.ENEMY_A3B2_THE_BOUND_MONK, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT3_LOC1_NAME);
      mergeList2inList1(list, list2);
    },
    runAfterEnemyA4B1TheWhisperingEldertree: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT4_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT4_ENCOUNTERS_2);
    },
    runAfterEnemyA4B2KaelithsNightmare: (gameState) => {
      gameState.acts_progression = 5; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT5); 
      const list2 = [{ category: 'combat', id: 'Kaelith s NIGHTMARE', enemy: GameState.ENEMY_A4B2_KAELITHS_NIGHTMARE, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT4_LOC1_NAME);
      mergeList2inList1(list, list2);
    },
    runAfterEnemyA5B1TheObsidianMaw: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT5_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT5_ENCOUNTERS_2);
    }, 
    runAfterEnemyA5B2TheKeeperOfTheAbyss: (gameState) => {
      gameState.acts_progression = 6; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT6); 
      const list2 = [{ category: 'combat', id: 'KEEPER OF THE ABYSS', enemy: GameState.ENEMY_A5B2_THE_KEEPER_OF_THE_ABYSS, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT5_LOC1_NAME);
      mergeList2inList1(list, list2);
    },
    runAfterEnemyA6B1TheShardboundOracle: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT6_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT6_ENCOUNTERS_2);
    },
    runAfterEnemyA6B2TheTyrantKing: (gameState) => {
      gameState.acts_progression = 7; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT7); 
      const list2 = [{ category: 'combat', id: 'TYRANT KING', enemy: GameState.ENEMY_A6B2_THE_TYRANT_KING, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT6_LOC1_NAME);
      mergeList2inList1(list, list2);
    },
    runAfterEnemyA7B1TheSteppeTitan: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT7_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT7_ENCOUNTERS_2);
    },
    runAfterEnemyA7B2TheShroudboundHighPriest: (gameState) => {
      gameState.acts_progression = 8; 
      updateLocation(gameState, GameState.LOCATION_ADVENTURE_ACT8); 
      const list2 = [{ category: 'combat', id: 'SHROUDBOUND HIGH PRIEST', enemy: GameState.ENEMY_A7B2_THE_SHROUDBOUND_HIGH_PRIEST, weight: 0 }];
      const list = GameState.findEncounterList(gameState, GameState.ACT7_LOC1_NAME);
      mergeList2inList1(list, list2);
    },
    runAfterEnemyA8B1TheRiftbornDevourer: (gameState) => {
      const list = GameState.findEncounterList(gameState, GameState.ACT8_LOC1_NAME);
      mergeList2inList1(list, GameState.ACT8_ENCOUNTERS_2);
    },
    runAfterEnemyA8B2TheEclipseAvatar: (gameState) => {
      // Queue Game Ending Dialog 
      gameState.next_encounters.push({
        category: 'story',
        id: 'STORY_ACT8_ENDING',
        dialog: GameState.STORY_DIALOG_ACT8_ENDING,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
      gameState.acts_progression = 9; 
      updateLocation(gameState, GameState.LOCATION_CITY); 
    },
  };

  /*
    Run post-enemy logic based on the runAfterKey
    Needed for deserialization / serialization because functions are not serializable
    instead we store a string key and run the logic based on that key
  */
  static runAfterEnemy(gameState, runAfterKey) {
    const action = GameState.RUN_AFTER_ENEMY_REGISTRY[runAfterKey];
    if (action) {
      console.log(`runAfterKey found ${runAfterKey}`);
      action(gameState);
    } else {
      console.warn(`No logic found for runAfterKey: ${runAfterKey}`);
    }
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

  /* 
    Static registry for post-deserialization logic
    Mapping of story keys to functions that should be run after the story dialog closes 
  */
  static ON_CLOSE_STORY_REGISTRY = {
    onClose_STORY_DIALOG_TUTORIAL1: (gameState) => {return},
    onClose_STORY_DIALOG_TUTORIAL2: (gameState) => {return},
    onClose_STORY_DIALOG_ACT1_1: (gameState) => { 
      // Use a regular function to access 'this'
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
    },
    onClose_STORY_DIALOG_ACT1_2: (gameState) => {
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
    onClose_STORY_DIALOG_ACT1_3: (gameState) => {
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
    onClose_STORY_DIALOG_ACT1_4: (gameState) => {
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_4');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
        category: 'story',
        id: 'STORY_ACT1_5',
        dialog: GameState.STORY_DIALOG_ACT1_5,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    },
    onClose_STORY_DIALOG_ACT1_5: (gameState) => {
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_5');
      const encounter_list = GameState.findEncounterList(gameState, location_id);
      encounter_list.push({
        category: 'story',
        id: 'STORY_ACT1_6',
        dialog: GameState.STORY_DIALOG_ACT1_6,
        weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT
      });
    },
    onClose_STORY_DIALOG_ACT1_6: (gameState) => {
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_6');
      // advance to act 2 TODO
    },
    onClose_STORY_DIALOG_ACT1_SECRET: (gameState) => {
      const location_id = GameState.ACT1_LOC1_NAME;
      GameState.markStoryAsCompleted(gameState, location_id, 'STORY_ACT1_SECRET');
    },
    onClose_STORY_DIALOG_ACT8_ENDING: (gameState) => {return},
  };

  /*
    Run post-story logic based on the onCloseKey
    Needed for deserialization / serialization because functions are not serializable
    instead we store a string key and run the logic based on that key
  */
  static onCloseStory(gameState, onCloseKey) {
    const action = GameState.ON_CLOSE_STORY_REGISTRY[onCloseKey];
    if (action) {
      action(gameState);
    } else {
      console.warn(`No logic found for onCloseKey: ${onCloseKey}`);
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
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_1',
  }

  static STORY_DIALOG_ACT1_2 = {
    title: 'First Clue about the Eclipse',
    content: [
      "A strange symbol etched into the ruin’s stone hints at a larger force at play. The cult speaks of the Eclipse Beyond, a force that could unravel reality.",
      "You examine the symbol closely. Its design is unlike anything you've seen, the two intersecting lines almost seem to... shimmer as if alive."
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_2',
  }

  static STORY_DIALOG_ACT1_3 = {
    title: 'Cultist Confrontation',
    content: [
      "The cultists are relentless, but you manage to take one captive. In his dying breath, he mutters about 'the twin star.'",
      "The cultist glares at you. 'The twin star... you don't understand, it's already begun...' His words fade into the wind."
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_3',
  }

  static STORY_DIALOG_ACT1_4 = {
    title: 'The Village’s Betrayal',
    content: [
      "The mayor of Hearthfield has been aiding the cult. His betrayal runs deeper than anyone knew, and now the village is doomed.",
      "The mayor's eyes flicker with regret. 'I never wanted this... but they promised salvation. I had no choice.'"
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_4',
  }

  static STORY_DIALOG_ACT1_5 = {
    title: 'Discovery of the Shrine',
    content: [
      "Hidden in the woods, an ancient shrine lies abandoned. Its carvings speak of two bound souls destined to determine the fate of the world.",
      "As you kneel before the shrine, a sense of foreboding fills your chest. The carvings seem to pulse with an eerie energy."
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_5',
  }

  static STORY_DIALOG_ACT1_6 = {
    title: 'A Dangerous Path Ahead',
    content: [
      "The path ahead leads deeper into the cult’s influence. The ruins are just the beginning of something far darker, and the Eclipse is drawing near.",
      "With resolve in your heart, you step forward. There is no turning back now, the fate of Hearthfield and the world hangs in the balance."
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_6',
  }

  static STORY_DIALOG_ACT1_SECRET = {
    title: 'Hidden shrine in the woods',
    content: [
      "A cryptic prophecy carved into stone speaks of two stars, a choice to bind or break, and a power beyond comprehension.",
      "The carvings glow faintly. 'Two bound by fate shall determine the end... or the beginning.' The meaning is unclear, but the weight of it lingers."
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT1_SECRET',
  }

  static STORY_DIALOG_ACT8_ENDING = {
    title: 'The End?',
    content: [
      "Thanks for playing!", 
      "You prevented the Eclipse this time, but at what cost? Will you be able to break the cicle?", 
      "[Secret Ending comin soon!]",
      "['Newgame+' coming soon!]", 
    ],
    background: '',
    completed: false,
    onCloseKey: 'onClose_STORY_DIALOG_ACT8_ENDING',
  }

  static STORY_DIALOG_TUTORIAL1 = {
  title: 'Tutorial: Combat Basics',
  content: [
    '<span class="fw-bold text-danger">How to Attack</span>: Hit the <span class="fw-bold text-danger">Attack Button</span> when your cooldown is on its <span class="fw-bold text-danger">red mark</span>!',
    '',
    '<span class="fw-bold text-success">Counter Attack</span>: Your hero dodges attacks based on their <span class="fw-bold text-success">Evade Chance</span>. Hit the <span class="fw-bold text-success">Counter Attack Button</span> before your enemy has time to react!',
    '',
    '<span class="fw-bold text-primary">Combo Bonus</span>: Attack consecutively without missing the timing to <span class="fw-bold text-primary">gain bonus Damage</span>!',
  ],
  background: '',
  completed: false,
  onCloseKey: 'onClose_STORY_DIALOG_TUTORIAL1',
};

static STORY_DIALOG_TUTORIAL2 = {
  title: 'Tutorial: Weapon Enchantments',
  content: [
    '<span class="fw-bold text-danger">Fire</span>: Bonus <span class="fw-bold text-danger">Crit. Chance</span> and <span class="fw-bold text-danger">Crit. Damage</span>!',
    '',
    '<span class="fw-bold text-info">Ice</span>: Bonus <span class="fw-bold text-info">Evade Chance</span> and <span class="fw-bold text-info">slows</span> enemy attack speed!',
    '',
    '<span class="fw-bold text-primary">Lightning</span>: Bonus <span class="fw-bold text-primary">Attack Speed</span> and chance to <span class="fw-bold text-primary">stun</span> your enemy!',
    '',
    '<span class="fw-bold text-muted">None</span>: No Bonus. Pick if you want a bigger challenge!',
  ],
  background: '',
  completed: false,
  onCloseKey: 'onClose_STORY_DIALOG_TUTORIAL2',
};

  static STORY_DIALOG_DEFAULT_WEIGHT = 5;
  static ACT1_ENCOUNTERS = [
    { category: 'combat', id: 'WILD_BOAR', enemy: GameState.ENEMY_WILD_BOAR, weight: 50 },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 50 },
    { category: 'combat', id: 'GOBLIN_SCOUT', enemy: GameState.ENEMY_GOBLIN_SCOUT, weight: 50 },
    { category: 'combat', id: 'WILD_WOLF', enemy: GameState.ENEMY_WILD_WOLF, weight: 40 },
    { category: 'combat', id: 'MISCHIEVOUS_FAERIE', enemy: GameState.ENEMY_MISCHIEVOUS_FAERIE, weight: 40 },
    { category: 'combat', id: 'The Corrupted Chieftain', enemy: GameState.ENEMY_A1B1_THE_CORRUPTED_CHIEFTAIN, weight: 10 },
    { category: 'story', id: 'STORY_ACT1_1', dialog: GameState.STORY_DIALOG_ACT1_1, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false },
    { category: 'story', id: 'STORY_ACT1_SECRET', dialog: GameState.STORY_DIALOG_ACT1_SECRET, weight: GameState.STORY_DIALOG_DEFAULT_WEIGHT, completed: false}
  ];
  static ACT1_ENCOUNTERS_2 = [
    { category: 'combat', id: 'WILD_BOAR', enemy: GameState.ENEMY_WILD_BOAR, weight: 5 },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 5 },
    { category: 'combat', id: 'GOBLIN_SCOUT', enemy: GameState.ENEMY_GOBLIN_SCOUT, weight: 5 },
    { category: 'combat', id: 'WILD_WOLF', enemy: GameState.ENEMY_WILD_WOLF, weight: 15 },
    { category: 'combat', id: 'MISCHIEVOUS_FAERIE', enemy: GameState.ENEMY_MISCHIEVOUS_FAERIE, weight: 25 },
    { category: 'combat', id: 'The Corrupted Chieftain', enemy: GameState.ENEMY_A1B1_THE_CORRUPTED_CHIEFTAIN, weight: 0 },
    { category: 'combat', id: 'CORRUPTED_FOREST_GUARDIAN', enemy: GameState.ENEMY_CORRUPTED_FOREST_GUARDIAN, weight: 20 },
    { category: 'combat', id: 'BANDIT CAPTIAN', enemy: GameState.ENEMY_BANDIT_CAPTAIN, weight: 15 },
    { category: 'combat', id: 'DARK_ACOLYTE', enemy: GameState.ENEMY_DARK_ACOLYTE, weight: 15 },
    { category: 'combat', id: 'The Cult Infiltrator', enemy: GameState.ENEMY_A1B2_THE_CULT_INFILTRATOR, weight: 5 },
  ];
  static ACT2_ENCOUNTERS = [
    { category: 'combat', id: 'SANDSHARD STALKER', enemy: GameState.ENEMY_SANDSHARD_STALKER, weight: 50 },
    { category: 'combat', id: 'GLASSFANG VULTURE', enemy: GameState.ENEMY_GLASSFANG_VULTURE, weight: 50 },
    { category: 'combat', id: 'FRAGMENTED SENTINEL', enemy: GameState.ENEMY_FRAGMENTED_SENTINEL, weight: 30 },
    { category: 'combat', id: 'CINDERHOUND', enemy: GameState.ENEMY_CINDERHOUND, weight: 30 },
    { category: 'combat', id: 'THE SCORCHSCALE BEHEMOTH', enemy: GameState.ENEMY_A2B1_THE_SCORCHSCALE_BEHEMOTH, weight: 5 },
  ];
  static ACT2_ENCOUNTERS_2 = [
    { category: 'combat', id: 'SANDSHARD STALKER', enemy: GameState.ENEMY_SANDSHARD_STALKER, weight: 5 },
    { category: 'combat', id: 'GLASSFANG VULTURE', enemy: GameState.ENEMY_GLASSFANG_VULTURE, weight: 5 },
    { category: 'combat', id: 'FRAGMENTED SENTINEL', enemy: GameState.ENEMY_FRAGMENTED_SENTINEL, weight: 10 },
    { category: 'combat', id: 'CINDERHOUND', enemy: GameState.ENEMY_CINDERHOUND, weight: 15 },
    { category: 'combat', id: 'DUNE WRAITH', enemy: GameState.ENEMY_DUNE_WRAITH, weight: 20 },
    { category: 'combat', id: 'ECLIPSED REVENANT', enemy: GameState.ENEMY_ECLIPSED_REVENANT, weight: 20 },
    { category: 'combat', id: 'DARK ACOLYTE 2', enemy: GameState.ENEMY_DARK_ACOLYTE2, weight: 20 },
    { category: 'combat', id: 'THE SCORCHSCALE BEHEMOTH', enemy: GameState.ENEMY_A2B1_THE_SCORCHSCALE_BEHEMOTH, weight: 0 },
    { category: 'combat', id: 'THE ASHBINDER PRIESTESS', enemy: GameState.ENEMY_A2B2_THE_ASHBINDER_PRIESTESS, weight: 5 },
  ];
  static ACT3_ENCOUNTERS = [
    { category: 'combat', id: 'SNOW WARG', enemy: GameState.ENEMY_SNOW_WARG, weight: 50 },
    { category: 'combat', id: 'ICEBOUND CONSTRUC', enemy: GameState.ENEMY_ICEBOUND_CONSTRUCT, weight: 50 },
    { category: 'combat', id: 'SHROUDBOUND HERALD', enemy: GameState.ENEMY_SHROUDBOUND_HERALD, weight: 45 },
    { category: 'combat', id: 'DARK ACOLYTE 3', enemy: GameState.ENEMY_DARK_ACOLYTE3, weight: 45 },
    { category: 'combat', id: 'FROST ELEMENTAL', enemy: GameState.ENEMY_FROST_ELEMENTAL, weight: 30 },
    { category: 'combat', id: 'AVALANCHE BEHEMOUTH', enemy: GameState.ENEMY_AVALANCHE_BEHEMOTH, weight: 30 },
    { category: 'combat', id: 'FROSTCLAW ALPHA', enemy: GameState.ENEMY_A3B1_FROSTCLAW_ALPHA, weight: 10 },
  ];
  static ACT3_ENCOUNTERS_2 = [
    { category: 'combat', id: 'SNOW WARG', enemy: GameState.ENEMY_SNOW_WARG, weight: 5 },
    { category: 'combat', id: 'ICEBOUND CONSTRUC', enemy: GameState.ENEMY_ICEBOUND_CONSTRUCT, weight: 5 },
    { category: 'combat', id: 'SHROUDBOUND HERALD', enemy: GameState.ENEMY_SHROUDBOUND_HERALD, weight: 5 },
    { category: 'combat', id: 'DARK ACOLYTE 3', enemy: GameState.ENEMY_DARK_ACOLYTE3, weight: 15 },
    { category: 'combat', id: 'FROST ELEMENTAL', enemy: GameState.ENEMY_FROST_ELEMENTAL, weight: 25 },
    { category: 'combat', id: 'AVALANCHE BEHEMOUTH', enemy: GameState.ENEMY_AVALANCHE_BEHEMOTH, weight: 25 },
    { category: 'combat', id: 'FROSTCLAW ALPHA', enemy: GameState.ENEMY_A3B1_FROSTCLAW_ALPHA, weight: 0 },
    { category: 'combat', id: 'ECLIPSED FROSTGUARD', enemy: GameState.ENEMY_ECLIPSED_FROSTGUARD, weight: 30 },
    { category: 'combat', id: 'KAELITHS WRAITH', enemy: GameState.ENEMY_KAELITHS_WRAITH, weight: 30 },
    { category: 'combat', id: 'CHILLREND COLOSSUS', enemy: GameState.ENEMY_CHILLREND_COLOSSUS, weight: 20 },
    { category: 'combat', id: 'THE BOUND MONK', enemy: GameState.ENEMY_A3B2_THE_BOUND_MONK, weight: 10 },
  ];
  static ACT4_ENCOUNTERS = [
    { category: 'combat', id: 'SHADOW SPRITE', enemy: GameState.ENEMY_SHADOW_SPRITE, weight: 50 },
    { category: 'combat', id: 'CREEPING VINE', enemy: GameState.ENEMY_CREEPING_VINE, weight: 50 },
    { category: 'combat', id: 'PHANTOM STALKER', enemy: GameState.ENEMY_PHANTOM_STALKER, weight: 40 },
    { category: 'combat', id: 'ENEMY_DARK_AKOLYTE 4', enemy: GameState.ENEMY_DARK_ACOLYTE4, weight: 25 },
    { category: 'combat', id: 'THE WHISPERING ELDERTREE', enemy: GameState.ENEMY_A4B1_THE_WHISPERING_ELDERTREE, weight: 10 },
  ];
  static ACT4_ENCOUNTERS_2 = [
    { category: 'combat', id: 'SHADOW SPRITE', enemy: GameState.ENEMY_SHADOW_SPRITE, weight: 5 },
    { category: 'combat', id: 'CREEPING VINE', enemy: GameState.ENEMY_CREEPING_VINE, weight: 5 },
    { category: 'combat', id: 'PHANTOM STALKER', enemy: GameState.ENEMY_PHANTOM_STALKER, weight: 10 },
    { category: 'combat', id: 'ENEMY_DARK_AKOLYTE 4', enemy: GameState.ENEMY_DARK_ACOLYTE4, weight: 15 },
    { category: 'combat', id: 'THE WHISPERING ELDERTREE', enemy: GameState.ENEMY_A4B1_THE_WHISPERING_ELDERTREE, weight: 0 },
    { category: 'combat', id: 'ECHOED GUARDIAN', enemy: GameState.ENEMY_ECHOED_GUARDIAN, weight: 25 },
    { category: 'combat', id: "Kaelith's Shadow", enemy: GameState.ENEMY_KAELITHS_SHADOW, weight: 25 },
    { category: 'combat', id: 'Kaelith s NIGHTMARE', enemy: GameState.ENEMY_A4B2_KAELITHS_NIGHTMARE, weight: 5 },
  ];
  static ACT5_ENCOUNTERS = [
    { category: 'combat', id: 'ANCIENT SENTINEL', enemy: GameState.ENEMY_ANCIENT_SENTINEL, weight: 50 },
    { category: 'combat', id: 'COLLAPSED PHANTOM', enemy: GameState.ENEMY_COLLAPSED_PHANTOM, weight: 50 },
    { category: 'combat', id: 'SHADOW SPIDER', enemy: GameState.ENEMY_SHADOW_SPIDER, weight: 40 },
    { category: 'combat', id: 'CULT EXCAVATOR', enemy: GameState.ENEMY_CULT_EXCAVATOR, weight: 35 },
    { category: 'combat', id: 'OBSIDIAN MAW', enemy: GameState.ENEMY_A5B1_THE_OBSIDIAN_MAW, weight: 10 },
  ];
  static ACT5_ENCOUNTERS_2 = [
    { category: 'combat', id: 'ANCIENT SENTINEL', enemy: GameState.ENEMY_ANCIENT_SENTINEL, weight: 5 },
    { category: 'combat', id: 'COLLAPSED PHANTOM', enemy: GameState.ENEMY_COLLAPSED_PHANTOM, weight: 5 },
    { category: 'combat', id: 'SHADOW SPIDER', enemy: GameState.ENEMY_SHADOW_SPIDER, weight: 15 },
    { category: 'combat', id: 'CULT EXCAVATOR', enemy: GameState.ENEMY_CULT_EXCAVATOR, weight: 25 },
    { category: 'combat', id: 'OBSIDIAN MAW', enemy: GameState.ENEMY_A5B1_THE_OBSIDIAN_MAW, weight: 0 },
    { category: 'combat', id: 'RUNE-WROUGHT TITAN', enemy: GameState.ENEMY_RUNE_WROUGHT_TITAN, weight: 35 },
    { category: 'combat', id: 'FORSAKEN ARCHIVIST', enemy: GameState.ENEMY_THE_FORSAKEN_ARCHIVIST, weight: 35 },
    { category: 'combat', id: 'KEEPER OF THE ABYSS', enemy: GameState.ENEMY_A5B2_THE_KEEPER_OF_THE_ABYSS, weight: 5 },
  ];
  static ACT6_ENCOUNTERS = [
    { category: 'combat', id: 'GILDED WRETCH', enemy: GameState.ENEMY_GILDED_WRETCH, weight: 50 },
    { category: 'combat', id: 'SUNSTONE CONSTRUCT', enemy: GameState.ENEMY_SUNSTONE_CONSTRUCT, weight: 50 },
    { category: 'combat', id: 'SKYBORN HARBINGER', enemy: GameState.ENEMY_SKYBORN_HARBINGER, weight: 35 },
    { category: 'combat', id: 'SHARDBOUND ORACLE', enemy: GameState.ENEMY_A6B1_THE_SHARDBOUND_ORACLE, weight: 10 },
    { category: 'combat', id: "TYRANT'S ENFORCER", enemy: GameState.ENEMY_TYRANTS_ENFORCER, weight: 5 },
  ];
  static ACT6_ENCOUNTERS_2 = [
    { category: 'combat', id: 'GILDED WRETCH', enemy: GameState.ENEMY_GILDED_WRETCH, weight: 5 },
    { category: 'combat', id: 'SUNSTONE CONSTRUCT', enemy: GameState.ENEMY_SUNSTONE_CONSTRUCT, weight: 5 },
    { category: 'combat', id: 'SKYBORN HARBINGER', enemy: GameState.ENEMY_SKYBORN_HARBINGER, weight: 15 },
    { category: 'combat', id: 'SHARDBOUND ORACLE', enemy: GameState.ENEMY_A6B1_THE_SHARDBOUND_ORACLE, weight: 0 },
    { category: 'combat', id: "TYRANT'S ENFORCER", enemy: GameState.ENEMY_TYRANTS_ENFORCER, weight: 30 },
    { category: 'combat', id: 'ECLIPSED CULT OPERATIVE', enemy: GameState.ENEMY_ECLIPSED_CULT_OPERATIVE, weight: 25 },
    { category: 'combat', id: 'SUNLIT PHANTOM', enemy: GameState.ENEMY_SUNLIT_PHANTOM, weight: 25 },
    { category: 'combat', id: 'TYRANT KING', enemy: GameState.ENEMY_A6B2_THE_TYRANT_KING, weight: 5 },
  ];
  static ACT7_ENCOUNTERS = [
    { category: 'combat', id: 'STORMBOUND FIEND', enemy: GameState.ENEMY_STORMBOUND_FIEND, weight: 50 },
    { category: 'combat', id: 'STEPPE CRAWLER', enemy: GameState.ENEMY_STEPPE_CRAWLER, weight: 50 },
    { category: 'combat', id: 'ASH WRAITH', enemy: GameState.ENEMY_ASH_WRAITH, weight: 40 },
    { category: 'combat', id: 'STEPPE TITAN', enemy: GameState.ENEMY_A7B1_THE_STEPPE_TITAN, weight: 10 },
    { category: 'combat', id: 'CULT PYROMANCER', enemy: GameState.ENEMY_CULT_PYROMANCER, weight: 15 },
  ];
  static ACT7_ENCOUNTERS_2 = [
    { category: 'combat', id: 'STORMBOUND FIEND', enemy: GameState.ENEMY_STORMBOUND_FIEND, weight: 5 },
    { category: 'combat', id: 'STEPPE CRAWLER', enemy: GameState.ENEMY_STEPPE_CRAWLER, weight: 5 },
    { category: 'combat', id: 'ASH WRAITH', enemy: GameState.ENEMY_ASH_WRAITH, weight: 15 },
    { category: 'combat', id: 'STEPPE TITAN', enemy: GameState.ENEMY_A7B1_THE_STEPPE_TITAN, weight: 0 },
    { category: 'combat', id: 'CULT PYROMANCER', enemy: GameState.ENEMY_CULT_PYROMANCER, weight: 35 },
    { category: 'combat', id: 'ECLIPSED MARAUDER', enemy: GameState.ENEMY_ECLIPSED_MARAUDER, weight: 35 },
    { category: 'combat', id: 'HERALD OF DESPAIR', enemy: GameState.ENEMY_THE_HERALD_OF_DESPAIR, weight: 25 },
    { category: 'combat', id: 'SHROUDBOUND HIGH PRIEST', enemy: GameState.ENEMY_A7B2_THE_SHROUDBOUND_HIGH_PRIEST, weight: 5 },
  ];
  static ACT8_ENCOUNTERS = [
    { category: 'combat', id: 'REALITY FRAGMENTS', enemy: GameState.ENEMY_REALITY_FRAGMENTS, weight: 50 },
    { category: 'combat', id: 'ABYSSAL WISPS', enemy: GameState.ENEMY_ABYSSAL_WISPS, weight: 50 },
    { category: 'combat', id: 'COSMIC SENTINEL', enemy: GameState.ENEMY_COSMIC_SENTINEL, weight: 35 },
    { category: 'combat', id: 'ECLIPSE SHARDLINGS', enemy: GameState.ENEMY_ECLIPSE_SHARDLINGS, weight: 25 },
    { category: 'combat', id: 'RIFTBORN DEVOURER', enemy: GameState.ENEMY_A8B1_THE_RIFTBORN_DEVOURER, weight: 10 },
    { category: 'combat', id: 'VOID REVENANT', enemy: GameState.ENEMY_VOID_REVENANT, weight: 5 },
  ];
  static ACT8_ENCOUNTERS_2 = [
    { category: 'combat', id: 'REALITY FRAGMENTS', enemy: GameState.ENEMY_REALITY_FRAGMENTS, weight: 10 },
    { category: 'combat', id: 'ABYSSAL WISPS', enemy: GameState.ENEMY_ABYSSAL_WISPS, weight: 10 },
    { category: 'combat', id: 'COSMIC SENTINEL', enemy: GameState.ENEMY_COSMIC_SENTINEL, weight: 35 },
    { category: 'combat', id: 'ECLIPSE SHARDLINGS', enemy: GameState.ENEMY_ECLIPSE_SHARDLINGS, weight: 35 },
    { category: 'combat', id: 'RIFTBORN DEVOURER', enemy: GameState.ENEMY_A8B1_THE_RIFTBORN_DEVOURER, weight: 0 },
    { category: 'combat', id: 'VOID REVENANT', enemy: GameState.ENEMY_VOID_REVENANT, weight: 35 },
    { category: 'combat', id: 'THE ECLIPSE AVATAR', enemy: GameState.ENEMY_A8B2_THE_ECLIPSE_AVATAR, weight: 5 },
  ];

  next_encounters = [
    { category: 'story', id: 'TUTORIAL 1', dialog: GameState.STORY_DIALOG_TUTORIAL1, weight: 100, completed: false },
    { category: 'combat', id: 'WILD_BOAR', enemy: GameState.ENEMY_WILD_BOAR, weight: 50 },
    { category: 'combat', id: 'WILD_BOAR', enemy: GameState.ENEMY_WILD_BOAR, weight: 50 },
    { category: 'story', id: 'TUTORIAL 2', dialog: GameState.STORY_DIALOG_TUTORIAL2, weight: 100, completed: false },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 50 },
    { category: 'combat', id: 'PLAGUE_CROW', enemy: GameState.ENEMY_PLAGUE_CROW, weight: 50 },
  ];
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
  
  /* Asset Constants */
  IMG_HERO_FEMALE_NEUTRAL = heroFemaleNeutral;
  IMG_HERO_MALE_NEUTRAL = heroMaleNeutral;
  IMG_HERO_FEMALE_COMBAT = heroFemaleCombat;
  IMG_HERO_MALE_COMBAT = heroMaleCombat;

  attack_combo = 0; 
  acts_progression = 1; 
  active_enemy = null; 

  constructor(heroName, gender, location) {
    this.hero = {
      isInCombat: false,
      isInDialog: false,
      name: heroName,
      gender: gender,
      level: 1, 
      xp: 0, 
      xp_to_levelup: GameState.XP_TO_LEVEL2, 
      health: 200,
      health_full: 200, 
      attack: 5,
      attack_speed: (gender === GameState.GENDER_MALE ? 1875 : 1475), // in Milliseconds because of Interval Ticks
      attack_cooldown: (gender === GameState.GENDER_MALE ? 1875 : 1475),
      evade_chance: (gender === GameState.GENDER_MALE ? 10 : 20), 
      crit_chance: (gender === GameState.GENDER_MALE ? 36 : 16), 
      crit_damage: (gender === GameState.GENDER_MALE ? 200 : 100), 
      damage_reduction: 0,
      bonus_damage: 0,
      last_combat_event: "", 
      image: (gender === GameState.GENDER_MALE ? this.IMG_HERO_MALE_NEUTRAL : this.IMG_HERO_FEMALE_NEUTRAL), 
      current_enchantment: ID_NONE,
      upgradeCounts: {
        [UPGRADE_DAMAGE]: 0,
        [UPGRADE_MAX_HEALTH]: 0,
        [UPGRADE_CRIT_CHANCE]: 0,
        [UPGRADE_CRIT_DAMAGE]: 0,
        [UPGRADE_EVADE_CHANCE]: 0,
        [UPGRADE_ATTACK_SPEED]: 0,
      },
      unspent_points: 0, 
      current_animation: null, 
      helm: {
        itemType: "Helm",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Damage Reduction 0%"], 
        itemStats: {damage_reduction: 0},
      },
      armor: {
        itemType: "Armor",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Damage Reduction 0%"], 
        itemStats: {damage_reduction: 0},
      },
      boots: {
        itemType: "Boots",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Evade Chance 0%"], 
        itemStats: {evade_chance: 0},
      },
      amulet: {
        itemType: "Amulet",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Damage Reduction 0%", "Bonus Damage 0%"], 
        itemStats: {damage_reduction: 0, bonus_damage: 0},
      },
      ring: {
        itemType: "Ring",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Crit Chance 0%", "Crit Damage 0%"], 
        itemStats: {crit_chance: 0, crit_damage: 0},
      },
      sword: {
        itemType: "Sword",
        itemRarity: "common",
        subRarity: "low", 
        statDescriptions: ["Attack 0", "Bonus Damage 0%", "Attack Cooldown -0ms"], 
        itemStats: {attack: 0, bonus_damage: 0, attack_speed: 0},
      },
    }
    this.location = location;
    this.compatability = GameState.COMPATABILITY; 
    this.playtime = 0; 
  }
}

GameState.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.string).isRequired, 
};

export default GameState;
