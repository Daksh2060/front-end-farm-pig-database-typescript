System.register([], function (exports_1, context_1) {
    "use strict";
    var Pig, GreyPig, ChestnutPig, WhitePig, BlackPig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Pig = class Pig {
                constructor(id, name, breed, height, weight, personality, category) {
                    this.id = id;
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                }
            };
            exports_1("Pig", Pig);
            //Subclasses created based on Lecture topic 5 notes
            GreyPig = class GreyPig extends Pig {
                constructor(id, name, breed, height, weight, personality, category) {
                    super(id, name, breed, height, weight, personality, "Grey");
                    this.id = id;
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                    this.swimmingAbility = 0;
                }
            };
            exports_1("GreyPig", GreyPig);
            ChestnutPig = class ChestnutPig extends Pig {
                constructor(id, name, breed, height, weight, personality, category) {
                    super(id, name, breed, height, weight, personality, "Chestnut");
                    this.id = id;
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                    this.language = "";
                }
            };
            exports_1("ChestnutPig", ChestnutPig);
            WhitePig = class WhitePig extends Pig {
                constructor(id, name, breed, height, weight, personality, category) {
                    super(id, name, breed, height, weight, personality, "White");
                    this.id = id;
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                    this.runningAbility = 0;
                }
            };
            exports_1("WhitePig", WhitePig);
            BlackPig = class BlackPig extends Pig {
                constructor(id, name, breed, height, weight, personality, category) {
                    super(id, name, breed, height, weight, personality, "Black");
                    this.id = id;
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                    this.strengthAbility = 1;
                }
            };
            exports_1("BlackPig", BlackPig);
        }
    };
});
