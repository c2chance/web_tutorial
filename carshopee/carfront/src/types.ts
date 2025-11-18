export type CarResponse = {
    brand: string;
    model: string;
    color: string;
    registractionNumber: "ADF-1121";
    modelYear: number;
    price: number;
    _links: {
        self: { href: string },
        car: { href: string },
        owner: { href: string }
    };
}