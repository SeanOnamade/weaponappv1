const powerLevelSelectMobile = document.getElementById("powerLevelSelectMobile");
const powerLevelSelectDesktop = document.getElementById("powerLevelSelectDesktop");

const extraStatsSelectMobile = document.getElementById("extraStatsSelectMobile");
const extraStatsSelectDesktop = document.getElementById("extraStatsSelectDesktop");

const playerClassSelectMobile = document.getElementById("playerClassSelectMobile");
const playerClassSelectDesktop = document.getElementById("playerClassSelectDesktop");

const weaponSlotSelectMobile = document.getElementById("weaponSlotSelectMobile");
const weaponSlotSelectDesktop = document.getElementById("weaponSlotSelectDesktop");

const weaponTypeSelectMobile = document.getElementById("weaponTypeSelectMobile");
const weaponTypeSelectDesktop = document.getElementById("weaponTypeSelectDesktop");

const generateBtnMobile = document.getElementById("generateBtnMobile");
const generateBtnDesktop = document.getElementById("generateBtnDesktop");
const generatedWeaponAreaMobile = document.getElementById("generatedWeaponAreaMobile");
const generatedWeaponAreaDesktop = document.getElementById("generatedWeaponAreaDesktop");

const strings = {
  classes: [
    "Any",
    "Scout",
    "Soldier",
    "Pyro",
    "Demoman",
    "Heavy",
    "Engineer",
    "Medic",
    "Sniper",
    "Spy",
  ],
  slots: [
    "Any",
    "Primary",
    "Secondary",
    "Melee"],
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This one gives +-20% deviation
// function addRandomnessToNumber(num, maxDifferencePercent = 0.2) { // 80% - 120%
//   if (!num) return num;
//   const maxDifference = Math.floor(num * maxDifferencePercent);
//   if (maxDifference === 0) return num;
//   const min = num - maxDifference;
//   const max = num + maxDifference;
//   // return getRandom(min, max);

//   // added below for multiples of 5
//   let randomNum = getRandom(min, max);
//   randomNum = Math.round(randomNum / 5) * 5;
//   return randomNum;
// }

// Alternate I made gives range with minimum of 5
function addRandomnessToNumber(num, lowest = 10) { // 0 to num
  if (!num) return num;
  if (num < 10) {
    min = 1;
    max = num;
    let randomNum = getRandom(min, max);
    return randomNum;
  }
  min = lowest;
  max = num;
  let randomNum = getRandom(min, max);
  randomNum = Math.round(randomNum / 5) * 5;
  return randomNum;
}

function tryLoadWeaponFromUrl() {
  // basically, if we pass it a special hash link, it will try to load it
  // decode and parse and update
  const hash = window.location.hash;
  if (!hash) return;
  const decoded = Base64.decode(hash.substring(1));
  const weapon = JSON.parse(decoded);

  generatedWeaponAreaMobile.innerHTML = formatWeaponAsHtml(weapon);
  generatedWeaponAreaDesktop.innerHTML = formatWeaponAsHtml(weapon);
  // console.log(`Finished generating the ${weapon.playerClassName} ${weapon.weaponSlotName}!`);
  // console.log("~~~");
  // console.log("");
//   document.title = `${weapon.playerClassName} ${weapon.weaponSlotName}`;
}

// Basic Weapon Types
const weaponTypes = { 
  // needsBoost typically indicates level of enhancement required for the weapon type to perform optimally.
  Backpack: { name: "Backpack", needsBoost: 1, imageCount: 43 }, // 3 w/o custom
  Banner: { name: "Banner", imageCount: 3 }, // 3 w/o custom
  Boots: { name: "Boots", needsBoost: 1, imageCount: 6 }, // 2 w/o custom
  Bow: { name: "Bow", imageCount: 4 }, // 2 w/o custom
  Crossbow: { name: "Crossbow", imageCount: 5 }, // 2 w/o custom
  Demoknight_Boots: { name: "Demoknight_Boots", needsBoost: 1, imageCount: 3 }, // 2 w/o custom
  Demoknight_Melee: { name: "Demoknight_Melee", imageCount: 13 }, // 9 w/o custom
  Demoknight_Shield: { name: "Demoknight_Shield", needsBoost: 2, imageCount: 4 }, // 3 w/o custom
  Explosive_Melee: { name: "Explosive_Melee", imageCount: 4 }, // 1 w/o custom
  Flamethrower: { name: "Flamethrower", imageCount: 19 }, // 7 w/o custom
  Flare_Gun: { name: "Flare_Gun", imageCount: 7 }, // 3 w/o custom
  Grenade_Launcher: { name: "Grenade_Launcher", imageCount: 8 }, // 4 w/o custom
  Heavy_Lunch_Box: { name: "Heavy_Lunch_Box", imageCount: 17 }, // 6 w/o custom
  Indivisible_Particle_Smasher: { name: "Indivisible_Particle_Smasher", imageCount: 4 }, // 3 w/o custom
  Invis_Watch: { name: "Invis_Watch", imageCount: 6 }, // 5 w/o custom
  Knife: { name: "Knife", imageCount: 25 }, // Spy Melee; 9 w/o custom
  Medi_Gun: { name: "Medi_Gun", imageCount: 15 }, // 4 w/o custom
  Melee: { name: "Melee", imageCount: 86 }, // 61 w/o custom
  Melee_with_Projectile: { name: "Melee_with_Projectile", imageCount: 3 }, // 2 w/o custom
  Minigun: { name: "Minigun", imageCount: 11 }, // 6 w/o custom
  Pistol: { name: "Pistol", imageCount: 12 }, // 5 w/o custom
  Revolver: { name: "Revolver", imageCount: 17 }, // 6 w/o custom
  Rocket_Launcher: { name: "Rocket_Launcher", imageCount: 14 }, // 9 w/o custom
  Sapper: { name: "Sapper", imageCount: 8 }, // 4 w/o custom
  Scattergun: { name: "Scattergun", imageCount: 8 }, // 5 w/o custom
  Scout_Lunch_Box: { name: "Scout_Lunch_Box", imageCount: 5 }, // 5 w/o custom // idk if this needsBoost
  Shotgun: { name: "Shotgun", imageCount: 16 }, // 7 w/o custom
  Sniper_Rifle: { name: "Sniper_Rifle", imageCount: 14 }, // 8 w/o custom
  Stickybomb_Launcher: { name: "Stickybomb_Launcher", imageCount: 9 }, // 4 w/o custom
  Submachine_Gun: { name: "Submachine_Gun", imageCount: 2 }, // 2 w/o custom
  Syringe_Gun: { name: "Syringe_Gun", imageCount: 4 }, // 3 w/o custom
  Throwable_AoE: { name: "Throwable_AoE", imageCount: 7 }, // 3 w/o custom
  Throwable_Weapon: { name: "Throwable_Weapon", imageCount: 6 }, // 1 w/o custom
  Wrench: { name: "Wrench", imageCount: 7 }, // 5 w/o custom
  // Surprise: { name: "Surprise", imageCount: 2 }, // mine
};

// Weapon Types in Arrays by Class:
const weaponTypesByClass = [
  [
    // Scout
    { slot: 1, type: weaponTypes.Scattergun },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Pistol },
    { slot: 2, type: weaponTypes.Throwable_Weapon },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    { slot: 2, type: weaponTypes.Scout_Lunch_Box },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Melee_with_Projectile },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Soldier
    { slot: 1, type: weaponTypes.Rocket_Launcher },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Shotgun },
    { slot: 2, type: weaponTypes.Banner },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Boots },
    { slot: 2, type: weaponTypes.Indivisible_Particle_Smasher },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Explosive_Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Pyro
    { slot: 1, type: weaponTypes.Flamethrower },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Shotgun },
    { slot: 2, type: weaponTypes.Flare_Gun },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    { slot: 2, type: weaponTypes.Indivisible_Particle_Smasher },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Demoman
    { slot: 1, type: weaponTypes.Grenade_Launcher },
    { slot: 1, type: weaponTypes.Demoknight_Boots },
    { slot: 1, type: weaponTypes.Backpack },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Stickybomb_Launcher },
    { slot: 2, type: weaponTypes.Demoknight_Shield },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Demoknight_Melee },
    { slot: 3, type: weaponTypes.Explosive_Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Heavy
    { slot: 1, type: weaponTypes.Minigun },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Shotgun },
    // { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Heavy_Lunch_Box },
    { slot: 2, type: weaponTypes.Indivisible_Particle_Smasher }, // I think this makes sense for him
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Engineer
    { slot: 1, type: weaponTypes.Shotgun },
    { slot: 1, type: weaponTypes.Indivisible_Particle_Smasher },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Pistol },
    // { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Revolver },
    // { slot: 2, type: weaponTypes.Boots },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Wrench },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Medic
    { slot: 1, type: weaponTypes.Syringe_Gun },
    { slot: 1, type: weaponTypes.Crossbow },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Medi_Gun },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Sniper
    { slot: 1, type: weaponTypes.Sniper_Rifle },
    { slot: 1, type: weaponTypes.Bow },
    { slot: 1, type: weaponTypes.Crossbow }, // Why not
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Submachine_Gun },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    // { slot: 2, type: weaponTypes.Throwable_Weapon },
    { slot: 2, type: weaponTypes.Backpack },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Melee_with_Projectile },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Spy
    { slot: 1, type: weaponTypes.Revolver },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Sapper },
    { slot: 2, type: weaponTypes.Invis_Watch }, // Technically doesn't make sense here but whatever
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Knife },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
];

// Some Rough Weapon Type groups
const weaponTypeGroups = {
  // BASIC GROUPS //
  AutomaticBullet: ["Minigun", "Submachine_Gun"],
  AutomaticProjectiles: ["Syringe_Gun"],
  BurstBullet: ["Scattergun", "Shotgun"], // REMOVED SURPRISE
  ChargeablePassive: ["Demoknight_Shield", "Banner", "Invis_Watch"], // keeping an eye on invis watch
  ConsumablePassive: ["Scout_Lunch_Box", "Heavy_Lunch_Box"],
  ConsumableProjectile: ["Throwable_AoE", "Throwable_Weapon"],
  ExplosiveProjectile: ["Rocket_Launcher", "Grenade_Launcher", "Stickybomb_Launcher"],
  Flamethrower: ["Flamethrower"],
  Knife: ["Knife"],
  Medi_Gun: ["Medi_Gun"],
  Melee: [
    "Melee",
    "Demoknight_Melee",
    "Explosive_Melee",
    "Melee_with_Projectile",
    "Wrench",
  ],
  Passive: ["Backpack", "Boots", "Demoknight_Boots", "Demoknight_Shield"],
  RayGun: ["Indivisible_Particle_Smasher"],
  Sapper: ["Sapper"],
  SemiAutomaticBullet: ["Revolver", "Pistol"],
  SingleBullet: ["Sniper_Rifle"],
  SingleShotProjectile: ["Bow", "Flare_Gun", "Crossbow"],
  Slot1: ["Scattergun", "Rocket_Launcher", 
  "Shotgun", "Flamethrower", 
  "Grenade_Launcher", "Demoknight_Boots", 
  "Backpack", "Minigun", 
  "Syringe_Gun", "Sniper_Rifle", 
  "Bow", "Indivisible_Particle_Smasher", 
  "Crossbow"],
  Slot2: ["Pistol", "Throwable_Weapon", 
  "Throwable_AoE", "Scout_Lunch_Box", 
  "Shotgun", "Banner", 
  "Backpack", "Boots", 
  "Flare_Gun", "Stickybomb_Launcher", 
  "Demoknight_Shield", "Heavy_Lunch_Box", 
  "Medi_Gun", "Indivisible_Particle_Smasher"],
  // Surprise: ["Surprise"]
};

// More, Second-Level Weapon Type Groups //
weaponTypeGroups.All = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.Knife,
  ...weaponTypeGroups.Medi_Gun,
  ...weaponTypeGroups.Melee,
  ...weaponTypeGroups.Passive,
  ...weaponTypeGroups.RayGun,
  ...weaponTypeGroups.Sapper,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile,
];
weaponTypeGroups.AllAfterburn = [
  "Flamethrower",
  "Flare_Gun",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllAutomatic = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.Flamethrower,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllBullet = [
    ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.SingleBullet,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllCanHeadshot = [
    "Bow",
    "Revolver",
    "Sniper_Rifle",
    "Crossbow",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllCanHit = [
    ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.Knife,
  ...weaponTypeGroups.Melee,
  ...weaponTypeGroups.RayGun,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllDemoknight = [
  "Demoknight_Boots",
  "Demoknight_Melee",
  "Demoknight_Shield",
];
weaponTypeGroups.AllDoesDamage = [
    ...weaponTypeGroups.AutomaticBullet,
    ...weaponTypeGroups.AutomaticProjectiles,
    ...weaponTypeGroups.BurstBullet,
    ...weaponTypeGroups.ExplosiveProjectile,
    ...weaponTypeGroups.Flamethrower,
    ...weaponTypeGroups.Melee,
    ...weaponTypeGroups.RayGun,
    ...weaponTypeGroups.SemiAutomaticBullet,
    ...weaponTypeGroups.SingleBullet,
    ...weaponTypeGroups.SingleShotProjectile,
    // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllExplosive = [
  ...weaponTypeGroups.ExplosiveProjectile,
  "Explosive_Melee",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllHasClip = [ // could this be every weapon?
    ...weaponTypeGroups.BurstBullet, // I added
    ...weaponTypeGroups.ExplosiveProjectile,
    ...weaponTypeGroups.SemiAutomaticBullet,
    "Submachine_Gun",
    // "Syringe_Gun",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllPassive = [
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.Passive,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllProjectile = [
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  "Melee_with_Projectile",
  ...weaponTypeGroups.RayGun,
  ...weaponTypeGroups.SingleShotProjectile,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllReflectable = [
  "Bow",
  "Crossbow",
  "Flare_Gun", // added
  "Grenade_Launcher",
  "Melee_with_Projectile",
  "Rocket_Launcher",
  "Throwable_Weapon",
  "Stickybomb_Launcher", // added this even though it's iffy
  "Ray_Gun"
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllReloading = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.RayGun,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile, // adding this
  "Submachine_Gun",
];
weaponTypeGroups.AllSubstantialHit = [
  // for On Hit effects, so we shouldn't put Knife here
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Melee,
  ...weaponTypeGroups.RayGun,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile,
  "Throwable_Weapon",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllWithAmmo = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile,
  // ...weaponTypeGroups.Surprise,
];

// Weapon Types by Class
weaponTypeGroups.AllScout = weaponTypesByClass[0].map((w) => w.type.name);
weaponTypeGroups.AllSoldier = weaponTypesByClass[1].map((w) => w.type.name);
weaponTypeGroups.AllPyro = weaponTypesByClass[2].map((w) => w.type.name);
weaponTypeGroups.AllDemoman = weaponTypesByClass[3].map((w) => w.type.name);
weaponTypeGroups.AllHeavy = weaponTypesByClass[4].map((w) => w.type.name);
weaponTypeGroups.AllEngineer = weaponTypesByClass[5].map((w) => w.type.name);
weaponTypeGroups.AllMedic = weaponTypesByClass[6].map((w) => w.type.name);
weaponTypeGroups.AllSniper = weaponTypesByClass[7].map((w) => w.type.name);
weaponTypeGroups.AllSpy = weaponTypesByClass[8].map((w) => w.type.name);

const mandatoryPros = { // Apparently, weapons with this must choose at least one pro; I need to go through these

  Banner: [
    { pointCost: -1, text: "Provides a group buff that slowly heals nearby team members. Rage increases through damage done.", },
    { pointCost: -1, text: "Provides a group buff that increases the firing and reload rates of nearby teammates. Rage increases through damage done.", },
    { pointCost: -1, text: "Provides a group buff that prevents nearby teammates from having to reload. Rage increases through damage done.", },
    { pointCost: -1, text: "Provides a group buff where all healing received is doubled. Rage increases through damage done.", },
    { pointCost: -1, text: "Provides a group buff where allies can heal each other for 35% with attacks on each other. Rage increases through damage done.", },
    { pointCost: -1, text: "Provides a buff where enemies hit by user are marked for death. Rage increases through damage done.", },
    ],

  Crossbow: [
    { pointCost: 0, text: "This weapon will reload automatically when not active", },
    { pointCost: 0, text: "Bolts deal damage based on distance traveled",},
    ],

  Demoknight_Boots: [
    { pointCost: -1, text: "+200% increase in air and turning control while charging", },
  ],

  Demoknight_Shield: [
    { pointCost: 0, text: "Alt-Fire: Charge toward your enemies and remove debuffs. Gain a critical melee strike after impacting an enemy at distance.", },
    { pointCost: 0, text: "Alt-Fire: Charge toward your enemies and remove debuffs. Gain a mini-crit melee strike after impacting an enemy at distance.", },
    { pointCost: 0, text: "Alt-Fire: Charge toward your enemies and remove debuffs. Restore a third of your health after impacting an enemy.", },
    { pointCost: 0, text: "Alt-Fire: Charge toward your enemies and remove debuffs. On impact enemies receive immense knockback.", },
  ],
  Demoknight_Melee: [
    { pointCost: 0, text: "This Weapon has a large melee range and deploys and holsters slower", },
  ],

  Explosive_Melee: [
    { pointCost: 1, text: "Every third hit will cause an explosion" },
    { pointCost: 1, text: "Every other hit will apply great knockback on the enemy" },
    { pointCost: 0, text: "Only explodes once, and must be recharged with ammo" },
    { pointCost: 0, text: "Creates a fiery eplosion whenever hitting a debuffed enemy" },
    { pointCost: 0, text: "Deals immense knockback on hit; enemies who collide into others explode" },
  ],

  Flare_Gun: [
    { pointCost: 0, text: "100% mini-crits vs burning players" },
    { pointCost: 0, text: "100% mini-crits vs wet players" },
    { pointCost: 0, text: "This weapon will reload automatically when not active", },
  ],

  Heavy_Lunch_Box: [
    // { pointCost: -1, text: "Eat to receive 35% damage resistance for 10 seconds. Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Mann of Steel: Eat to receive 50% bullet damage resistance for 10 seconds. Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Eat to gain 25% movespeed for 15 seconds. Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Eat to prevent all debuffs for 15 seconds. Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Eat to prevent overheal decay for 15 seconds. Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Eat to double your current health (into overheal). Alt-Fire: Share with a friend (Small Health Kit)", },
    { pointCost: -1, text: "Eat to restore 150 health. Alt-Fire: Share with a friend (Medium Health Kit)", },
    { pointCost: -1, text: "Eat to gain 50 health instantaneously. Alt-Fire: Share with a friend (Medium Health Kit)", },
  ],

  Medi_Gun: [
    { pointCost: -1, text: "ÜberCharge grants +100% speed of movement and attack", },
    { pointCost: 0, text: "ÜberCharge triples both your capture rates", },
    { pointCost: 0, text: "ÜberCharge grants flashes of invisibility" },
    { pointCost: 0, text: "ÜberCharge grants invisibility, but the patient cannot attack" },
    { pointCost: 0, text: "ÜberCharge grants the ability to fly" },
    { pointCost: -1, text: "ÜberCharge grants 100% minicritical chance" },
    { pointCost: -1, text: "ÜberCharge creates a frontal projectile shield and heals all nearby allies" },
    { pointCost: -1, text: "ÜberCharge prevents user and patient from dropping below 1 HP" },
    { pointCost: -1, text: "ÜberCharge allows 300% of damage the patient deals to return to the pair as healing" },
    { pointCost: -1, text: "ÜberCharge allows healing in a massive radius rather than just 1 target" },
    { pointCost: 0, text: "ÜberCharge grants 6s of invulnerability" },
  ],

  Melee_with_Projectile: [
    { pointCost: 0, text: "Alt-Fire: Launches a projectile that makes enemies bleed", },
    { pointCost: 0, text: "Alt-Fire: Launches a projectile that applies great knockback to enemies", },
    { pointCost: 0, text: "Alt-Fire: Launches a projectile that heals teammates by 25% of their max", },
    { pointCost: 0, text: "Alt-Fire: Launches a projectile that increases ally's movespeed by 15%", },
    { pointCost: 0, text: "Alt-Fire: Launches a projectile that explodes on impact", },
    { pointCost: 1, text: "Alt-Fire: Launches a projectile that disables sentries for 3 seconds", },
    { pointCost: 1, text: "Alt-Fire: Launches a projectile that marks enemies for death, duration scaling with distance", },
  ],

  Indivisible_Particle_Smasher: [
    { pointCost: 0, text: "Does not require ammo, and projectiles penetrate" },
  ],

  Sapper: [
    { pointCost: 0, text: "Place on enemy buildings to disable and slowly drain away its health" },
    { pointCost: 0, text: "Place on enemy buildings to disable for 8s. Deals no damage" },
    { pointCost: 0, text: "Place on enemy buildings to drain their health faster than the regular sapper. Does not disable the building", },
    { pointCost: 0, text: "Place on enemy buildings to cause them to 'malfunction' once fully sapped. Does not damage or disable the building. Doesn't alert the Engineer.", },
    { pointCost: 0, text: "Place on enemy buildings to slowly slow their rate of operation until completely halted. Does not damage the building.", },
  ],

  Scout_Lunch_Box: [
    { pointCost: 0, text: "While effect is active: All attacks incite 5s of bleed", },
    { pointCost: 0, text: "While effect is active: All attacks ignite for 3s", },
    { pointCost: 0, text: "While effect is active: User can air-jump twice as many times", },
    { pointCost: 0, text: "While effect is active: +5% movespeed per hit, to a max of +50%", },
    { pointCost: 0, text: "While effect is active: +1 capture rate and +35% damage resistance", },
    { pointCost: 0, text: "Drink to slowly regain up to 125 health. Can't be shared", },
    { pointCost: 0, text: "Drink to become cloaked for 6s. Cannot attack during this time", },
  ],

  Throwable_AoE: [
    { pointCost: -1, text: "On Hit: Removes ally's debuffs", },
    { pointCost: 1, text: "On Hit: Removes all of the enemy's buffs, including overheal", },
    { pointCost: 1, text: "On Hit: Covered engineer buildings get disabled for 3 seconds", },
    { pointCost: 0, text: "On Hit: Covered enemies can be seen through walls for self and allies for 5s", },
    { pointCost: 0, text: "Extinguish teammates to earn a guaranteed minicrit on your next attack", },
    { pointCost: 0, text: "Creates a cloud of poison gas dealing 8 dmg/s to those within", },
    { pointCost: -1, text: "Creates a slippery surface for enemies while boosting the speed of allies.", },
  ],

  Throwable_Weapon: [
    { pointCost: 0, text: "Throw at your enemies to deal damage and make them bleed for 5s", },
    { pointCost: 0, text: "Throw at your enemies to deal damage and mark them for death for 5s", },
    { pointCost: 0, text: "Throw at your enemies to deal damage and ignite them for 5s", },
    { pointCost: 0, text: "Throw at your enemies to deal low damage and remove all buffs. Two throwables instead of one!", },
    { pointCost: 0, text: "Throw at your enemies to deal low damage and reveal their health for 5s. Two throwables instead of one!", },
    { pointCost: 0, text: "Throw at your enemies to deal damage. Two throwables instead of one!", },
    { pointCost: 0, text: "Throw at your enemies to deal low damage but massive knockback!", },
  ],

  Wrench: [
    { pointCost: 0, text: "Doubles repair/construction speed of allies' buildings on hit.", },
    { pointCost: 0, text: "Hitting an enemy building twice reverts it to a lower level version of itself", },
    { pointCost: 1, text: "Removes sappers in a single hit", },
    { pointCost: 1, text: "Team Player: You spend -50% less metal when upgrading allies' buildings", },
    { pointCost: 1, text: "Hold Alt-Fire to drain metal from the ammo pool of your sentry into your pocket", },
    { pointCost: -1, text: "Exchanges teleporters for boost pads", },
    { pointCost: -1, text: "Exchanges teleporters for jump pads", },
    { pointCost: 0, text: "Replaces the Sentry with a Railgun", },
    { pointCost: 0, text: "Replaces the Sentry with a Tesla Coil", },
    { pointCost: 1, text: "Teleporters are two-way", },
    { pointCost: 0, text: "", },
  ],
  
};

const neutralStats = { // SPACE I CREATED FOR CUSTOM STATS
    Grenade_Launcher:  [
      { text: "Hold Fire to charge grenades' speed",},
    ],
    Indivisible_Particle_Smasher:  [
        { text: "(Purely cosmetic) Victims explode on kill",}, 
    ],
    Knife:  [
        { text: "Backstabbing stuns enemy for 3s, granting the user +40% movespeed and firing speed",}, 
        { text: "Backstabbing stuns enemy for 3s, granting the user minicrits during this period",}, 
        { text: "Backstabbing an enemy causes them to bleed critically until healing or death, granting the user +40% move/firing speed",}, 
        { text: "This knife can be thrown a short distance, and recharges over 10s. Recharge time is halved on a backstab.",}, 
        { text: "Backstabs reduce enemies to 1 HP and grant the user an instant primary deploy",}, 
    ],
    Medi_Gun:  [
        { text: "ÜberCharge is split into halves",},
        { text: "ÜberCharge is split into thirds",}, 
        { text: "ÜberCharge is split into quarters", },
        { text: "This Medi Gun fires a constant, ammo-less beam that requires aiming",},
    ],
    Melee:  [
        { text: "This melee charges from 0 damage up to double damage over 2 seconds",}, 
        { text: "This Weapon has a large melee range and deploys and holsters slower",}, 
        { text: "(Purely cosmetic) Victims explode on kill",}, 
        { text: "(Purely cosmetic) Victims disintegrate on kill",}, 
    ],
    Rocket_Launcher:  [
        { text: "Hold Fire to charge rockets' speed",},
    ],
    Shotgun: [
        { text: "Alt-Fire: Switch between ammo and health collection modes at the cost of every pack being one size smaller", 
        classLimit: ["Engineer"]},
    ],
    Scattergun:  [
        { text: "Alt-Fire: Switch between ammo and health collection modes at the cost of every pack being one size smaller",},
    ],
    Sniper_Rifle:  [
        { text: "This rifle fires high-speed projectile bullets that deal +15% more damage",}, 
        { text: "Fully charged headshots decapitate victims",}, 
        { text: "Fully charged headshots gib victims",}, 
    ],
    Wrench:  [
        { text: "This weapon has sustained fire, via spinning, firing a beam, or something similar.",}, 
    ],
    
};

const weaponEffects = [

  //// ---------- ////

  //// BY CLASS ////

  //// AllScout ////
  // {
  //   for: weaponTypeGroups.AllScout, // perhaps this should stack?
  //   classLimit: ["Scout"],
  //   pro: "+1 air jump on wearer",
  //   con: "No double jump", // - 1 air jump?
  // },
  {
    for: weaponTypeGroups.AllScout,
    classLimit: ["Scout"],
    pro: "+<value> air jump(s) on wearer",
    con: "-<value> air jump(s) on wearer",
    valuePro: 1,
    valueCon: 1,
  },
  {
    for: weaponTypeGroups.AllScout,
    classLimit: ["Scout"],
    pro: "+<value> capture rate",
    con: "-<value> capture rate",
    valuePro: 1,
    valueCon: 1,
  },
  {
    for: weaponTypeGroups.AllScout,
    classLimit: ["Scout"],
    pro: "+<value>% sentry damage resistance on wearer",
    con: "+<value>% sentry damage vulnerability on wearer",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllScout.filter(
        (i) => !weaponTypeGroups.AllPassive.includes(i)
      ),
    classLimit: ["Scout"],
    pro: "+<value>% jump height while active",
    con: "-<value>% decreased jump height while active",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: ["Scout_Lunch_Box"],
    pro: "While effect is active: +<value>% jump height",
    con: "While effect is active: -<value>% decreased jump height",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    classLimit: ["Scout"],
    pro: "Can Goomba Stomp enemies while active",
    con: "Fall damage is doubled for wearer",
  },
  {
    for: ["Scattergun"],
    pro: "The first shot minicrits enemies recently hit by one of the user's projectile weapons",
    con: "On Hit: Removes any debuffs you've inflicted",
  },
  {
    for: ["Scattergun"],
    pro: "+10% firing speed per consecutive hit, to a max of +50%",
    con: "On Hit: Target moves at your speed for 3s",
  },
  {
    for: ["Scattergun"],
    pro: "Can air jump <value> more time(s) for 10s after a kill",
    con: "Marked for death for 3s after air jumping",
    valuePro: 2,
  },
  {
    for: ["Pistol"],
    classLimit: ["Scout"],
    pro: "User cannot be targeted by a sentry with this active if they keep moving and don't attack",
    con: "+25% sentry damage vulnerability while active",
  },
  {
    for: ["Pistol"],
    classLimit: ["Scout"],
    pro: "Inflict 1s of bleed on hit",
    con: "User bleeds for 3s after inflicting bleed with any weapon",
  },
  {
    for: ["Scout_Lunch_Box"],
    pro: "For 10s, +<value>% movespeed per second until you stop moving",
    con: "-<value>% movespeed per jump while weapon effect is active",
    valuePro: 5,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Scout"],
    pro: "On Kill: Your next attack will douse an enemy in Mad Milk",
    con: "On Miss: User is covered with Mad Milk for 5s",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Scout"],
    pro: "Time a swing to reflect a projectile!",
    con: "+60% slower swing speed (swing speed of the other classes)",
  },
  //// AllSoldier ////
  {
    for: ["Rocket_Launcher"],
    pro: "Launches Bread Monsters: Direct hits inflict 3s of bleed",
    con: "Every third rocket is a loaf of bread that deals 1 damage",
  },
  {
    for: ["Rocket_Launcher"],
    pro: "Consecutive direct hits minicrit",
    con: "-<value>% splash damage",
    valueCon: 25,
  },
  {
    for: ["Rocket_Launcher"],
    pro: "Gain 5% movespeed on hit, to a max of +20%. Resets on miss.",
    con: "Rockets fired on the ground are <value>% slower",
    valueCon: 20,
  },
  {
    for: ["Rocket_Launcher"],
    pro: "Fires fireworks that ignite airborne targets",
    con: "Marked for death while blast jumping",
  },
  {
    for: ["Banner"],
    pro: "Damage dealt by user and allies prolongs the buff",
    con: "Dropping below 30% health empties the buff altogether",
  },
  {
    for: ["Boots"],
    pro: "Double Jump to drop straight down and deal stomp damage",
    con: "-10% movespeed for 10s after taking fall damage",
  },
  {
    for: ["Boots"],
    pro: "Double Jump to reverse your vertical velocity", // you can fly ("Demoman's Gravity Changing Moon Shoes")
    con: "Take critical damage from projectiles while airborne",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Soldier"],
    pro: "On Hit Taken While Active: damage of next attack increases by 8% to a max of +40%",
    con: "On Hit Taken While Active: movespeed decreases by 5% to a min of +15%",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Soldier"],
    pro: "Every third consecutive hit is a NECK SNAP™ that crits",
    con: "Hit yourself every three misses. Idiot.",
  },
  //// AllPyro ////
  {
    for: weaponTypeGroups.AllPyro.filter(
      (i) => weaponTypeGroups.AllAfterburn.includes(i)
    ),
    classLimit: ["Pyro"],
    pro: "+<value>% longer afterburn on enemies from all weapons",
    con: "-<value>% longer afterburn on enemies from all weapons",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllPyro.filter(
      (i) => weaponTypeGroups.AllDoesDamage.includes(i)
    ),
    classLimit: ["Pyro"],
    pro: "+<value>% damage vs nonburning players",
    con: "-<value>% damage vs nonburning players",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllPyro.filter(
      (i) => weaponTypeGroups.AllDoesDamage.includes(i)
    ),
    classLimit: ["Pyro"],
    pro: "Minicrits vs burning players",
    con: "-25% damage penalty vs burning players",
  },
  {
    for: weaponTypeGroups.AllPyro,
    classLimit: ["Pyro"],
    pro: "Upon death: Ignite all enemies around you in a ball of fire",
    con: "All afterburn times are halved",
  },
  {
    for: weaponTypeGroups.AllPyro.filter((i) =>
      weaponTypeGroups.Melee.includes(i)),
    classLimit: ["Pyro"],
    pro: "Damage removes sappers in two hits",
    con: "Wearer cannot ignite disguised spies",
  },
  {
    for: weaponTypeGroups.AllPyro,
    classLimit: ["Pyro"],
    pro: "Fire Retardant: Fire does no damage to you at all",
    con: "You are no longer immune to afterburn",
  },
  {
    for: ["Flamethrower", "Flare_Gun"],
    pro: "Can ignite buildings with this weapon",
    con: "Deals halved damage to buildings",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Flames linger in the air for <value> second(s)",
    con: "Flames linger in the air for <value> second(s), but passing through them deals mini-crit damage to you",
    valuePro: 3,
    valueCon: 3,
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "+<value>% flame range",
    con: "-<value>% flame range",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Twice the airblast force",
    con: "No compression blast",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Reflected projectiles can crit buildings",
    con: "Deals no damage against buildings",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Reflected projectiles always crit",
    con: "Nearby projectiles home in",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "+2 ammo gained per tick of damage/afterburn",
    con: "+50% ammo consumption rate",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Airblast can now be charged, which will push enemies further",
    con: "Airblast can no longer push enemies or projectiles",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Airblast can now be charged, causing a small explosion when fully charged",
    con: "Airblast destroys projectiles at the cost of twice the ammo consumed",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Afterburn flames deal no damage but can't be extinguished by healing",
    con: "Taking any other damage extinguishes the target",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "+2% movespeed for each consecutive second any target is burning, to a max of +20%",
    con: "Cannot extinguish allies",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Leave behind a short-lived trail of fire while firing",
    con: "Airblast cannot reflect projectiles",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Leave behind a gasoline trail while firing that boosts allies and slips foes",
    con: "Leave behind a gasoline trail while firing that you can slip on",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "Can airblast jump",
    con: "Airblast cannot reflect projectiles or extinguish allies",
  },
  {
    for: weaponTypeGroups.Flamethrower,
    pro: "-<value>% airblast cost",
    con: "+<value>% airblast cost",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Pyro"],
    pro: "Hitting friendly buildings helps them deploy faster",
    con: "Your other weapons no longer damage Spies; you must use this melee",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Pyro"],
    pro: "Creates a fiery explosion on every third hit",
    con: "User is ignited while wielding this weapon",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Pyro"],
    pro: "On Hit: Target is doused in gasoline for 10s",
    con: "On Hit: Splash slippery gasoline around",
  },

  //// AllDemoman ////
  {
    for: weaponTypeGroups.AllDemoman,
    classLimit: ["Demoman"],
    pro: "-<value>% damage to self with all weapons",
    con: "+<value>% damage to self with all weapons",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: ["Grenade_Launcher"],
    pro: "Grenades can bounce once, dealing halved damage afterwards",
    con: "Launched bombs shatter on surfaces",
  },
  {
    for: ["Grenade_Launcher"],
    pro: "Errant Twitch: Deals triple knockback to burning targets",
    con: "Errant Twitch: Cannot fire while burning",
  },
  {
    for: ["Grenade_Launcher"],
    pro: "Grenades neither bounce nor roll",
    con: "Grenades are incredibly bouncy",
  },
  {
    for: ["Grenade_Launcher"],
    pro: "Grenades explode on surfaces",
    con: "Grenades only explode on hit",
  },
  {
    for: ["Grenade_Launcher"],
    pro: "Hold to charge a grenade to deal up to +100% the knockback",
    con: "Deals no knockback on hit",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "+<value> max pipebombs out",
    con: "-<value> max pipebombs out",
    valuePro: 6,
    valueCon: 4,
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Detonates stickybombs near the crosshair and directly under your feet",
    con: "Can only detonate stickybombs in line of sight",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "+50% sticky charge distance",
    con: "Cannot charge sticky distance",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "+<value>% sticky distance charge rate",
    con: "-<value>% sticky distance charge rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybombs automatically detonate when an enemy comes near",
    con: "Stickybombs fizzle out after 10s",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "<value>% faster bomb arm time",
    con: "<value>% slower bomb arm time",
    valuePro: 35, // quickie is 40% faster
    valueCon: 35,
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Can destroy enemy stickybombs",
    con: "Stickybomb detonations that deal no damage deal <value> psychic damage to the user",
    valueCon: 25,
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybombs can't be moved or destroyed. If bombs have been down >10s, user is marked for death.",
    con: "Stickybombs are destroyed when affected by knockback",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybombs explode on hit",
    con: "Stickybombs take 100% more knockback when pushed",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Ardent Spirits: Stickybombs wet targets, causing them to take minicrits from fire",
    con: "Ardent Spirits: Liquor-filled bombs leave puddles that slip up the user",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybomb knockback increases with charge up to +200%",
    con: "Stickybombs deal negligble knockback to enemies",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Demoman"],
    pro: "Wets enemies in alcohol on hit, making them take minicrits from fire damage",
    con: "On Melee Hit Received: User is covered in alcohol, and takes minicrits from fire damage",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Demoman"],
    pro: "Deals crits while the wielder is blast jumping",
    con: "Can only swing while airborne",
  },
  //// AllDemoknight ////
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge duration increased by <value>%",
    con: "Charge duration decreased by <value>%",
    valuePro: 50,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge speed increased by <value>%",
    con: "Charge speed decreased by <value>%",
    valuePro: 25,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge meter recharges <value>% faster",
    con: "Charge meter recharges <value>% slower",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "Mark enemy for death on bash for 3s",
    con: "User is marked for death on bash for 3s",
  },
  {
    for: ["Demoknight_Shield"],
    pro: "Bash ignites target",
    con: "Meter slowly decreases while burning",
  },
  {
    for: ["Demoknight_Shield"],
    pro: "Bash causes an explosion that doesn't harm the user",
    con: "Explosion damage taken while charging halts the charge",
  },
  {
    for: ["Demoknight_Shield"],
    pro: "Meter can also be charged in small amounts by ammo",
    con: "Meter requires ammo",
  },
  {
    for: ["Demoknight_Shield"],
    pro: "+<value>% bullet damage resistance on wearer",
    con: "+<value>% bullet damage vulnerability on wearer",
    valuePro: 35,
    valueCon: 35,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "+<value>% explosive damage resistance on wearer",
    con: "+<value>% explosive damage vulnerability on wearer",
    valuePro: 35,
    valueCon: 35,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "+<value>% fire damage resistance on wearer",
    con: "+<value>% fire damage vulnerability on wearer",
    valuePro: 35,
    valueCon: 35,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "+<value>% increase in charge impact damage",
    con: "+<value>% decrease in charge impact damage",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "+<value>% increase in charge recharge rate while below 50% max health",
    con: "+<value>% decrease in charge recharge rate while below 50% max health",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Demoknight_Shield"],
    pro: "Charge doesn't stop after hitting an enemy, knocking them straight into the air",
    con: "Taking damage while shield charging reduces remaining charge time",
  },
  {
    for: ["Demoknight_Melee"],
    pro: "Hit a teammate to knight them, using your charge meter to heal half their health",
    con: "Enemies heal half the melee damage they deal to you",
  },
  //// AllHeavy ////
  {
    for: weaponTypeGroups.AllHeavy.filter((i) =>
      weaponTypeGroups.AllCanHit.includes(i)),
    classLimit: ["Heavy"],
    pro: "On Kill: Move at your victim's movespeed for 5 seconds",
    con: "No healing can be received within 3 seconds of taking damage", // LMAO
  },
  {
    for: ["Minigun"],
    pro: "<value>% faster spin up time",
    con: "<value>% slower spin up time",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Minigun"],
    pro: "Weapon slowly restores ammo when revved up without shooting (but produces a louder noise)",
    con: "Weapon cannot be revved up without shooting",
  },
  {
    for: ["Minigun"],
    pro: "Sustained fire ignites enemies",
    con: "Sustained fire ignites user",
  },
  {
    for: ["Minigun"],
    pro: "+<value>% increased revved-up movespeed",
    con: "-<value>% decreased revved-up movespeed",
    valuePro: 40,
    valueCon: 20,
  },
  {
    for: ["Minigun"],
    pro: "+2% movespeed per consecutive hit, to a max of +<value>%",
    con: "-1% movespeed per consecutive hit, to a min of -<value>",
    valuePro: 30,
    valueCon: 20,
  },
  {
    for: ["Minigun"],
    pro: "The Tank: +<value>% damage resistance while revved up, for each ally nearby. Max of +30%",
    con: "+<value>% damage vulnerability for each ally downed with you nearby. Max of +30%",
    valuePro: 8,
    valueCon: 10,
  },
  {
    for: ["Shotgun"],
    classLimit: ["Heavy"],
    pro: "Alt-Fire: Fire a shot that empties the clip but heals for 100% of damage dealt",
    con: "-<value>% max health while active",
    valueCon: 30,
  },
  {
    for: ["Shotgun"],
    classLimit: ["Heavy"],
    pro: "Per Any Shot: +<value> HP",
    con: "Per Shot: -<value> HP",
    valuePro: 8,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Heavy"],
    pro: "Heavyweight Champ: +<value> firing speed",
    con: "Swinging requires a length, uninterruptible windup",
    valuePro: 50,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Heavy"],
    pro: "Time a swing to reflect a projectile!",
    con: "+50% knockback received while active", // regular class knockback
  },
  //// AllEngineer ////
  {
    for: ["Shotgun"],
    classLimit: ["Engineer"],
    pro: "Alt-Fire to convert all of your primary ammo into 200 metal",
    con: "Scrap Shooter: -15 metal lost every 3 shots",
  },
  {
    for: ["Revolver"],
    classLimit: ["Engineer"],
    pro: "+50 metal gained on headshot",
    con: "Uses metal for ammo",
  },
  {
    for: ["Revolver"],
    classLimit: ["Engineer"],
    pro: "Every hit heals your buildings by <value>%, split between them all",
    con: "Buildings stop operating when you fire, for <value> second(s)",
    valuePro: 15,
    valueCon: 5,
  },
  {
    for: ["Revolver"],
    classLimit: ["Engineer"],
    pro: "+<value>% damage bonus against the last person who damaged one of your buildings",
    con: "-<value>% damage penalty against the last person who damaged one of your buildings",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: ["Revolver"],
    classLimit: ["Engineer"],
    pro: "Quick Draw: Instant deploy right after taking a significant instance of damage",
    con: "Frazzled: -<value>% deploy speed shortly after taking a significant instance of damage",
    valueCon: 50,
  },
  {
    for: ["Shotgun", "Revolver"],
    classLimit: ["Engineer"],
    pro: "While active, +<value>% movespeed while your sentry is firing",
    con: "While active, -<value>% movespeed while your sentry is firing",
    valuePro: 20,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "All buildings cost -<value>% less metal to repair",
    con: "All buildings cost +<value>% more metal to repair",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "+<value> metal regenerated every 15s on wearer",
    con: "Loose Pockets: <value> metal lost every 15s on wearer",
    valuePro: 30,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "All buildings cost -<value>% less metal to construct",
    con: "All buildings cost +<value>% more metal to construct",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "Dispensers cost -<value>% less metal",
    con: "Dispensers cost +<value>% more metal",
    valuePro: 70,
    valueCon: 70,
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "+<value> max metal capacity on wearer",
    con: "-<value> max metal capacity on wearer",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllBullet,
    classLimit: ["Engineer"],
    pro: "Gain two minicrits for each sentry kill, and one for each assist",
    con: "Your health is halved when a building goes down",
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "Killing the enemy who destroyed your building halves the build and repair costs of all buildings for 10s",
    con: "User is marked for death for the enemy who destroyed their building for 10s",
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "Start off 10% slower. +<value>% movespeed for each building active",
    con: "-<value> max metal capacity for each building active",
    valuePro: 10,
    valueCon: 20,
  },
  {
    for: ["Wrench"],
    pro: "Firing speed is doubled when repairing a building",
    con: "Buildings do not construct themselves",
  },
  {
    for: ["Wrench"],
    pro: "Dispensers deploy instantly",
    con: "Dispensers take twice the time to deploy",
  },
  {
    for: ["Wrench"],
    pro: "Teleporters deploy instantly",
    con: "Teleporters do not construct themselves",
  },
  {
    for: ["Wrench"],
    pro: "Minicrits when user was near a dispenser within the last 5s",
    con: "No metal from dispensers while active",
  },
  {
    for: ["Wrench"],
    pro: "+<value>% damage resistance while hauling buildings",
    con: "+<value>% damage vulnerability while hauling buildings",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "Dispensers cost <value>% less",
    con: "Dispensers cost <value>% more",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "Teleporters cost <value>% less",
    con: "Teleporters cost <value>% more",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "Teleporters can be used in both directions",
    con: "Teleporters give 5s +40% speed boosts, +10% per additional level",
  },
  {
    for: ["Wrench"],
    pro: "+20% hauling movespeed",
    con: "Cannot pick up buildings",
  },
  {
    for: ["Wrench"],
    pro: "A melee kill will fully heal all of your buildings",
    con: "Attachment Issues: A sentry kill against a target who you haven't seen yet will halve its health",
  },
  {
    for: ["Wrench"],
    pro: "Alt-Fire to reduce your health to 1 and fully heal your weakest building. 1 minute cooldown",
    con: "You die if all your buildings go down", // not sure about this one
  },
  {
    for: ["Wrench"],
    pro: "Dispensers can overheal",
    con: "Dispensers can only heal one person at a time",
  },
  {
    for: ["Wrench"],
    pro: "Construction hit speed boost increased by <value>%",
    con: "Construction hit speed boost decreased by <value>%",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: ["Wrench"],
    pro: "<value>% faster repair rate",
    con: "<value>% slower repair rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "-<value> metal on any hit",
    con: "+<value> metal gained on hit against an enemy",
    valuePro: 10,
    valueCon: 25,
  },
  {
    for: ["Wrench"],
    pro: "Sentry deals +<value>% damage to enemies within your line of sight",
    con: "Sentry deals -<value>% damage to enemies outside your line of sight",
    valuePro: 20,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "Sentry fires <value> more rocket(s)",
    con: "Sentry fires <value> less rocket(s)",
    valuePro: 2,
    valueCon: 2,
  },
  //// AllMedic ////
  {
    for: weaponTypeGroups.AllMedic.filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)
    ),
    classLimit: ["Medic"],
    pro: "You receive +<value>% healing from all sources while active",
    con: "You receive -<value>% healing from all sources while active",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "+<value> health regenerated per second on wearer",
    con: "-<value> health drained per second on wearer",
    valuePro: 5,
    valueCon: 5,
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "All non-passive healing received can overheal",
    con: "User cannot be overhealed", // sort of a nothing stat
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "Crit immunity on user",
    con: "Minicrits received deal critical damage",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "Ammo boxes collected are also received as a smaller health pack",
    con: "-25% healing from health packs",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "Wearer is immune to bleed and afterburn",
    con: "Wearer no longer has passive healing",
  },
  {
    for: weaponTypeGroups.AllMedic.filter((i) =>
        weaponTypeGroups.AllDoesDamage.includes(i)),
    classLimit: ["Medic"],
    pro: "On Kill: Opportunity to taunt in order to gain 25% ÜberCharge",
    con: "On Death: Drop a medium health pack",
  },
  {
    for: weaponTypeGroups.AllMedic.filter((i) =>
        weaponTypeGroups.AllCanHit.includes(i)),
    classLimit: ["Medic"],
    pro: "Fully heals user on kill",
    con: "Hippocratic Hypocrite: Marked for death for 3s after a kill",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "All nearby teammates heal by <value> HP when you or a nearby ally secures a kill",
    con: "+<value>% damage vulnerability for 8s when a nearby ally dies",
    valuePro: 30,
    valueCon: 25,
  },
  {
    for: ["Syringe_Gun"],
    pro: "On Kill: Heal all nearby allies by 25 HP",
    con: "Marked for death when an ally dies while you have this deployed",
  },
  {
    for: ["Syringe_Gun"],
    pro: "+<value>% ÜberCharge on hit",
    con: "-<value>% ÜberCharge on hit",
    valuePro: 4,
    valueCon: 2,
  },
  {
    for: ["Syringe_Gun"],
    pro: "On Hit: Draw blood, gaining <value>% ÜberCharge",
    con: "Drains <value>% ÜberCharge per second while active",
    valuePro: 3,
    valueCon: 3,
  },
  {
    for: ["Crossbow"],
    classLimit: ["Medic"],
    pro: "+<value>% ÜberCharge on hit",
    con: "-<value>% ÜberCharge on hit",
    valuePro: 10,
    valueCon: 5,
  },
  {
    for: ["Crossbow"],
    classLimit: ["Medic"],
    pro: "+<value>% ÜberCharge build rate for 15s after kill",
    con: "-<value>% ÜberCharge build rate for 15s after kill",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: ["Crossbow"],
    classLimit: ["Medic"],
    pro: "On Hit: For 8s, user gains a +<value>% damage resistance to everyone but target",
    con: "On Hit: Target moves at or above your movespeed for 8s",
    valuePro: 20,
  },
  {
    for: ["Crossbow"],
    classLimit: ["Medic"],
    pro: "On Hit: For 8s, allies heal for 60% of damage dealt to target",
    con: "On Hit: User's healing rate is halved for 8s",
  },
  {
    for: ["Medi_Gun"],
    pro: "Each kill your patient gets increases ÜberCharge by 10% (which can prolong Übers)",
    con: "This Medi Gun solely charges with patient damage and kills, rather than by healing",
  },
  {
    for: ["Medi_Gun"],
    pro: "+<value>% ÜberCharge build rate",
    con: "-<value>% ÜberCharge build rate",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: ["Medi_Gun"],
    pro: "+<value>% heal rate",
    con: "-<value>% heal rate",
    valuePro: 40,
    valueCon: 40,
  },
  {
    for: ["Medi_Gun"],
    pro: Math.random() < 0.5 ? "+<value>% max overheal" : "+<value>% longer overheal time",
    con: "<value>% shorter overheal time",
    valuePro: 50,
    valueCon: 50,
  },
  { 
    for: ["Medi_Gun"],
    pro: "Overheal bonus doesn't decay for <value> second(s)",
    con: "Overheal decays <value>% faster",
    valuePro: 10,
    valueCon: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "Heals teammates near the patient for <value>% of the patient's healing",
    con: "Commitment Issues: -<value>% heal rate for 8s after switching heal targets",
    valuePro: 30,
    valueCon: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "While active, user's movespeed increases as ÜberCharge increases, up to +<value>%",
    con: "While active, user's movespeed slows as ÜberCharge increases, down to -<value>%",
    valuePro: 30,
    valueCon: 25,
  },
  {
    for: ["Medi_Gun"],
    pro: "Alt-Fire without a full meter to double the speed of healing by draining your own health",
    con: "No healing during ÜberCharge",
  },
  {
    for: ["Medi_Gun"],
    pro: "Can start ÜberCharge early, without a full meter",
    con: "Only the ÜberCharge target is actually ÜberCharged -- user isn't",
  },
  {
    for: ["Medi_Gun"],
    pro: "+<value>% beam connect range",
    con: "-<value>% beam connect range",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "+<value>% ÜberCharge duration",
    con: "-<value>% ÜberCharge duration",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "On significant damage dealt by target: +<value>% ÜberCharge",
    con: "On significant damage taken: lose <value>% ÜberCharge",
    valuePro: 9,
    valueCon: 5,
  },
  {
    for: ["Medi_Gun"],
    pro: "When healing an ally below 50% health, user is also healed at half the rate",
    con: "Overheats when used for longer than 10 seconds, igniting the user",
  },
  {
    for: ["Medi_Gun"],
    pro: "ÜberCharge is automatically activated when lethal damage is taken, setting user to 1 HP",
    con: "Must hold down Alt-Fire for 5s before ÜberCharge can be activated",
  },
  {
    for: ["Medi_Gun"],
    pro: "Double ÜberCharge gained while healing patients below 50% health",
    con: "No ÜberCharge gained while healing overhealed patients",
  },
  {
    for: ["Medi_Gun"],
    pro: "User buffs are shared with the target, and vice versa",
    con: "Target debuffs are shared with the user, and vice versa",
  },
  {
    for: ["Medi_Gun"],
    pro: "Damage taken while ÜberCharged is converted into up to <value>% extra leftover ÜberCharge once the Über is over",
    con: "Taking damage while ÜberCharged reduces charge's duration",
    valuePro: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "Critical damage on the heal target is completely nullified",
    con: "Healing the same target for longer than 8s marks user for death",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Medic"],
    pro: "On Hit: <value>% ÜberCharge added",
    con: "On Hit: <value>% ÜberCharge lost",
    valuePro: 20,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Medic"],
    pro: "On Hit: Inflict 5s of bleed",
    con: "Every third swing uses 10% ÜberCharge",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Medic"],
    pro: "While Active: Enemies who get near you are poisoned, taking <value> damage per second for 5s",
    con: "Medical Malpractice: You drop a poison flask when hit by a melee, taking <value> damage per second for 5s",
    valuePro: 5,
    valueCon: 5,
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Medic"],
    pro: "On Ally Hit: Ally heals by <value> HP per second until injured again or full",
    con: "-<value>% damage towards enemies who haven't damaged you or your last patient",
    valuePro: 9,
    valueCon: 50,
  },
  //// AllSniper ////
  {
    for: weaponTypeGroups.AllSniper,
    classLimit: ["Sniper"],
    pro: "When hit by a melee from the back or sides, jarate is splashed all around you",
    con: "When hit by a melee, you are doused in jarate for 2s",
  },
  {
    for: ["Sniper_Rifle"],
    pro: "+100% knockback on hit",
    con: "No headshots",
  },
  {
    for: ["Sniper_Rifle"],
    pro: "+<value>% charge rate",
    con: "-<value>% charge rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Sniper_Rifle"],
    pro: "No movespeed penalty while scoped",
    con: "Cannot move while scoped",
  },
  {
    for: ["Sniper_Rifle"],
    pro: "Can headshot while unscoped",
    con: "Cannot shoot while unscoped",
  },
  {
    for: ["Sniper_Rifle"],
    pro: "Headshot kills cause target’s head to explode into poison cloud",
    con: "Rifle fires once full charge is reached",
  },
  {
    for: ["Bow"],
    pro: "Fully charged arrows are ignited",
    con: "Fully charged arrows are instantly released",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Sniper"],
    pro: "On Kill: Your next attack will douse an enemy in jarate",
    con: "On Miss: User is covered with jarate for 3s",
  },
  //// AllSpy ////
  {
    for: weaponTypeGroups.AllSpy.filter(
    (i) =>
        i !== "Sapper" &&
        i !== "Invis_Watch"
    ),
    classLimit: ["Spy"],
    pro: "Attacking while disguised grants you +<value>% movespeed for 5s afterwards",
    con: "Cannot disguise for <value> seconds after attacking",
    valuePro: 20,
    valueCon: 5,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "+<value>% movespeed while debuffed",
    con: "-<value>% movespeed while debuffed",
    valuePro: 30,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "+<value>% cloak per discrete instance of damage taken",
    con: "-<value>% cloak per discrete instance of damage taken",
    valuePro: 20,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "+<value>% cloak gained upon backstab",
    con: "-<value>% cloak lost upon backstab",
    valuePro: 75,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "+<value>% cloak from ammo boxes",
    con: "-<value>% cloak from ammo boxes",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "+<value>% movespeed for 3s after receiving damage",
    con: "-<value>% movespeed for 3s after receiving damage",
    valuePro: 20,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "Cannot be ignited while disguised",
    con: "+35% fire damage vulnerability while disguised",
  },
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "In addition to HP, user can see enemy's loadout, ammo, charges, and whether they're a disguised Spy",
    con: "Unable to see enemy health",
  },
  {
    for: ["Revolver"],
    classLimit: ["Spy"],
    pro: "Attacking while disguised deals up to an additional <value>% damage depending on how long you've been near an enemy",
    con: "Nerves: Attacking while disguised deals down to -<value>% less damage, depending on how long you've been near an enemy",
    valuePro: 20,
    valueCon: 15,
  },
  {
    for: ["Revolver"],
    classLimit: ["Spy"],
    pro: "+<value>% cloak on hit",
    con: "-<value>% cloak on hit",
    valuePro: 30,
    valueCon: 10,
  },
  {
    for: ["Revolver"],
    classLimit: ["Spy"],
    pro: "Minicrits while <50% health",
    con: "-20% damage penalty when <50% health",
  },
  {
    for: ["Revolver"],
    classLimit: ["Spy"],
    pro: "Kills don't show up in the killfeed",
    con: "Victim cries out loudly on death",
  },
  {
    for: ["Revolver"],
    classLimit: ["Spy"],
    pro: "+<value>% damage bonus against buildings",
    con: "Deals no damage to buildings being sapped",
    valuePro: 50,
  },
  {
    for: ["Invis_Watch"],
    pro: "Cloaking automatically selects a random disguise, smoke-free",
    con: "Cannot disguise while invisible",
  },
  {
    for: ["Invis_Watch"],
    pro: "Decloak is very quiet",
    con: "Decloak is very loud",
  },
  {
    for: ["Invis_Watch"],
    pro: "Cloak in half the time",
    con: "Cloaking takes twice as long",
  },
  {
    for: ["Invis_Watch"],
    pro: "+<value>% movespeed while cloaked near objectives",
    con: "Lone Wolf: User cannot perform objectives",
    valuePro: 20,
  },
  {
    for: ["Invis_Watch"],
    pro: "+<value>% cloak regen rate",
    con: "+<value>% cloak drain rate",
    valuePro: 40,
    valueCon: 30,
  },
  {
    for: ["Sapper"],
    pro: "Sapped buildings remain disabled for <value> second(s) after the sapper is removed",
    con: "Sappers only activate <value> second(s) after the sapper is placed",
    valuePro: 3,
    valueCon: 3,
  },
  {
    for: ["Sapper"],
    pro: "+<value>% movespeed while a sapper is sapping",
    con: "-<value>% movespeed while a sapper is sapping",
    valuePro: 20,
    valueCon: 15,
  },
  {
    for: ["Sapper"],
    pro: "Alt-Fire: Can throw sapper from a distance, with a 15s cooldown",
    con: "After applying sapper, cannot apply another for 3 seconds",
  },
  {
    for: ["Sapper"],
    pro: "Can apply sapper while invisible. Doing so uncloaks the user.",
    con: "Applying sapper removes disguise",
  },
  {
    for: ["Sapper"],
    pro: "+5 health regenerated per second for each active sapper",
    con: "Maximum one sapper active at a time",
  },
  {
    for: ["Sapper"],
    pro: "+50% sapper health bonus",
    con: "Sappers can be destroyed in a single hit",
  },
  {
    for: ["Sapper"],
    pro: "+<value>% sapper damage bonus",
    con: "-<value>% sapper damage penalty",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: ["Sapper"],
    pro: "Sapping grants you +<value>% movespeed for 10s",
    con: "Cannot disguise for <value> seconds after sapping",
    valuePro: 20,
    valueCon: 10,
  },
  {
    for: ["Knife"],
    pro: "Backstabs also affect those connected by beams, while enemies linked by group buffs split the damage equally between them",
    con: "Marked for death for 10s for enemies who you butterknife",
  },
  {
    for: ["Knife"],
    pro: "On Backstab: Your next attack with any weapon is a critical hit",
    con: "On Backstab: Your next attack with another weapon deals halved damage",
  },
  //// Exclude A Class ////

  // { // boring stat but useful template
  //   for: weaponTypeGroups.All, // exclude Medic?
  //   classLimit: ["Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Sniper", "Spy"],
  //   pro: "+<value>% health from healers on wearer",
  //   con: "-<value>% health from healers on wearer",
  //   valuePro: 50,
  //   valueCon: 50,
  // },

  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)),
    classLimit: ["Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper"],
    pro: "Can see enemies' HP while active",
    con: "Enemies can see your HP while active",
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)),
    classLimit: ["Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper"],
    pro: "Can see the HP of enemies",
    con: "Enemies can see your HP",
  },
  { 
    for: weaponTypeGroups.All,
    classLimit: ["Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper", "Spy"],
    pro: "+<value> capture rate on user",
    con: Math.random() < 0.5 ? "User cannot attack while capturing" : "User cannot capture objectives",
    valuePro: 1,
  },

  //// ---------- ////

  //// All All WeaponTypeGroups

  //// AllAfterburn ////
  {
    for: weaponTypeGroups.AllAfterburn,
    pro: "+<value>% afterburn damage bonus",
    con: "-<value>% afterburn damage penalty",
    valuePro: 20,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllAfterburn,
    pro: "+<value>% afterburn duration",
    con: "-<value>% afterburn duration",
    valuePro: 50,
    valueCon: 50,
  },
  //// AllAutomatic ////
  {
    for: weaponTypeGroups.AllCanHit.filter((i) =>
      weaponTypeGroups.AllAutomatic.includes(i) && i !== "Flamethrower"),
    pro: "Firing speed increases the longer it's fired",
    con: "Firing speed decreases the longer it's fired",
  },
  {
    for: weaponTypeGroups.AllAutomatic,
    pro: "Movement speed increases the longer this weapon has been fired",
    con: "-2 HP/s while firing due to heat; heal up during an extended pause or reload",
  },
   //// AllBullet ////
  {
    for: weaponTypeGroups.AllBullet,
    pro: "This weapon shoots high-speed projectiles that deal +15% more damage",
    con: "This weapon shoots high-speed projectiles instead of bullets",
  },
  {
    for: weaponTypeGroups.AllBullet,
    pro: "Fire at a surface at point-blank to knock yourself back",
    con: "Missed bullets that hit nearby surfaces have a 20% chance of ricocheting back at you",
  },
  //// AllCanHeadshot ////
  {
    for: weaponTypeGroups.AllCanHeadshot.filter((i) =>
      i !== "Sniper_Rifle"),
    pro: "On Headshot: Next reload will be <value>% faster",
    con: "On Miss: Next reload will be <value>% slower",
    valuePro: 50,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllCanHeadshot.filter((i) =>
      i !== "Sniper_Rifle"),
    pro: "On Headshot: Deal +<value>% damage",
    con: "On Headshot: Turn enemy around LOL", // LOL
    valuePro: 100,
  },
  {
    for: weaponTypeGroups.AllCanHeadshot.filter((i) =>
      i !== "Sniper_Rifle"),
    pro: "On Headshot: Remove any debuffs and heal for 25 HP",
    con: "On Lethal Headshot: Weapon is inaccessible for 5s",
  },
  {
    for: weaponTypeGroups.AllCanHeadshot,
    pro: "Lethal headshots cause victim to explode, damaging their nearby allies",
    con: "Wanted!: Lethal headshots mark user for death for 3s",
  },
  //// AllCanHit ////
  // {
  //   for: weaponTypeGroups.AllCanHit.filter((i) =>
  //     weaponTypeGroups.AllAutomatic.includes(i) && i !== "Flamethrower" // applies to stuff that's in both groups; I'm excluding Flamethrower
  //   ),
  //   pro: "On Hit: +<value> HP",
  //   con: "On Miss: -<value> HP",
  //   valuePro: 5,
  //   valueCon: 1,
  // },
  // {
  //   for: weaponTypeGroups.AllCanHit,
  //   pro: "On Hit Teammate: Grant <value>% faster firing rate to both for 5 seconds",
  //   con: "On Miss: <value>% slower firing rate for the next 3 seconds",
  //   valuePro: 30,
  //   valueCon: 15,
  // },
  // {
  //   for: weaponTypeGroups.AllCanHit,
  //   pro: "On Hit Teammate: Grant +<value>% movespeed to both for 5 seconds",
  //   con: "On Miss: <value>% movespeed for the next 3 seconds",
  //   valuePro: 25,
  //   valueCon: 10,
  // },
  {
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit: Instant switch and deploy speed for all weapons for 5s",
    con: "Headstrong!: After missing, user can't switch weapons for 3s",
  },
  {
    for: weaponTypeGroups.AllCanHit.filter(
      (i) =>
          i !== "Throwable_AOE"
    ),
    pro: "+<value>% movespeed while deployed",
    con: "-<value>% movespeed while deployed",
    valuePro: 20,
    valueCon: 20,
  },
  // {
  //   for: weaponTypeGroups.AllCanHit.filter(
  //       (i) =>
  //           i !== "Knife" &&
  //           i !== "Melee"
  //   ),
  //   pro: "On Hit: +<value>% reload, attack, and firing speed for 10s",
  //   con: "On Hit: Enemy gains +<value>% reload, attack, and firing speed for 5s",
  //   valuePro: 50,
  //   valueCon: 20,
  // },
  //// AllDoesDamage ////
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage bonus",
    con: "-<value>% damage penalty",
    valuePro: 20,
    valueCon: 20,
  },
  // {
  //   for: weaponTypeGroups.AllDoesDamage, // BORING
  //   pro: "Crits whenever it would normally mini-crit",
  //   con: "Mini-crits whenever it would normally crit",
  // },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "Damage increases as the user becomes injured",
    con: "Damage decreases down to 50% as the user becomes injured",
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage vs buildings",
    con: "-<value>% damage vs buildings",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllDoesDamage.filter((i) => 
      i !== "Sniper_Rifle"
    ),
    pro: "On Kill: +<value> max health for 20 seconds; health raises to compensate if full",
    con: "On Kill: The next attack received within 10s is a guaranteed minicrit", // idk about this one
    valuePro: 35,
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Kill: Health is set to victim's max health if higher",
    con: "On Kill: Gain +50% of max HP, but get marked for death for 8s", // idk about this one
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage bonus when attacking from behind",
    con: "Coward!: -<value>% less damage when attacking from behind",
    valuePro: 20,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllDoesDamage.filter(
        (i) =>
            i !== "Knife"
    ),
    pro: "Minicrits overhealed enemies and enemies being healed",
    con: "-<value>% damage against overhealed enemies and enemies being healed",
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllDoesDamage.filter(
        (i) =>
            i !== "Knife"
    ),
    pro: "Crits against user only deal regular damage",
    con: "Cannot deal crits with this weapon",
  },
  //// No Melee ////
  {
    for: weaponTypeGroups.AllDoesDamage.filter(
        (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "On Kill: Powerplay! Locked to melee and Übercharged for 6s. Cannot crit during this time.", // idk about this one
    con: "On Kill: Locked to melee for 3s", 
  },
  //// AllExplosive ////
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% larger blast radius",
    con: "<value>% smaller blast radius",
    valuePro: 75,
    valueCon: 75,
  },
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% stronger explosion knockback",
    con: "<value>% weaker explosion knockback",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "+<value>% explosion knockback on self",
    con: "+<value>% self damage taken",
    valuePro: 100,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% less damage to self",
    con: "<value>% more damage to self",
    valuePro: 35,
    valueCon: 35,
  },
  //// AllHasClip ////
  {
    for: weaponTypeGroups.AllHasClip,
    pro: "+<value>% clip size",
    con: "-<value>% clip size",
    valuePro: 50,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllHasClip,
    pro: "On Kill: Clip fully reloads",
    con: "Double the reload time when failed to kill with an emptied clip",
  },
  //// AllProjectile ////
  {
    for: weaponTypeGroups.AllProjectile,
    pro: "<value>% faster projectile speed",
    con: "<value>% slower projectile speed",
    valuePro: 75,
    valueCon: 35,
  },
  //// AllReflectable ////
  {
    for: [weaponTypeGroups.AllReflectable].filter(
      (i) =>
        i !== "Throwable_AOE"),
    pro: "Projectile cannot be reflected",
    con: "Projectile deals crit damage when reflected and moves at twice the speed",
  },
  //// AllReloading ////
  // {
  //   for: weaponTypeGroups.AllReloading, // boring
  //   pro: "<value>% faster reload speed",
  //   con: "<value>% slower reload speed",
  //   valuePro: 50,
  //   valueCon: 50,
  // },
  {
    for: [...weaponTypeGroups.AllReloading].filter(
      (i) =>
        i !== "Flamethrower" &&
        i !== "Sniper_Rifle" &&
        i !== "Flare_Gun" &&
        i !== "Bow"
    ),
    pro: "<value>% faster firing speed",
    con: "<value>% slower firing speed",
    valuePro: 50,
    valueCon: 50,
  },
  //// AllSubstantialHit ////
  // {
  //   for: weaponTypeGroups.AllSubstantialHit,
  //   pro: "On Hit: Causes enemy to bleed for 5s",
  //   con: "Shame! On Miss: Causes user to bleed for 3s",
  // },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Hit: One target at a time is Marked-For-Death, causing all damage taken to be mini-crits",
    con: "On Hit: User is Marked-For-Death for the last person they damaged for 3s",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) =>
        i !== "Grenade_Launcher" &&
        i !== "Stickybomb_Launcher"
    ),
    pro: "Alt-Fire halves user's health for a guaranteed minicrit. 30s cooldown.",
    con: "Cannot deal crits or minicrits below 75% health",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) =>
        i !== "Grenade_Launcher" &&
        i !== "Stickybomb_Launcher"
    ),
    pro: "Guaranteed minicrits while capturing points or pushing the cart",
    con: "-20% damage penalty while capturing points or pushing the cart",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "While Active: -<value>% knockback from all sources while capturing points, intelligence, or the cart",
    con: "+<value>% knockback from all sources while capturing points, intelligence, or the cart",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
        (i) => !weaponTypeGroups.Melee.includes(i),
      ),
    pro: "Firing speed increases as health decreases",
    con: "+50% reload/firing speed below 30% max health",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
        (i) => !weaponTypeGroups.Melee.includes(i),
      ),
    pro: "+<value>% damage bonus against airborne targets",
    con: "+<value>% damage vulnerability from airborne enemies",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "On Hit: Gain up to +<value> health",
    con: "Securing a kill below 10% health with your last shot fully heals you. Missing makes you drop dead.", // IDK WHAT TO PUT HERE
    valuePro: 25,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "Each consecutive hit deals +10% more damage, to a max of +30%",
    con: "Each consecutive hit deals -5% less damage, to a min of -15%",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Kill: 5s of 100% mini-critical chance",
    con: "No critical nor minicritical hits",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "Massive knockback on the target at close range",
    con: "Massive knockback on the target and user at close range",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "+1 ammo instantly reloaded on hit",
    con: "Missing subtracts 2 ammo instead of 1",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "Mini-crits targets launched airborne by explosions, grapple hooks or rocket packs",
    con: "+15% damage vulnerability while launched airborne by explosions, grapple hooks or rocket packs",
  },
  // {
  //   for: weaponTypeGroups.AllSubstantialHit,
  //   pro: "On Kill: Reset health to what it was before the last 3 instances of damage, if higher than present health",
  //   con: "On Kill: Any overheal is removed",
  // },
  //// AllWithAmmo ////
  {
    for: weaponTypeGroups.AllWithAmmo,
    pro: "Does not require ammo",
    con: "Chops ammo twice as fast",
  },


  //// ---------- ////

  //// AllAll ////
  {
    for: weaponTypeGroups.All,
    pro: "+<value>% faster movespeed on wearer",
    con: "-<value>% slower movespeed on wearer",
    valuePro: 15,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Heal up to <value> HP per second while out of combat",
    con: "+<value>% damage vulnerability when out of combat for twenty seconds or more",
    valuePro: 5,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Battle Fever: Heal up to <value> HP per second while in combat",
    con: "All healing received is decreased down to -<value>% while recently in combat",
    valuePro: 5,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Immunity to movement-impairing effects",
    con: "Knockback received is doubled",
  },
  {
    for: weaponTypeGroups.All,
    pro: "All received debuffs turn into buffs",
    con: "All received debuffs last twice as long",
  },
  {
    for: weaponTypeGroups.All,
    pro: "All buffs on user last <value>% longer",
    con: "All debuffs on user last <value>% longer",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.All,
    pro: "+<value>% health from packs on wearer",
    con: "-<value>% health from packs on wearer",
    valuePro: 75,
    valueCon: 50,
  },
  /// AllActive
  // {
  //   for: [...weaponTypeGroups.All].filter(
  //     (i) => !weaponTypeGroups.AllPassive.includes(i)
  //   ),
  //   pro: "This weapon deploys <value>% faster",
  //   con: "This weapon deploys <value>% slower",
  //   valuePro: 100,
  //   valueCon: 50,
  // },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)
    ),
    pro: "+30% healing from all sources while active",
    con: "Blocks healing while in use",
  },
  // {
  //   for: [...weaponTypeGroups.All].filter( // boring
  //     (i) => !weaponTypeGroups.AllPassive.includes(i)
  //   ),
  //   pro: "This weapon holsters <value>% faster",
  //   con: "This weapon holsters <value>% slower",
  //   valuePro: 50,
  //   valueCon: 50,
  // },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)
    ),
    pro: "This weapon deploys and holsters <value>% faster",
    con: "This weapon deploys and holsters <value>% slower",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)
    ),
    pro: "Movespeed while active increases up to <value>% as the user becomes injured",
    con: "Movespeed while active decreases down to -<value>% as the user becomes injured",
    valuePro: 30,
    valueCon: 20,
  },
  // {
  //   for: [...weaponTypeGroups.All].filter(
  //     (i) => !weaponTypeGroups.AllPassive.includes(i)
  //   ),
  //   pro: "Deploy speed increases up to <value>% as the user becomes injured",
  //   con: "Deploy speed decreases down to -<value>% as the user becomes injured",
  //   valuePro: 100,
  //   valueCon: 50,
  // },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.AllPassive.includes(i)
    ),
    pro: "+<value> capture rate while active",
    con: "Inaccessible while capturing",
    valuePro: 1,
  },

  //// END OF ALLS

  //// ---------- ////

  // Slot Specific
  // { // idk about these ones
  //   for: weaponTypeGroups.Slot1.filter((i) =>
  //     weaponTypeGroups.AllCanHit.includes(i)),
  //   pro: "+<value>% max ammo",
  //   con: "-<value>% secondary ammo capacity (if applicable)",
  //   valuePro: 40,
  //   valueCon: 40,
  // },
  // {
  //   for: weaponTypeGroups.Slot2.filter((i) =>
  //     weaponTypeGroups.AllCanHit.includes(i)),
  //   pro: "+<value>% max ammo",
  //   con: "-<value>% primary ammo capacity (if applicable)",
  //   valuePro: 40,
  //   valueCon: 40,
  // },
  
  //// ---------- ////

  //// Single WeaponTypeGroups

  // {
  //   for: weaponTypeGroups.AutomaticProjectiles, // lmao but what about falloff
  //   pro: "Consecutive hits deal +1 more damage than the previous hit",
  //   con: "Consecutive hits deal -1 less damage than the previous hit, down to 1", // what a horrible con lmao, fix
  // },
  {
    for: weaponTypeGroups.BurstBullet,
    pro: "On Hit: Heal <value> HP per connecting bullet",
    con: "Bad Handling: Scrape your fingers during a reload, losing 5 HP",
    valuePro: 2,
  },
  {
    for: weaponTypeGroups.BurstBullet,
    pro: "+<value>% more bullets per shot",
    con: "-<value>% less bullets per shot",
    valuePro: 20, // a Scattergun with this can one-shot at point blank
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.ChargeablePassive,
    pro: "<value>% faster meter charge rate",
    con: "<value>% slower meter charge rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.ConsumablePassive,
    pro: "+<value>% faster recharge rate",
    con: "-<value>% slower recharge rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.ConsumablePassive,
    pro: "+<value>% faster consumption time",
    con: "-<value>% slower consumption time",
    valuePro: 100,
    valueCon: 100,
  },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% faster recharge time",
    con: "-<value>% slower recharge time",
    valuePro: 50,
    valueCon: 50,
  },
  // {
  //   for: weaponTypeGroups.ConsumableProjectile,
  //   pro: "+<value>% increased movement speed after firing, for 5 seconds",
  //   con: "-<value>% decreased movement speed after firing, for 3 seconds",
  //   valuePro: 15,
  //   valueCon: 15,
  // },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "Explode on hit",
    con: "Any debuffs the enemy has or receives is applied to the user for half the duration",
  },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "On Hit: Half the recharge time is filled",
    con: "On Miss: 50% slower recharge time",
  },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "Applicable effects scale up to +<value>% based on distance travelled",
    con: "Applicable ffects decrease down to -<value>% based on distance travelled",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.ExplosiveProjectile,
    pro: "+100% increased air control when blast jumping",
    con: "-100% decreased air control when blast jumping",
  },
  //// AllMelee ////
  {
    for: weaponTypeGroups.Melee,
    pro: "Taunting removes any debuffs for self and nearby allies. Taunt takes 2 seconds",
    con: "Player is marked for death while active",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "Imbued with an ancient power -- victims turn to gold and drop a large ammo pack upon death",
    con: "Being killed with this active fully heals the killer",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "On Kill: +10% movespeed for 8s",
    con: "On Kill: Laugh uncontrollably at your victim",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "The third hit in a row always crits",
    con: "Every third hit deals only 1 damage",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "Alt-Fire to parry a melee hit",
    con: "On Miss: Hit yourself. Idiot.",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "On Melee Hit: Ignite target for 3s",
    con: "On Melee Hit Received: User is ignited for 3s",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "-<value>% damage from ranged sources while active",
    con: "+<value>% damage from ranged sources while active",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "-<value>% damage from melee sources while active",
    con: "+<value>% damage from melee sources while active",
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "On Hit: All the target's attacks are <value>% weaker for 8s",
    con: "On Melee Hit Received: Your melee attacks are <value>% weaker for 8s",
    valuePro: 25,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "+<value>% swing/firing speed",
    con: "-<value>% swing/firing speed",
    valuePro: 40,
    valueCon: 50,
  },
  //// AllPassive ////
  {
    for: weaponTypeGroups.Passive,
    pro: "+<value>% healing from all sources",
    con: "-<value>% healing from all sources",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "Overheal can give you up to +<value>% more max HP above base overheal",
    con: "Overheal only gives you up to +<value>% max HP",
    valuePro: 50,
    valueCon: 40,
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "+<value> health regenerated per second on wearer",
    con: "+<value>% damage vulnerability on wearer",
    valuePro: 5,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.Passive, // ? not a good con, and redundant
    pro: "+<value>% jump height on wearer",
    con: "-<value>% movespeed on wearer",
    valuePro: 50,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "Wearer cannot be ignited",
    con: "+25% fire vulnerability",
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "+<value> max HP on wearer",
    con: "-<value> max HP on wearer",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "On Hit: Loading next shot will be +<value>% faster",
    con: "On Miss: Loading next shot will be -<value>% slower",
    valuePro: 100,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "Explodes on hit, allowing blast jumping",
    con: "On Hit: User is marked for death for the enemy for 3s",
  },
  {
    for: weaponTypeGroups.SingleShotProjectile.filter((i) => 
      i !== "Crossbow"
    ),
    pro: "This weapon reloads while inactive",
    con: "Reloading uses a longer, specialized animation",
  },

  //// ---------- ////

  //// Class Combo Specific ////
  {
    for: weaponTypeGroups.AllCanHit,
    classLimit: ["Engineer", "Medic", "Spy"],
    pro: "Smart Cookie: Enemies who you hit or who hit you are visible through walls for 8s",
    con: "After getting hit by an enemy, they can see you through walls for 3s",
  },
  {
    for: weaponTypeGroups.AllCanHit,
    classLimit: ["Engineer", "Medic"],
    pro: "Smart Cookie: See target's health for 5s on hit",
    con: "On Hit: Enemies can see your HP for 3s",
  },
  {
    for: weaponTypeGroups.Melee,
    classLimit: ["Engineer", "Medic"],
    pro: "Temporarily reduces target's max health by damage amount instead of dealing damage",
    con: "Deals halved damage to enemies with more health than you",
  },
  {
    for: weaponTypeGroups.All,
    classLimit: ["Soldier", "Demoman", "Heavy"], // Uber-able
    pro: "Damage received is split equally between user and healer; one cannot die before the other",
    con: "<value>% of the damage the user receives is received by the healer",
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    classLimit: ["Soldier", "Demoman", "Heavy"], // Uber-able
    pro: "Up to +<value>% damage dealt the lower your healer's health is",
    con: "Down to -<value>% damage dealt the lower your healer's health is",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.All,
    classLimit: ["Scout", "Pyro", "Sniper"], // debuffing
    pro: "All debuffs user applies last <value>% longer",
    con: "Duration of debuffs user applies are <value>% shorter",
    valuePro: 50,
    valueCon: 50,
  },
  
  //// Misc., Weapon-Specific ////
  {
    for: ["Throwable_AoE"], // filter for AoE
    pro: "Projectile cannot be reflected",
    con: "If reflected, covered players are debuffed for twice the duration",
  },
  {
    for: ["Throwable_AoE", "Throwable Weapon", "Melee_with_Projectile"],
    pro: "Double the misc. ammo/charges",
    con: "+50% recharge time",
  },

  { // Risky syntax
    for: ["Revolver", "Flare_Gun",
      ...weaponTypeGroups.ExplosiveProjectile,
      ...weaponTypeGroups.BurstBullet
    ],
    pro: "Can hold to charge next shot to deal up to +<value>% damage",
    con: "Firing speed is halved below 20% HP", // I hate this
    valuePro: 20,
  },
  
  {
    for: ["Sniper_Rifle", "Revolver", "Bow", "Flare_Gun", "Crossbow"],
    pro: "Fires very, very quietly",
    con: "Fires tracer rounds",
  },
  {
    for: ["Bow", "Crossbow"],
    pro: "Arrows ignite on hit",
    con: "Reflected arrows are ignited and explode on hit",
  },
  {
    for: ["Rocket_Launcher", "Stickybomb_Launcher"],
    pro: "Deal damage to nearby enemies when you land from a blast jump, based on the fall distance",
    con: "Fall damage from blast jumps is doubled",
  },
  {
    for: ["Rocket_Launcher", "Stickybomb_Launcher", "Grenade_Launcher"],
    pro: "+<value>% damage bonus while blast jumping",
    con: "-<value>% damage penalty while blast jumping",
    valuePro: 25,
    valueCon: 15,
  },
  {
    for: ["Banner", "Demoknight_Shield"],
    pro: "Alt-Fire to charge meter 50% faster at the cost of marking yourself for death until it's full",
    con: "Meter charges at half speed when below half health",
  },
  {
    for: ["Ray_Gun"],
    pro: "Projectile cannot be deflected",
    con: "Reflected projectiles crit",
  },
  {
    for: ["Ray_Gun"],
    pro: "Alt-Fire to charge up a minicrit shot",
    con: "Deals only 20% damage to buildings",
  },
  {
    for: ["Ray_Gun"],
    pro: "Explode on hit",
    con: "Enemies are energized when hit and gain +15% movespeed",
  },
  {
    for: ["Ray_Gun"],
    pro: "Ignite enemy on hit",
    con: "Emptying the clip ignites the user",
  },
  {
    for: ["Boots"],
    pro: "User doesn't take fall damage",
    con: "Lead Soles: You fall 30% faster",
  },
  {
    for: ["Boots"],
    pro: "Hold Space to become lighter, prolonging your air time",
    con: "Your boots are too tight! Lose 5 HP/50 feet walked",
  },
];

document.body.onkeyup = function(e) {
    if (e.key == " " ||
      e.code == "Space" ||
      e.keyCode == 32) {
      const playerClass = playerClassSelectDesktop.value;
      const weaponSlot = weaponSlotSelectDesktop.value;
      const powerLevel = powerLevelSelectDesktop.value;
      const extraStats = extraStatsSelectDesktop.value;
      const weaponTypeChosen = weaponTypeSelectDesktop.value;
  
      const weapon = generateWeapon(
        parseInt(playerClass) || getRandom(1, 9), // parseInt turns val to int
        parseInt(weaponSlot) || getRandom(1, 3),
        parseInt(powerLevel),
        parseInt(extraStats),
        weaponTypeChosen || "Any")
      window.location.hash = Base64.encode(JSON.stringify(weapon));
    }
    else if (e.key === "ArrowUp") {
      changeBackgroundButton.click();
    }
    else if (e.key === "ArrowDown") {
      captureButton.click();
    }
    // else if (e.key === "Enter") { // reload functionality to get rid of the hash; implement in a button click perhaps
    //   window.location.hash = "";
    //   history.replaceState(null, null, ' ');
    //   location.reload();
    // }
  }
  
generateBtnMobile.addEventListener("click", () => {
  const playerClass = playerClassSelectMobile.value;
  const weaponSlot = weaponSlotSelectMobile.value;
  const powerLevel = powerLevelSelectMobile.value;
  const extraStats = extraStatsSelectMobile.value;
  const weaponTypeChosen = weaponTypeSelectMobile.value;

  const weapon = generateWeapon(
    parseInt(playerClass) || getRandom(1, 9), // parseInt turns val to int
    parseInt(weaponSlot) || getRandom(1, 3),
    parseInt(powerLevel),
    parseInt(extraStats),
    weaponTypeChosen || "Any"
  );

  window.location.hash = Base64.encode(JSON.stringify(weapon));
});
  
generateBtnDesktop.addEventListener("click", () => {
  // console.log("Weapon Generating...");
  const playerClass = playerClassSelectDesktop.value;
  const weaponSlot = weaponSlotSelectDesktop.value;
  const powerLevel = powerLevelSelectDesktop.value;
  const extraStats = extraStatsSelectDesktop.value;
  const weaponTypeChosen = weaponTypeSelectDesktop.value;

  const weapon = generateWeapon(
    parseInt(playerClass) || getRandom(1, 9), // parseInt turns val to int
    parseInt(weaponSlot) || getRandom(1, 3),
    parseInt(powerLevel),
    parseInt(extraStats),
    weaponTypeChosen || "Any"
  );

  window.location.hash = Base64.encode(JSON.stringify(weapon));
  generateBtnDesktop.blur();
  // first, stringify the weapon stats into a json string
  // then, encode in base64
  // finally, add it to the window I think, useful for preserving state
  // if you provide someone the same hash, they can retrieve the weapon
});

  
window.onhashchange = function() {
  tryLoadWeaponFromUrl();
};

tryLoadWeaponFromUrl(); //* tries like right away in the script

let lastIndex = 28; // set to whatever I set wallpaper_{num} to

document.getElementById('changeBackgroundButton').addEventListener('click', backGroundChange);

function backGroundChange(e) {
  e.preventDefault();
  let randomBackgroundIndex;
  do {
      randomBackgroundIndex = Math.floor(Math.random() * 33) + 1; // amount of wallpapers available
  } while (randomBackgroundIndex === lastIndex); // prevent duplicates
  lastIndex = randomBackgroundIndex;
  // console.log(`Background changed to wallpaper_${randomBackgroundIndex}`);
  // document.body.style.backgroundImage = `url('../images/wallpaper_${randomBackgroundIndex}.jpg')`;
  const imgUrl = `../images/wallpaper_${randomBackgroundIndex}.jpg`;
  const img = new Image();
  img.onload = function() { // we must load the image; otherwise, simply setting it causes the original to flicker
      document.body.style.backgroundImage = `url(${imgUrl})`;
  }
  img.src = imgUrl;
  changeBackgroundButton.blur();
};

document.getElementById('captureButton').addEventListener('click', function() {
  // console.log(`Capture requested`);
  const weaponArea = document.getElementById('generatedWeaponAreaDesktop');
  weaponArea.style.width = "300px";
  html2canvas(weaponArea).then(canvas => {
      const imageUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'weapon_image.png';
      // downloadLink.click();

      const newWindow = window.open();
      newWindow.document.write(`
                  <html>
                  <head>
                      <title>Weapon Image</title>
                  </head>
                  <body>
                      <img src="${imageUrl}" alt="Weapon Image" width="300px !important"/>
                  </body>
                  </html>
              `);

  }).catch(err => {
      console.error('Error capturing the image:', err);
  });
  weaponArea.style.width = "100%";
  captureButton.blur();
  // console.log(`Capture complete`);
});


function generateWeapon(playerClass, weaponSlot, powerLevel, extraStats, weaponTypeChosen) {
    // console.log("Weapon Generating...");

    let weaponType;
    let matchingClassIndex;
    let originalBoost;

    if (weaponTypeChosen != 0) {
      // console.log(`Weapon Type Specified: ${weaponTypeChosen}`);
    }

    if (weaponTypeChosen) {
        // If a weapon type is chosen, find a matching class and slot
        let matchingClasses = [];
        weaponTypesByClass.forEach((classes, index) => {
            if (classes.some(weapon => weapon.type.name === weaponTypeChosen)) {
                matchingClasses.push(index);
            }
        });
    
        if (matchingClasses.length > 0) {
            // Choose a random class from the matching classes
            const randomClassIndex = Math.floor(Math.random() * matchingClasses.length);
            matchingClassIndex = matchingClasses[randomClassIndex];
            // console.log(`Chosen class has index ${matchingClassIndex}, which is ${strings.classes[matchingClassIndex + 1]}`);
            const matchingClassWeapons = weaponTypesByClass[matchingClassIndex];
            // Searching for the matching weapon type within the class
            const matchingWeapon = matchingClassWeapons.find(w => w.type.name === weaponTypeChosen);
            // const matchingSlot = matchingClassWeapons.find(w => w.type.name === weaponTypeChosen);
            
            if (matchingWeapon) {
                // Assign weapon type and slot
                weaponType = matchingWeapon.type;
                weaponSlot = matchingWeapon.slot;
                
                // Modify the needsBoost property of this weapon type
                weaponType.needsBoost = weaponType.needsBoost || 0;
                originalBoost = weaponType.needsBoost; // Added so that we don't infinitely stack needsBoost on weapons (yikes!)
                weaponType.needsBoost += powerLevel;
            }
        } else {
            // If no matching class is found, fall back to selecting a weapon type based on player class, weapon slot, and power level
            weaponType = selectWeaponType(playerClass, weaponSlot, powerLevel);
        }
    } else {
        // If no weapon type is chosen, fall back
        weaponType = selectWeaponType(playerClass, weaponSlot, powerLevel);
    }

    // Check if weaponType is defined
    if (!weaponType) {
        console.error('Unable to generate weapon. Weapon type is undefined.');
        return null;
    }

    let modificationCounts;
    // console.log(`${extraStats} mod count(s) selected`);
    if (extraStats === 1) {
        modificationCounts = 1;
    } else {
        modificationCounts = getRandom(extraStats - 1, extraStats);
    }
    if (weaponType.needsBoost && modificationCounts > 1) {
        modificationCounts -= 1;
    }

  // console.log(`This weapon will have ${modificationCounts} mod(s)`);

  const proBoost = Math.max(0, weaponType.needsBoost);
  const conBoost = Math.max(0, -weaponType.needsBoost);

  // console.log(`   proBoost of ${proBoost}`);
  // console.log(`   conBoost of ${conBoost}`);

  const weapon = {
    playerClass: matchingClassIndex !== undefined ? strings.classes[matchingClassIndex + 1] : playerClass,
    playerClassName: matchingClassIndex !== undefined ? strings.classes[matchingClassIndex + 1] : strings.classes[playerClass],
    weaponSlot: weaponSlot,
    weaponSlotName: strings.slots[weaponSlot],
    type: weaponType.name,
    proPoints: modificationCounts + proBoost, // if it needs a boost, it adds this many points
    conPoints: modificationCounts + conBoost, 
    neutralStats: [],
    mandatoryPros: [],
    pros: [],
    cons: [],
  };

  if (weaponTypeChosen) { // this resets needsBoost so it doesn't stack indefinitely
    weaponType.needsBoost = originalBoost;
  }

  addNeutralStat(weapon);
  addMandatoryPro(weapon);
  addWeaponProsAndCons(weapon);
  return weapon;
}

function addMandatoryPro(weapon) {
  const mandatoryProOptions = mandatoryPros[weapon.type]; // gets options
  if (!mandatoryProOptions || !mandatoryProOptions.length) return; // if none for this weapon type, then exit
  const selectedPro =
    mandatoryProOptions[getRandom(0, mandatoryProOptions.length - 1)]; // chooses one

  weapon.mandatoryPros.push(selectedPro.text); // adds it
  weapon.proPoints -= selectedPro.pointCost; // propoints in weapon go down
  // the lesser, the more neglibile, I think

  if (weapon.proPoints < 0) { // if we're in the negatives now
    weapon.conPoints += -weapon.proPoints; // ensure to balance it out
    weapon.proPoints = 0;
  }
}

function addNeutralStat(weapon) {
  const neutralOptions = neutralStats[weapon.type]; 
  if (!neutralOptions || !neutralOptions.length) return;

  // class limit filtering
  const applicableNeutralOptions = neutralOptions.filter(option => {
    return !option.classLimit || option.classLimit.includes(weapon.playerClassName);
  });

  if (!applicableNeutralOptions.length) return;

  const neutralStatRoll = Math.random(); // between 0 and 1
  const chanceForNeutralStat = 0.2; // set chance for a neutral stat

  if (neutralStatRoll < chanceForNeutralStat) {
    // console.log(`Neutral stat rolled with chance of ${chanceForNeutralStat}`);
    const selectedNeutral = applicableNeutralOptions[getRandom(0, applicableNeutralOptions.length - 1)];
    weapon.neutralStats.push(selectedNeutral.text); 
  }
  else {
    weapon.neutralStats.push("");
  }
}

function addWeaponProsAndCons(weapon) { 
    
  const possibleOptions = cloneJson(
    weaponEffects
      .filter((i) => Array.isArray(i.for) && i.for.includes(weapon.type)) // check if option is array including weapon type
      .filter(i => !i.classLimit || (Array.isArray(i.classLimit) && i.classLimit.includes(weapon.playerClassName))) // check if no class limit
      // or if `classLimit` is an array and includes class
    ).map((option) => { // clones these filtered options so as not to affect the original array
    return {
      ...option,
      valuePro: addRandomnessToNumber(option.valuePro), // +-20%
      valueCon: addRandomnessToNumber(option.valueCon), // +-20%
    };
  });

  const selectedProIndices = selectRandomIndices(
    possibleOptions.length, // collectionSize
    weapon.proPoints, // countToSelect
    [], // forbiddenIndices
    (i) => possibleOptions[i].valuePro !== undefined // options that have defined pro values can be stacked
  );
  const selectedConIndices = selectRandomIndices(
    possibleOptions.length,
    weapon.conPoints,
    selectedProIndices,
    (i) => possibleOptions[i].valueCon !== undefined
  );

  // console.log("Pros are the following:"); 
  const selectedPros = getSelectedOptionsByIndices(
    possibleOptions,
    selectedProIndices,
    1 // added these to check if proOrCon in console; not really important
  );
  // console.log(`${selectedPros.length} pro(s) selected in total`);
  // console.log("Cons are the following:"); 
  const selectedCons = getSelectedOptionsByIndices(
    possibleOptions,
    selectedConIndices,
    0
  );
  // console.log(`${selectedCons.length} con(s) selected in total`);

  weapon.pros.push(
    ...selectedPros.map((i) => i.pro.replace("<value>", i.valuePro))
  );
  weapon.cons.push(
    ...selectedCons.map((i) => i.con.replace("<value>", i.valueCon))
  );
}

// copy a JS object; turn into a string then parse
// parsing turns a json string into an object, go figure
// so in the end, I suppose this just deep copies
function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getSelectedOptionsByIndices(possibleOptions, selectedIndices, proOrCon) {
  const selectedOptions = [];
  for (let i = 0; i < selectedIndices.length; i++) { // go through selected indices
    const index = selectedIndices[i];
    let multiplier = 1;
    while (i < selectedIndices.length - 1 && selectedIndices[i + 1] === index) {
      // stay in bounds && check if consecutive repetitions
      i++; // skip
      multiplier++; // add a multiplier instead
    }
    const option = possibleOptions[index];
    selectedOptions.push({
      ...option,
      valuePro: option.valuePro * multiplier, // can double a stat
      valueCon: option.valueCon * multiplier,
    });
    if (proOrCon == 1) {
      // console.log(`   ${option.pro}`);   
    }
    else {
      // console.log(`   ${option.con}`);   
    }
  }
  
  return selectedOptions; // return options
}

function selectRandomIndices(
  collectionSize,
  amountToSelect,
  forbiddenIndices,
  checkCanStack = (i) => false, // I think this is always false idk; stacking means repeated stats
  chanceToStack = 0.33,
  maxAttempts = 100
) {
  const Indices = [];
  while (Indices.length < amountToSelect && maxAttempts-- > 0) {
    const indexToStack = Indices[Indices.length - 1]; // get last index
    if (Indices.length && checkCanStack(indexToStack)) { // check if indices length isn't 0 and determine if this can be added
      const roll = getRandom(0, 100); // random between 0 and 100
      const threshold = chanceToStack * 100; // threshold vs. roll
      if (roll < threshold) { // if roll is less than threshold, it works
        Indices.push(indexToStack);
        continue;
      }
    }
    const index = getRandom(0, collectionSize - 1); // get a random index no.
    if (Indices.includes(index) || forbiddenIndices.includes(index)) continue; // if the index is already here or forbidden, skip it
    Indices.push(index);
  }
  return Indices;
}

function selectWeaponType(playerClass, weaponSlot, powerLevel) {
  const classWeapons = weaponTypesByClass[playerClass - 1];
  const possibleChoices = classWeapons.filter((w) => w.slot === weaponSlot); // fit to right weapon slot
  const choice = cloneJson(
    possibleChoices[getRandom(0, possibleChoices.length - 1)]
  ); // get random choice
  choice.type.needsBoost = choice.type.needsBoost || 0; // 0 if undefined
  choice.type.needsBoost += powerLevel; // prolly can ignore
  return choice.type; // returns weapon type
}


function formatWeaponAsHtml(weapon) { // edited bootstrap my-3
    const randomImageIndex = Math.floor(Math.random() * weaponTypes[weapon.type].imageCount) + 1;
    // can pass an override bool as a checkbox to set randomImageIndex to 1 if I want
    const imageUrl = `weapon-images/${weapon.type}_${randomImageIndex}.png`;
    const fallbackUrl = `weapon-images/Unknown.png`; // Useful for my mistakes LOL

  return [
    `<div id="weapon" style="position: relative; padding: 10px;">`,
    `<div id="classIcon" style="position: absolute; top: 10px; left: 10px;">`,
    `<img src="class-icons/${weapon.playerClassName}.png" alt="${weapon.playerClassName} icon" style="width: 30px; height: 30px;" />`,
    `</div>`,
    `  <div id="weaponImage"> <img src="${imageUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}'" /> </div>`,
    `  <div id="weaponName" class="my-2 text-uppercase">${weapon.playerClassName} ${weapon.weaponSlotName}</div>`,
    `  <div id="weaponStats" class="my-3">`,
    `    <div id="weaponLevel" style="margin-bottom: 0.4rem !important;" >`,
    `      Level ${addRandomnessToNumber(getRandom(10, 50))}`,
    `      ${weapon.type.replace(/_/g, " ")}`,
    `    </div>`,
    `    <div id="weaponMandatoryStatsNeutral" class="my-3">`,
    (weapon.neutralStats || []).map((i) => `<div>${i}</div>`).join(""),
    `    </div>`,
    `    <div id="weaponMandatoryStats" class="my-3">`,
    (weapon.mandatoryPros || []).map((i) => `<div>${i}</div>`).join(""),
    `    </div>`,
    `    <div id="weaponPros" class="my-3">`,
    (weapon.pros || []).map((i) => `<div>${i}</div>`).join(""),
    `    </div>`,
    `    <div id="weaponCons" class="my-3">`,
    (weapon.cons || []).map((i) => `<div>${i}</div>`).join(""),
    `    </div>`,
    `  </div>`,
    `</div>`,
  ].join(" ");
}