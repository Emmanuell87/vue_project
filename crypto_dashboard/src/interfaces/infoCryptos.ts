interface InfoCryptos {
	cid: number;
	name: string;
	pairs: [
		{
			cid: 1;
			value: string;
			name: string;
			label: string;
		}
	];
}

export type TInfoCryptos = {
	[quote: string]: InfoCryptos;
};
