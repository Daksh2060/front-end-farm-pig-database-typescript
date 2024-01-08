export interface PigInterface {
    id: number;
    name: string;
    breed: string;
    height: number;
    weight: number;
    personality: string;
    category: string;
}

export class Pig {
    public constructor(
        public id: number,
        public name: string,
        public breed: string,
        public height: number,
        public weight: number,
        public personality: string,
        public category: string
    ) {}
}

export class GreyPig extends Pig {
    public swimmingAbility: number;

    constructor(public id: number, public name: string, public breed: string, public height: number, public weight: number, public personality: string, public category: string) {
        super(id, name, breed, height, weight, personality, "Grey");
        this.swimmingAbility = 0;
    }
}

export class ChestnutPig extends Pig {
    public language: string;

    constructor(public id: number, public name: string, public breed: string, public height: number, public weight: number, public personality: string, public category: string)  {
        super(id, name, breed, height, weight, personality, "Chestnut");
        this.language = "";
    }
}

export class WhitePig extends Pig {
    public runningAbility: number;

    constructor(public id: number, public name: string, public breed: string, public height: number, public weight: number, public personality: string, public category: string) {
        super(id, name, breed, height, weight, personality,"White");
        this.runningAbility = 0;
    }
}

export class BlackPig extends Pig {
    public strengthAbility: number;

    constructor(public id: number, public name: string, public breed: string, public height: number, public weight: number, public personality: string, public category: string)  {
        super(id, name, breed, height, weight, personality,"Black");
        this.strengthAbility = 1;
    }
}