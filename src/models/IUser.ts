export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: RootObjectHair;
	ip: string;
	address: RootObjectAddress;
	macAddress: string;
	university: string;
	bank: RootObjectBank;
	company: RootObjectCompany;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: RootObjectCrypto;
	role: string;
}
export interface RootObjectHair {
	color: string;
	type: string;
}
export interface RootObjectAddressCoordinates {
	lat: number;
	lng: number;
}
export interface RootObjectAddress {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: RootObjectAddressCoordinates;
	country: string;
}
export interface RootObjectBank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}
export interface RootObjectCompanyAddressCoordinates {
	lat: number;
	lng: number;
}
export interface RootObjectCompanyAddress {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: RootObjectCompanyAddressCoordinates;
	country: string;
}
export interface RootObjectCompany {
	department: string;
	name: string;
	title: string;
	address: RootObjectCompanyAddress;
}
export interface RootObjectCrypto {
	coin: string;
	wallet: string;
	network: string;
}