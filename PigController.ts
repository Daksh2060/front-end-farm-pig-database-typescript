import { PigInterface } from "./Pigs";

export class PigController {
    private pigs: PigInterface[] = [];

    addPig(pig: PigInterface) {
        this.pigs.push(pig);
    }

    removePig(pigId: Number) {
        const index = this.pigs.findIndex((pig) => pig.id === pigId);
        if (index !== -1) {
            this.pigs.splice(index, 1);
        }
    }

    getPigs() {
        return this.pigs;
    }
    
}

