const defaultData = {
    name: "Smeargle",
    hp: "HP",
    hpNb: 70,
    type: "normal",
    info: "NO. 235 Painter Pokémon HT: 3´11´´ WT: 127.9 lbs.",
    nomberAtk: 2,
    attacks: {
        1: {
            name: "Colorful Palette",
            damage: "",
            desc: "Look at the top 5 cards of your deck...",
            cost: ["normal"]
        },
        2: {
            name: "Ram",
            damage: "30",
            desc: "A simple physical charge to the opponent.",
            cost: ["normal","normal"]
        }
    },
    weakness: "weakness",
    weaknessType: "fighting",
    weaknessValue: 2,
    resistance: "resistance",
    resistanceType: "normal",
    resistanceValue: 30,
    retreat: "retreat",
    retreatCost: 2,
    illustrator: "Illus.Mizue",
    regulation: "f",
    numbering: "137/195",
    rarity: "common",
    description: "it draws symbols with the fluid that oozes from the tip of its tail. Depending on the symbol, Smeargle fanatics will pay big money for them",
    mainImage: "assets/smeargle.png",
    extensionImage: "assets/Silver_Tempest_Sword_and_Shield_Symbol_TCG.png"
};

export default defaultData;
