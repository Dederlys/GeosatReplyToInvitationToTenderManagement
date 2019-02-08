export class Person {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public department?: string,
        public arrivalDate?: string,
        public nationality?: string,
        public contractType?: string,
        public position?: string,
        public affiliateOffice?: string,
        public idNumber?: string,
        public authorizations?: string[],
        public supervisor?: string,
        public endContractDate?: string,
        public supervisorIdentifier?: string,
        public identityPapersType?: string
    ) { }
}
