export class Equipment {
    constructor(
        public name?: string,
        public department?: string,
        public location?: string,
        public neededAuthorizations?: string[],
        public arrivalDate?: string
    ) { }
}
