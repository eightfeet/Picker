import { inlineStyle } from '~/utils/tools';

describe('inlineStyle', () => {
	it('Without parameters, the result should be null', () => {
		const input = null;
		const output = null;
		expect(inlineStyle(input)).toBe(output);
	});
    
	it('With parameters={backgroundColor: "red"}, The result should be "background-color:red;"', () => {
		const input = {
			backgroundColor: 'red'
		};
		const output = 'background-color:red;';
		expect(inlineStyle(input)).toBe(output);
	});

	it('With parameters={"z-intex": 100}, the result should be "background-color:red;"', () => {
		const input = {
			'z-intex': 100
		};
		const output = 'z-intex:100;';
		expect(inlineStyle(input)).toBe(output);
	});

	it('With parameters={transition: "200ms all"}, the result should be "transition:200ms all;-webkit-transition:200ms all;-moz-transition:200ms all;"', () => {
		const input = {
			transition: '200ms all'
		};
		const output = 'transition:200ms all;-webkit-transition:200ms all;-moz-transition:200ms all;';
		expect(inlineStyle(input)).toBe(output);
	});
});
