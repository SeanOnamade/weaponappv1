const powerLevelSelect = document.getElementById("powerLevelSelect");
const playerClassSelect = document.getElementById("playerClassSelect");
const weaponSlotSelect = document.getElementById("weaponSlotSelect");
const generateBtn = document.getElementById("generateBtn");
const generatedWeaponArea = document.getElementById("generatedWeaponArea");

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
    console.log("It happened!")
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

// Space bar to generate
document.body.onkeyup = function(e) {
  if (e.key == " " ||
    e.code == "Space" ||
    e.keyCode == 32) {
    const playerClass = playerClassSelect.value;
    const weaponSlot = weaponSlotSelect.value;
    const powerLevel = powerLevelSelect.value;

    const weapon = generateWeapon(
      parseInt(playerClass) || getRandom(1, 9), // parseInt turns val to int
      parseInt(weaponSlot) || getRandom(1, 3),
      parseInt(powerLevel))
    window.location.hash = Base64.encode(JSON.stringify(weapon));
  }
}

generateBtn.addEventListener("click", () => {
  console.log("Weapon Generating...");
  const playerClass = playerClassSelect.value;
  const weaponSlot = weaponSlotSelect.value;
  const powerLevel = powerLevelSelect.value;

  const weapon = generateWeapon(
    parseInt(playerClass) || getRandom(1, 9), // parseInt turns val to int
    parseInt(weaponSlot) || getRandom(1, 3),
    parseInt(powerLevel)
  );

  window.location.hash = Base64.encode(JSON.stringify(weapon));
  // first, stringify the weapon stats into a json string
  // then, encode in base64
  // finally, add it to the window I think, useful for preserving state
  // if you provide someone the same hash, they can retrieve the weapon
});

window.onhashchange = function() {
  tryLoadWeaponFromUrl();
};

function tryLoadWeaponFromUrl() {
  // basically, if we pass it a special hash link, it will try to load it
  // decode and parse and update
  const hash = window.location.hash;
  if (!hash) return;
  const decoded = Base64.decode(hash.substring(1));
  const weapon = JSON.parse(decoded);

  generatedWeaponArea.innerHTML = formatWeaponAsHtml(weapon);
  document.title = `${weapon.playerClassName} ${weapon.weaponSlotName}`;
}
tryLoadWeaponFromUrl(); //* tries like right away in the script

// Basic Weapon Types
const weaponTypes = { // come back to change up later
  // needsBoost typically indicates level of enhancement required for the weapon type to perform optimally.
  Scattergun: { name: "Scattergun" },
  Shotgun: { name: "Shotgun" },
  Sniper_Rifle: { name: "Sniper_Rifle" },
  Revolver: { name: "Revolver" },
  Pistol: { name: "Pistol" },
  Minigun: { name: "Minigun" },
  Submachine_Gun: { name: "Submachine_Gun" },
  Flamethrower: { name: "Flamethrower" },
  Flare_Gun: { name: "Flare_Gun", needsBoost: 2 }, // ?
  Bow: { name: "Bow" },
  Syringe_Gun: { name: "Syringe_Gun" },
  Throwable_Weapon: { name: "Throwable_Weapon" },
  Throwable_AoE: { name: "Throwable_AoE" },
  Rocket_Launcher: { name: "Rocket_Launcher" },
  Grenade_Launcher: { name: "Grenade_Launcher" },
  Stickybomb_Launcher: { name: "Stickybomb_Launcher" },
  Medi_Gun: { name: "Medi_Gun" },
  Sapper: { name: "Sapper" },
  Scout_Lunch_Box: { name: "Scout_Lunch_Box" },
  Heavy_Lunch_Box: { name: "Heavy_Lunch_Box" },
  Banner: { name: "Banner" },
  Demoknight_Shield: { name: "Demoknight_Shield", needsBoost: 2 },
  Invis_Watch: { name: "Invis_Watch" },
  Backpack: { name: "Backpack", needsBoost: 2 },
  Boots: { name: "Boots", needsBoost: 2 },
  Demoknight_Boots: { name: "Demoknight_Boots", needsBoost: 4 },
  // Sniper_Shield: { name: "Sniper_Shield", needsBoost: 2 }, // get rid of?
  Melee: { name: "Melee" },
  Melee_with_Projectile: { name: "Melee_with_Projectile" },
  Pybro_Melee: { name: "Pybro_Melee" }, // ?
  Demoknight_Melee: { name: "Demoknight_Melee" },
  Explosive_Melee: { name: "Explosive_Melee" }, // ? just caber
  Wrench: { name: "Wrench" },
  Medic_Melee: { name: "Medic_Melee" },
  Knife: { name: "Knife" }, // Spy Melee
  // Surprise: { name: "Surprise" }, // mine
};

// Weapon Types in Arrays by Class :
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
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Pybro_Melee },
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
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Heavy_Lunch_Box },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Engineer
    { slot: 1, type: weaponTypes.Shotgun },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Pistol },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Revolver },
    { slot: 2, type: weaponTypes.Boots },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Wrench },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Medic
    { slot: 1, type: weaponTypes.Syringe_Gun },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Medi_Gun },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Medic_Melee },
    // { slot: 3, type: weaponTypes.Surprise },
  ],
  [
    // Sniper
    { slot: 1, type: weaponTypes.Sniper_Rifle },
    { slot: 1, type: weaponTypes.Bow },
    // { slot: 1, type: weaponTypes.Surprise },

    { slot: 2, type: weaponTypes.Submachine_Gun },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    // { slot: 2, type: weaponTypes.Throwable_Weapon },
    // { slot: 2, type: weaponTypes.Sniper_Shield }, // get rid of?
    { slot: 2, type: weaponTypes.Backpack },
    // { slot: 2, type: weaponTypes.Surprise },

    { slot: 3, type: weaponTypes.Melee },
    // { slot: 3, type: weaponTypes.Melee_with_Projectile }, // add in the future
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
  Slot1: ["Scattergun", "Rocket_Launcher", "Shotgun", "Flamethrower", "Grenade_Launcher", "Demoknight_Boots", "Backpack", "Minigun", "Syringe_Gun", "Sniper_Rifle", "Bow"],
  Slot2: ["Pistol", "Throwable_Weapon", "Throwable_AoE", "Scout_Lunch_Box", "Shotgun", "Banner", "Backpack", "Boots", "Flare_Gun", "Stickybomb_Launcher", "Demoknight_Shield", "Heavy_Lunch_Box", "Medi_Gun"],
  // BASIC GROUPS //
  BurstBullet: ["Scattergun", "Shotgun"], // REMOVED SURPRISE
  SingleBullet: ["Sniper_Rifle"],
  SemiAutomaticBullet: ["Revolver", "Pistol"], // interesting...
  AutomaticBullet: ["Minigun", "Submachine_Gun"], /// ... distinction :/
  Flamethrower: ["Flamethrower"],
  SingleShotProjectile: ["Bow", "Flare_Gun"],
  AutomaticProjectiles: ["Syringe_Gun"],
  ConsumableProjectile: ["Throwable_AoE", "Throwable_Weapon"],
  ExplosiveProjectile: ["Rocket_Launcher", "Grenade_Launcher", "Stickybomb_Launcher"],
  Medi_Gun: ["Medi_Gun"],
  Sapper: ["Sapper"],
  ConsumablePassive: ["Scout_Lunch_Box", "Heavy_Lunch_Box"],
  ChargeablePassive: ["Demoknight_Shield", "Banner", "Invis_Watch"], // should invis watch be here? This passive CHARGES passively
  Passive: ["Backpack", "Boots", "Demoknight_Boots", "Demoknight_Shield"], // removed Sniper shield
  Melee: [
    "Melee",
    "Demoknight_Melee",
    "Explosive_Melee",
    "Medic_Melee",
    "Pybro_Melee",
    "Melee_with_Projectile",
    "Wrench",
  ],
  Knife: ["Knife"],
  // Surprise: ["Surprise"]
};

// More, Second-Level Weapon Type Groups //
weaponTypeGroups.All = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Medi_Gun,
  ...weaponTypeGroups.Sapper,
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.Passive,
  ...weaponTypeGroups.Melee,
  "Knife", // I made it separate from melee
  // ...weaponTypeGroups.AllDemoknight,
  // ...weaponTypeGroups.AllSubstantialHit,
  // ...weaponTypeGroups.AllCanHeadshot,
];
weaponTypeGroups.AllAfterburn = [
  "Flamethrower",
  "Flare_Gun",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllAutomatic = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.AutomaticProjectiles,
  // technically could add Medi Gun but won't work for now
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllBullet = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllCanHeadshot = [
  "Sniper_Rifle",
  "Revolver",
  "Bow",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllCanHit = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Melee,
  // ...weaponTypeGroups.Surprise,
  "Knife", // I made knife its own category
];
weaponTypeGroups.AllDemoknight = [
  "Demoknight_Shield",
  "Demoknight_Boots",
  "Demoknight_Melee",
];
weaponTypeGroups.AllDoesDamage = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Melee,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllExplosive = [
  ...weaponTypeGroups.ExplosiveProjectile,
  "Explosive_Melee",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllHasClip = [ // could this be every weapon?
  ...weaponTypeGroups.SemiAutomaticBullet,
  "Submachine_Gun",
  "Syringe_Gun",
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.BurstBullet, // I added
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllPassive = [
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.Passive,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllProjectile = [
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  "Melee_with_Projectile",
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllReflectable = [
  "Bow",
  "Throwable_Weapon",
  "Rocket_Launcher",
  "Grenade_Launcher",
  "Melee_with_Projectile",
  "Flare_Gun", // added
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllReloading = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  "Submachine_Gun",
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.SingleShotProjectile, // adding this
];
weaponTypeGroups.AllSubstantialHit = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  "Throwable_Weapon",
  ...weaponTypeGroups.Melee,
  // ...weaponTypeGroups.Surprise,
];
weaponTypeGroups.AllWithAmmo = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
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
  Flare_Gun: [
    { pointCost: 0, text: "100% mini-crits vs burning players" },
    { pointCost: 0, text: "100% mini-crits vs wet players" },
  ],
  Throwable_AoE: [
    {
      pointCost: 0,
      text: "On Hit: Covered teammates receive temporary 35% damage resistance",
    },
    {
      pointCost: 0,
      text: "On Hit: Remove ally's debuffs",
    },
    {
      pointCost: 0,
      text: "On Hit: Remove all the enemy's buffs",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered engineer buildings get disabled for 4 seconds",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered enemies can be seen through walls by your teammates for 5 seconds",
    },
    {
      pointCost: 0,
      text: "Extinguish teammates to earn a guaranteed minicrit on your next attack",
    },
  ],
  Throwable_Weapon: [
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and make them bleed for 5 seconds",
    },
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and mark them for death for 5 seconds",
    },
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and ignite them for 5 seconds",
    },
  ],

  Medi_Gun: [
    {
      pointCost: -1,
      text: "ÜberCharge grants +100% speed of movement and attack",
    },
    {
      pointCost: -1,
      text: "ÜberCharge grants +300% faster control point capture rate",
    },
    { pointCost: -1, text: "ÜberCharge grants invisibility" },
    { pointCost: -1, text: "ÜberCharge grants the ability to fly" },
  ],

  Sapper: [
    {
      pointCost: 0,
      text: "Place on enemy buildings to disable and slowly drain away its health",
    },
    {
      pointCost: 0,
      text: "Place on enemy buildings to disable for 10 seconds. Deals no damage",
    },
    {
      pointCost: 0,
      text: "Place on enemy buildings to drain their health faster than regular sapper. Does not disable the building",
    },
  ],

  Scout_Lunch_Box: [
    {
      pointCost: 0,
      text: "While effect is active: All attacks incite 5 seconds of bleed",
    },
    {
      pointCost: 0,
      text: "While effect is active: User can air-jump twice as many times",
    },
    {
      pointCost: 0,
      text: "While effect is active: Grants 35% resistance to all damage",
    },
  ],
  Heavy_Lunch_Box: [
    {
      pointCost: -1,
      text: "Eat to receive 35% damage resistance for 10 seconds. Alt-Fire: Share with a friend (Small Health Kit)",
    },
    {
      pointCost: -1,
      text: "Eat to receive 25% movespeed for 15 seconds. Alt-Fire: Share with a friend (Small Health Kit)",
    },
  ],
  Demoknight_Shield: [
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. Gain a critical melee strike after impacting an enemy at distance",
    },
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. Restore health after impacting an enemy",
    },
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. On impact enemies receive great knockback",
    },
  ],
  Banner: [
    {
      pointCost: -1,
      text: "While active: Provides group buff that slowly heals nearby teammates",
    },
    {
      pointCost: -1,
      text: "While active: Provides group buff that increases the attack rate of nearby teammates",
    },
  ],

  Explosive_Melee: [
    { pointCost: 1, text: "Every third hit will cause an explosion" },
    {
      pointCost: 1,
      text: "The first hit will apply great knockback on the enemy",
    },
  ],
  Wrench: [
    {
      pointCost: 0,
      text: "Upgrades, repairs and speeds up construction of friendly buildings on hit.",
    },
    {
      pointCost: 1,
      text: "Hitting an enemy building twice reverts it to a lower level version of itself",
    },
    {
      pointCost: 1,
      text: "Removes sappers in a single hit",
    },
    {
      pointCost: 1,
      text: "As a team player, you spend -50% less metal when upgrading the buildings of your teammates",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Takes away metal from the ammo pool of your own sentry",
    },
  ],
  Pybro_Melee: [
    { pointCost: 1, text: "Damage removes Sappers" },
    {
      pointCost: 1,
      text: "Hitting friendly buildings helps them deploy faster",
    },
  ],
  Melee_with_Projectile: [
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that makes enemies bleed",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that applies knockback on enemies",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that heals teammates",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that makes teammates faster",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that explodes on impact",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that disables sentries for 3 seconds",
    },
  ],
};

const weaponEffects = [
  //// AllScout ////
  {
    for: weaponTypeGroups.AllScout, // disallow passive? But Scout has no passives...
    classLimit: ["Scout"],
    pro: "Grants Triple Jump on wearer",
    con: "No double jump",
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
    con: "-<value>% sentry damage vulnerability on wearer",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: ["Scout_Lunch_Box"],
    pro: "+<value>% movespeed per second until you stop moving, for 10s",
    con: "-<value>% movespeed per jump while weapon effect is active",
    valuePro: 5,
    valueCon: 10,
  },
  //// AllPyro ////
  {
    for: weaponTypeGroups.AllPyro,
    classLimit: ["Pyro"],
    pro: "+<value>% longer afterburn on enemies from all weapons",
    con: "-<value>% longer afterburn on enemies from all weapons",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllPyro,
    classLimit: ["Pyro"],
    pro: "+<value>% damage vs nonburning players",
    con: "-<value>% damage vs nonburning players",
    valuePro: 50,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllPyro,
    classLimit: ["Pyro"],
    pro: "Minicrits vs burning players",
    con: "-25% damage penalty vs burning players",
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
    pro: "Fire does no damage to you",
    con: "You are no longer immune to afterburn",
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
    valuePro: 30,
    valueCon: 30,
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "Twice the airblast force",
    con: "No compression blast",
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "Reflected projectiles can crit buildings",
    con: "Deals no damage against buildings",
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "+<value>% more flame distance",
    con: "-<value>% less flame distance",
    valuePro: 50,
    valueCon: 30,
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "+2 ammo gained per point of damage/afterburn",
    con: "+50% ammo consumption rate",
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "Airblast can now be charged, which will push enemies further",
    con: "Airblast can no longer push enemies or projectiles",
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "Airblast can now be charged, causing a small exposion when fully charged", // these two are neutralish!!!
    con: "Airblast destroys projectiles at the cost of twice the ammo consumed",
  },
  { // mine
    for: weaponTypeGroups.Flamethrower,
    pro: "-<value>% airblast cost",
    con: "+<value>% airblast cost",
    valuePro: 50,
    valueCon: 30,
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
    pro: "Grenades can bounce one and deal halved damage after",
    con: "Launched bombs shatter on surfaces",
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
    pro: "+<value>% sticky distance charge speed",
    con: "-<value>% sticky distance charge speed",
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
    con: "Stickybomb dets that deal no damage deal 5 psychic damage to the user",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybombs can't be moved or destroyed",
    con: "Stickybombs are destroyed when affected by knockback",
  },
  {
    for: ["Stickybomb_Launcher"],
    pro: "Stickybombs explode on hit",
    con: "Stickybombs take 100% more knockback when pushed",
  },
  //// AllDemoknight ////
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charging deals +<value>% more damage",
    con: "Charging deals -<value>% less damage",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge duration increased by <value>%",
    con: "Charge duration decreased by <value>%",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge speed increased by <value>%",
    con: "Charge speed decreased by <value>%",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllDemoknight,
    classLimit: ["Demoman"],
    pro: "Charge meter increases <value>% faster",
    con: "Charge meter increases <value>% slower",
    valuePro: 25,
    valueCon: 25,
  },
  //// AllHeavy ////
  {
    for: weaponTypeGroups.AllHeavy.filter((i) =>
      weaponTypeGroups.AllCanHit.includes(i)),
    classLimit: ["Heavy"],
    pro: "On Kill: Move at your victim's movespeed for 5 seconds",
    con: "No healing can be received within 5 seconds of taking damage",
  },
  {
    for: ["Minigun"],
    classLimit: ["Heavy"],
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
    pro: "+<value>% increased walking speed while revved up",
    con: "-<value>% decreased walking speed while revved up",
    valuePro: 30,
    valueCon: 20,
  },
  {
    for: ["Minigun"],
    pro: "+2% movespeed per consecutive hit, to a max of +<value>%",
    con: "-1% movespeed per consecutive hit, to a min of -<value>",
    valuePro: 30,
    valueCon: 20,
  },
  //// AllEngineer ////
  {
    for: ["Shotgun"],
    classLimit: ["Engineer"],
    pro: "Alt-Fire to convert all your primary ammo into 200 metal",
    con: "Scrap Shooter: 33% chance of losing 15 metal per shot",
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
    pro: "+<value> metal regenerated every 10s on wearer",
    con: "Loose Pockets: <value> metal lost every 30s on wearer",
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
    pro: "+<value>% max metal on wearer",
    con: "+<value>% max metal on wearer",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllBullet,
    classLimit: ["Engineer"],
    pro: "Gain two minicrits for each sentry kill and one for each assist",
    con: "Each building going down halves your health",
  },
  {
    for: weaponTypeGroups.AllEngineer,
    classLimit: ["Engineer"],
    pro: "+<value>% movespeed for each building active",
    con: "-<value>% metal capacity for each building active",
    valuePro: 25,
    valueCon: 50,
  },
  {
    for: ["Wrench"],
    pro: "Construction hit speed boost increased exponentially per hit",
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
    valuePro: 40,
    valueCon: 40,
  },
  {
    for: ["Wrench"],
    pro: "Teleporters can be used in both directions",
    con: "Teleporters give 5s +40% speed boosts, +10% per additional level",
  },
  {
    for: ["Wrench"],
    pro: "+20% movespeed while carrying buildings",
    con: "Cannot pick up buildings",
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
    con: "+<value> metal gained on hit",
    valuePro: 10,
    valueCon: 15,
  },
  //// AllMedic ////
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"], // redundant? well not exactly. stupid stat regardless
    pro: "You receive +<value>% healing from all sources, including your passive",
    con: "You receive -<value>% healing from all sources, including your passive",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "+[value]% natural regen rate",
    con: "-<value> health drained per second on wearer",
    valuePro: 50,
    valueCon: 5,
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "Crit immunity on user",
    con: "Minicrits received crit",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "Ammo boxes collected are also received as a smaller health pack",
    con: "-25% healing from packs",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "On Kill: Taunt in order to gain 25% ÜberCharge",
    con: "On Death: Drop a medium health pack",
  },
  {
    for: weaponTypeGroups.AllMedic,
    classLimit: ["Medic"],
    pro: "All nearby teammates heal by <value> HP per kill near you",
    con: "+<value>% damage vulnerability when a nearby ally dies",
    valuePro: 30,
    valueCon: 20,
  },
  {
    for: ["Syringe_Gun"],
    pro: "On Kill: Heal all nearby allies by 25 health",
    con: "Marked for death when an ally dies while you have this deployed",
  },
  {
    for: ["Medi_Gun"],
    pro: "ÜberCharge grants 100% mini-critical chance",
    con: "+10% damage vulnerability while ÜberCharged",
  },
  {
    for: ["Medi_Gun"],
    pro: "+<value>% ÜberCharge rate",
    con: "-<value>% ÜberCharge rate",
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
  { // mine
    for: ["Medi_Gun"],
    pro: Math.random() < 0.5 ? "+<value>% max overheal" : "+<value>% longer overheal time",
    con: "<value>% shorter overheal time",
    valuePro: 50,
    valueCon: 50,
  },
  { // mine
    for: ["Medi_Gun"],
    pro: "Overheal bonus doesn't decay for <value> second(s)",
    con: "Overheals decay <value>% faster",
    valuePro: 10,
    valueCon: 50,
  },
  {
    for: ["Medi_Gun"],
    pro: "Heals teammates near to the Medi Gun target for <value>% of the target healing",
    con: "Drains HP from teammates (with health more than 50) near to the Medi Gun target for <value>% of the health delivered to the Medi Gun target.",
    valuePro: 10,
    valueCon: 10,
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
    pro: "On significant damage dealt by target: x1.<value>% ÜberCharge",
    con: "On significant damage taken: lose <value>% ÜberCharge",
    valuePro: 5,
    valueCon: 5,
  },
  {
    for: ["Medi_Gun"],
    pro: "When healing an ally below 50% health, user is also healed at half the rate",
    con: "Overheats when used for longer than 10 seconds, igniting the user",
  },
  {
    for: ["Medi_Gun"],
    pro: "ÜberCharge automatically activated when lethal damage is taken",
    con: "Hold down Alt-Fire for 5s before ÜberCharge can be activated",
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
    pro: "Damage taken while ÜberCharged is (somehow) converted to extra ÜberCharge after the Über is over",
    con: "Taking damage while ÜberCharged reduces its duration",
  },
  {
    for: ["Medic_Melee"],
    pro: "On Hit: <value> ÜberCharge added",
    con: "On Hit: <value> ÜberCharge lost",
    valuePro: 20,
    valueCon: 10,
  },
  //// AllSniper ////
  {
    for: weaponTypeGroups.AllSniper,
    classLimit: ["Sniper"],
    pro: "When hit by a melee from the back or sides, jarate is splashed around you",
    con: "When hit by a melee, you are doused in jarate for 2s",
  },
  {
    for: ["Sniper_Rifle"],
    pro: "+100% knockback on hit",
    con: "No headshots",
  },
  {
    for: weaponTypes.Sniper_Rifle,
    pro: "+<value>% charge rate",
    con: "-<value>% charge rate",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypes.Sniper_Rifle,
    pro: "No movespeed penalty while scoped",
    con: "Cannot move while scoped",
  },
  //// AllSpy ////
  {
    for: weaponTypeGroups.AllSpy,
    classLimit: ["Spy"],
    pro: "Attacking while disguised deals up to an additional <value>% damage depending on how long you've been near an enemy.",
    con: "Cannot disguise for <value> seconds after attacking/sapping",
    valuePro: 20,
    valueCon: 15,
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
    pro: "+<value>% cloak gained when you backstab",
    con: "-<value>% cloak lost when you backstab",
    valuePro: 100,
    valueCon: 40,
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
    pro: "+<value>% running speed after for 3 seconds after receiving damage",
    con: "-<value>% running speed after for 3 seconds after receiving damage",
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
    pro: "Unable to see enemy health",
    con: "In addition to HP, can see enemy's loadout, ammo, all charges, and weather they're a Spy or not",
  },
  {
    for: weaponTypes.Revolver,
    classLimit: ["Spy"],
    pro: "+<value>% cloak on hit",
    con: "-<value>% cloak on hit",
    valuePro: 30,
    valueCon: 10,
  },
  {
    for: weaponTypes.Revolver,
    classLimit: ["Spy"],
    pro: "Minicrits when <50% health",
    con: "-20% damage penalty when <50% health",
  },
  {
    for: weaponTypes.Revolver,
    classLimit: ["Spy"],
    pro: "Kills don't show up in the killfeed",
    con: "Victim cries out loudly on death",
  },
  {
    for: weaponTypes.Revolver,
    classLimit: ["Spy"],
    pro: "+30% damage bonus against buildings",
    con: "Deals no damage to buildings being sapped",
  },
  {
    for: ["Invis_Watch"],
    classLimit: ["Spy"], // redundant
    pro: "Cloaking automatically selects a random disguise",
    con: "Cannot disguise while invisible",
  },
  {
    for: ["Invis_Watch"],
    classLimit: ["Spy"], // redundant
    pro: "Quiet decloak",
    con: "Loud decloak",
  },
  {
    for: ["Invis_Watch"],
    classLimit: ["Spy"], // redundant
    pro: "Cloak in half the time",
    con: "Cloaking takes twice as long",
  },
  {
    for: weaponTypes.Invis_Watch,
    pro: "+<value>% cloak regen rate",
    con: "+<value>% cloak drain rate",
    valuePro: 40,
    valueCon: 40,
  },
  {
    for: ["Sapper"],
    pro: "Sapped buildings remain disabled for <value> second(s) after the sapper is removed",
    con: "Sapped buildings are not disabled for <value> second(s) after the sapper is placed",
    valuePro: 3,
    valueCon: 3,
  },
  {
    for: ["Sapper"],
    pro: "Alt-Fire: Can throw sapper from a distance, with a 10s cooldown",
    con: "After applying sapper, cannot apply again for 3 seconds",
  },
  {
    for: ["Sapper"],
    pro: "Can apply sapper while invisible",
    con: "Applying sapper removes disguise",
  },
  {
    for: ["Sapper"],
    pro: "+1 health regenerated per second for each active sapper",
    con: "Max two sappers active concurrently",
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
    for: ["Knife"],
    classLimit: ["Spy"], // redundant
    pro: "Backstabs also affect those connected by beams, while enemies connected by buffs split the damage equally between them",
    con: "Backstabs reduce enemies to 1 health and grant the Spy instant primary deploy",
  },
  //// AllReloading ////
  {
    for: weaponTypeGroups.AllReloading,
    pro: "<value>% faster reload speed",
    con: "<value>% slower reload speed",
    valuePro: 50,
    valueCon: 50,
  },
  //// AllBullet ////
  {
    for: weaponTypeGroups.AllBullet,
    pro: "On Headshot: +<value>% damage",
    con: "On Hit: -<value>% damage if the hit wasn't a headshot",
    valuePro: 30,
    valueCon: 10,
  },
  //// AllAutomatic ////
  {
    for: weaponTypeGroups.AllCanHit.filter((i) =>
      weaponTypeGroups.AllAutomatic.includes(i) && i != weaponTypes.Flamethrower.name),
    pro: "Weapon firing speed increases as it gets fired for longer",
    con: "Weapon firing speed decreases as it gets fired for longer",
  },
  { // MINE
    for: weaponTypeGroups.AllAutomatic,
    pro: "Movement speed increases the longer it's been fired",
    con: "-1 hp/s while firing due to heat; heal damage during a reload",
  },

  //// AllExplosive ////
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% larger explosion radius",
    con: "<value>% smaller explosion radius",
    valuePro: 75,
    valueCon: 75,
  },
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% stronger explosion knockback",
    con: "<value>% weaker explosion knockback",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllExplosive,
    pro: "+<value>% self damage force",
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
  //// AllCanHit ////
  {
    for: weaponTypeGroups.AllCanHit.filter((i) =>
      weaponTypeGroups.AllAutomatic.includes(i) && i != weaponTypes.Flamethrower.name // applies to stuff that's in both groups; I'm excluding Flamethrower
    ),
    pro: "On Hit: +<value> HP",
    con: "On Miss: -<value> HP",
    valuePro: 5,
    valueCon: 1,
  },
  {
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit Teammate: Grant <value>% faster firing rate to both for 5 seconds",
    con: "On Miss: <value>% slower firing rate for the next 3 seconds",
    valuePro: 30,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit Teammate: Grant +<value>% movespeed to both for 5 seconds",
    con: "On Miss: <value>% movespeed for the next 3 seconds",
    valuePro: 25,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.All, // apply only to backpacks and boots?
    pro: "+<value> Max HP on wearer",
    con: "-<value> Max HP on wearer",
    valuePro: 25,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.ExplosiveProjectile,
    pro: "Increased air-strafing control",
    con: "Decreased air-strafing control",
  },
  {
    for: weaponTypeGroups.All,
    pro: "<value>% faster movespeed on wearer",
    con: "<value>% slower movespeed on wearer",
    valuePro: 15,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Heal up to <value> HP per second while out of combat",
    con: "+<value>% damage vulnerability when out of combat for thirty seconds or more",
    valuePro: 4,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Battle Fever: Heal up to <value> HP per second while in combat",
    con: "All healing received is decreased up to -<value>% while recently in combat",
    valuePro: 4,
    valueCon: 30,
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.Passive.includes(i)
    ),
    pro: "This weapon deploys <value>% faster",
    con: "This weapon deploys <value>% slower",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.Passive.includes(i)
    ),
    pro: "+25% healing received while active",
    con: "Blocks healing while in use",
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.Passive.includes(i)
    ),
    pro: "This weapon holsters <value>% faster",
    con: "This weapon holsters <value>% slower",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: [...weaponTypeGroups.All].filter(
      (i) => !weaponTypeGroups.Passive.includes(i)
    ),
    pro: "This weapon deploys and holsters <value>% faster",
    con: "This weapon deploys and holsters <value>% slower",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: [...weaponTypeGroups.All].filter( // do this again but for nonpassives to add when active
      (i) =>
        i !== "Revolver" &&
        i !== "Sapper" &&
        i !== "Knife" &&
        i !== "Invis_Watch" // essentially, Spy Weapons
    ),
    pro: "Can see the HP of enemies",
    con: "Enemies can see your HP",
  },
  { // Risky syntax
    for: ["Revolver",
      ...weaponTypeGroups.ExplosiveProjectile,
      ...weaponTypeGroups.BurstBullet
    ],
    pro: "Can hold to charge next shot to deal up to +<value>% damage",
    con: "Attempting to fire when in the midst of reloading can cause a misfire, dealing user <value> damage",
    valuePro: 20,
    valueCon: 20,
  },
  //// AllDoesDamage ////
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage bonus",
    con: "-<value>% damage penalty",
    valuePro: 20,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Hit: Causes enemy to bleed for <value> second(s)",
    con: "On Miss: Causes you to bleed for <value> second(s)",
    valuePro: 5,
    valueCon: 3,
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: Instant switch and deploy speed for <value> second(s)",
    con: "On Miss: Makes you unable to switch weapons for <value> second(s)",
    valuePro: 5,
    valueCon: 2,
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "Crits whenever it would normally mini-crit",
    con: "Mini-crits whenever it would normally crit",
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "Damage increases as the user becomes injured",
    con: "Damage decreases to 50% as the user becomes injured",
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage vs buildings",
    con: "-<value>% damage vs buildings",
    valuePro: 20,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Kill: +<value> max health for 30 seconds (max of 2x original max)",
    con: "On Kill: any buffs disappear", // idk about this one
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: +<value>% more damage when attacking from behind the enemy",
    con: "On Hit: -<value>% less damage when not attacking from behind the enemy",
    valuePro: 20,
    valueCon: 20,
  },
  //// AllHasClip ////
  {
    for: weaponTypeGroups.AllHasClip,
    pro: "+<value>% clip size",
    con: "-<value>% clip size",
    valuePro: 25,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.AllHasClip,
    pro: "On Kill: Clip fully reloads",
    con: "Double the reload time when failed to kill with an emptied clip",
  },
  //// BurstBullet ////
  {
    for: weaponTypeGroups.BurstBullet,
    pro: "On Hit: Heal <value> HP per connecting bullet",
    con: "The bullet shell explodes in your hands each time you fire, causing you to lose <value> HP",
    valuePro: 2,
    valueCon: 2,
  },
  {
    for: weaponTypeGroups.BurstBullet,
    pro: "+<value>% more bullets per shot",
    con: "-<value>% less bullets per shot",
    valuePro: 20,
    valueCon: 20,
  },
  //// SingleBullet ////
  {
    for: weaponTypeGroups.AllCanHeadshot,
    pro: "On Headshot: Next reload will be <value>% faster",
    con: "On Miss: Next reload will be <value>% slower",
    valuePro: 50,
    valueCon: 25,
  },
  {
    for: weaponTypeGroups.AllCanHeadshot,
    pro: "On Headshot: Deal +<value>% damage",
    con: "On Hit: Deal -<value>% damage if hit was not a headshot",
    valuePro: 35,
    valueCon: 20,
  },
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
  //// AllProjectile ////
  {
    for: weaponTypeGroups.AllProjectile,
    pro: "<value>% faster projectile speed",
    con: "<value>% slower projectile speed",
    valuePro: 75,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllProjectile,
    pro: "Effects scale up to +<value>% based on distance travelled",
    con: "Effects decrease down to -<value>% based on distance travelled",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.AllProjectile,
    pro: "Projectiles cannot be deflected",
    con: "Deflected projectiles crit",
  },
  //// SingleShotProjectile ////
  {
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "On Hit: Loading next shot will be +<value>% faster",
    con: "On Miss: Loading next shot will be -<value>% slower",
    valuePro: 100,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "Explodes on hit",
    con: "On Hit: User is marked for death for the enemy for 3s",
  },
  {
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "This weapon reloads while inactive",
    con: "Reload uses a special, longer animation",
  },
  //// AllReflectable ////
  {
    for: [weaponTypeGroups.AllReflectable].filter(
      (i) =>
        i !== "Throwable_AOE"),
    pro: "Projectile cannot be reflected",
    con: "Projectile deals crit damage when reflected and move at twice the speed",
  },
  {
    for: ["Throwable_AoE"], // filter for AoE
    pro: "Projectile cannot be reflected",
    con: "If reflected, covered players are debuffed for twice the duration, which can't be removed early",
  },
  //// AutomaticProjectiles ////
  {
    for: weaponTypeGroups.AutomaticProjectiles,
    pro: "Consecutive hits deal +1 more damage than the previous hit",
    con: "Consecutive hits deal -1 less damage than the previous hit, down to 1", // what a horrible con lmao, fix
  },
  //// ConsumableProjectile ////
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% faster recharge time",
    con: "-<value>% slower recharge time",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% increased movement speed after firing, for 5 seconds",
    con: "-<value>% decreased movement speed after firing, for 3 seconds",
    valuePro: 15,
    valueCon: 15,
  },
  {
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "Explode on hit",
    con: "Any debuffs the enemy has or receives and applied to the user for half the duration",
  },
  //// Rocket_Launcher, Grenade_Launcher ////
  {
    for: ["Rocket_Launcher", "Stickybomb_Launcher"],
    pro: "Deal damage to nearby enemies when you land from a blast jump, based on the fall distance",
    con: "Fall damage from blast jumps is doubled",
  },
  //// ConsumablePassive ////
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
  //// ChargeablePassive ////
  {
    for: weaponTypeGroups.ChargeablePassive,
    pro: "<value>% faster meter charge rate",
    con: "<value>% slower meter charge rate",
    valuePro: 50,
    valueCon: 50,
  },
  // // Passive ////
  {
    for: weaponTypeGroups.Passive,
    pro: "+<value>% healing from all sources",
    con: "-<value>% healing from all sources",
    valuePro: 100,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "Overheal can give you up to +<value>% more max HP",
    con: "Overheal gives you -<value>% less max HP",
    valuePro: 50,
    valueCon: 20,
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
    pro: "+<value>% jump height",
    con: "-<value>% movespeed on wearer",
    valuePro: 50,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.Passive,
    pro: "Wearer cannot ignite",
    con: "+25% vulnerability to fire",
    valuePro: 50,
    valueCon: 10,
  },
  //// Melee ////
  {
    for: weaponTypeGroups.Melee,
    pro: "Taunting removes any debuffs for self and nearby allies. Taunt takes 2 second",
    con: "Player is marked for death while active",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "Imbued with an ancient power -- victims turn to gold and drop large ammo pack on death",
    con: "Being killed with this active fully heals the killer",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "On Kill: +10% movespeed for 5s",
    con: "On Kill: Laugh at your victim",
  },
  {
    for: weaponTypeGroups.Melee,
    pro: "The third consecutive hit in a row always crits",
    con: "Every third hit deals 1 damage",
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
    for: weaponTypes.Revolver,
    classLimit: ["Engineer"],
    pro: "Minicrits on headshot",
    con: "Uses metal for ammo",
  },


  // Everything below is added

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
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Hit: Gain up to +<value> health",
    con: "+<value>% damage vulnerability shortly after a reload", // ? idk
    valuePro: 25,
    valueCon: 10,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "Up to +<value>% damage bonus the lower your healer's health is",
    con: "Down to -<value>% damage bonus the lower your healer's health is", // ? idk
    valuePro: 30,
    valueCon: 30,
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Hit: One target at a time is Marked-For-Death, causing all damage taken to be mini-crits",
    con: "On Hit: User is Marked-For-Death for the last person they damaged for 5s",
  },
  {
    for: ["Throwable_AoE", "Throwable Weapon", "Melee_with_Projectile"],
    pro: "Double the misc ammo/charges",
    con: "+50% recharge time",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "Minicrits from behind",
    con: "-20% damage penalty from the front",
  },
  {
    for: ["Sniper_Rifle", "Revolver", "Bow", "Flare_Gun"],
    pro: "Fires quietly",
    con: "Fires tracer rounds",
  },
  {
    for: weaponTypeGroups.AllCanHeadshot,
    pro: "Lethal headshots cause victim to explode, damaging their nearby allies",
    con: "Lethal headshots mark user for death for 3s",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) =>
        i !== "Grenade_Launcher" &&
        i !== "Stickybomb_Launcher"
    ),
    pro: "Alt-Fire halves user's health for a guaranteed minicrit",
    con: "Alt-Fire reduces user's health to 1 for a guaranteed minicrit",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) =>
        i !== "Throwable_Weapon"
    ),
    pro: "Firing speed increases as health decreases",
    con: "+50% reload speed below 50% max health",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "+<value>% damage bonus against airborne targets",
    con: "+<value>% damage vulnerability from airborne targets",
    valuePro: 30,
    valueCon: 30,
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
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "Increased knockback on target",
    con: "Knockback on target and user",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit.filter(
      (i) => !weaponTypeGroups.Melee.includes(i),
    ),
    pro: "+1 ammo instantly reloaded on hit",
    con: "Every other miss subtracts an extra shot from the clip",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "Mini-crits targets launched airborne by explosions, grapple hooks or rocket packs",
    con: "+15% damage vulnerability while launched airborne by explosions, grapple hooks or rocket packs",
  },
  {
    for: weaponTypeGroups.AllSubstantialHit,
    pro: "On Kill: Reset health to what it was before the last 2 instances of damage, if higher than present health",
    con: "On Kill: Any overheal is removed",
  },
  {
    for: weaponTypeGroups.AllWithAmmo,
    pro: "Does not require ammo",
    con: "Chops ammo twice as fast",
  },
  {
    for: weaponTypeGroups.AllCanHit,
    pro: "Crits against user deal regular damage",
    con: "Cannot deal crits with this weapon",
  },
  {
    for: weaponTypeGroups.AllCanHit,
    pro: "+<value>% movespeed while deployed",
    con: "-<value>% movespeed while deployed",
    valuePro: 20,
    valueCon: 20,
  },
  {
    for: weaponTypeGroups.All, // lmao unsure, maybe +2
    pro: "+1 capture rate on wearer",
    con: "User cannot attack while capturing",
  },
  {
    for: weaponTypeGroups.All,
    pro: "+1 capture rate on wearer",
    con: "User cannot capture objectives",
  },
  {
    for: weaponTypeGroups.All,
    pro: "Immunity to movement-impairing effects",
    con: "Knockback received is doubled",
  },
  {
    for: weaponTypeGroups.All,
    pro: "+<value>% health from healers on wearer",
    con: "-<value>% health from healers on wearer",
    valuePro: 50,
    valueCon: 50,
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
    pro: "All debuffs user applies last <value>% longer",
    con: "Duration of debuffs user applies are <value>% shorter",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.All,
    pro: "+<value>% health from packs on wearer",
    con: "-<value>% health from packs on wearer",
    valuePro: 50,
    valueCon: 50,
  },
  {
    for: weaponTypeGroups.All,
    pro: "Damage received is split equally between user and healer; one can not die before the other",
    con: "30% of the damage the user receives is received by the healer",
  },
  {
    for: weaponTypeGroups.Slot1.filter((i) =>
      weaponTypeGroups.AllCanHit.includes(i)),
    pro: "+<value>% max ammo",
    con: "-<value>% secondary ammo capacity",
    valuePro: 40,
    valueCon: 40,
  },
  {
    for: weaponTypeGroups.Slot2.filter((i) =>
      weaponTypeGroups.AllCanHit.includes(i)),
    pro: "+<value>% max ammo",
    con: "-<value>% primary ammo capacity",
    valuePro: 40,
    valueCon: 40,
  },
];

function generateWeapon(playerClass, weaponSlot, powerLevel) {
  const weaponType = selectWeaponType(playerClass, weaponSlot, powerLevel);
  const modificationCounts = getRandom(1, 2); // Between 1 and 2 mods

  const proBoost = Math.max(0, weaponType.needsBoost);
  const conBoost = Math.max(0, -weaponType.needsBoost); // won't this always choose 0?

  const weapon = {
    playerClass: playerClass,
    playerClassName: strings.classes[playerClass],
    weaponSlot: weaponSlot,
    weaponSlotName: strings.slots[weaponSlot],
    type: weaponType.name,
    proPoints: modificationCounts + proBoost, // if it needs a boost, it adds that many points
    conPoints: modificationCounts + conBoost, // yeah I think this is always 0...?
    mandatoryPros: [],
    pros: [],
    cons: [],
  };

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

function addWeaponProsAndCons(weapon) {
  const possibleOptions = cloneJson(
    weaponEffects
      // .filter((i) => i.for.includes(weapon.type)) // if it's of the right type
      .filter((i) => Array.isArray(i.for) && i.for.includes(weapon.type))
      .filter((i) => !i.classLimit || i.classLimit === weapon.playerClassName) // (and?) applicable class
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

  const selectedPros = getSelectedOptionsByIndices(
    possibleOptions,
    selectedProIndices
  );
  const selectedCons = getSelectedOptionsByIndices(
    possibleOptions,
    selectedConIndices
  );

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

function getSelectedOptionsByIndices(possibleOptions, selectedIndices) {
  console.log(selectedIndices);
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
  return [
    `<div id="weapon" style="position: relative; padding: 10px;">`,
    `<div id="classIcon" style="position: absolute; top: 10px; left: 10px;">`,
    `<img src="class-icons/${weapon.playerClassName}.png" alt="${weapon.playerClassName} icon" style="width: 30px; height: 30px;" />`,
    `</div>`,
    `  <div id="weaponImage"> <img src="weapon-images/${weapon.type}.png" /> </div>`,
    `  <div id="weaponName" class="my-2 text-uppercase">${weapon.playerClassName} ${weapon.weaponSlotName}</div>`,
    `  <div id="weaponStats" class="my-3">`,
    `    <div id="weaponLevel" style="margin-bottom: 0.4rem !important;" >`,
    `      Level ${addRandomnessToNumber(getRandom(10, 50))}`,
    `      ${weapon.type.replace(/_/g, " ")}`,
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