System.register([], function (exports_1, context_1) {
    "use strict";
    var PigController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            //Format copied from Professors Youtube tutorial
            PigController = class PigController {
                constructor() {
                    this.pigs = [];
                }
                addPig(pig) {
                    this.pigs.push(pig);
                }
                removePig(pigId) {
                    const index = this.pigs.findIndex((pig) => pig.id === pigId);
                    if (index !== -1) {
                        this.pigs.splice(index, 1);
                    }
                }
                getPigs() {
                    return this.pigs;
                }
            };
            exports_1("PigController", PigController);
        }
    };
});
