export type TPairs = {
	cid: 1;
	value: string;
	name: string;
	label: string;
};

interface InfoCryptos {
	cid: number;
	name: string;
	pairs: TPairs[];
}

export type TInfoCryptos = {
	[quote: string]: InfoCryptos;
};
