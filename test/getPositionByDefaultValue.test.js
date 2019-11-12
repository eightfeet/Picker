import { getPositionByDefaultValue } from '~/utils/tools';

describe('getPositionByDefaultValue', () => {
	it('Without parameters, the result should be an empty array', () => {
		const input = getPositionByDefaultValue();
		const output = [];
		expect(input).toStrictEqual(output);
	});

	it('An empty array returned when illegal data is entered', () => {
		const input = getPositionByDefaultValue(
			['周二', '11:00'],
			[]
		);
		const output = [];
		expect(input).toStrictEqual(output);
	});

	it('When the parameter "data" is a normal data, the function returns the correct result', () => {
		const input = getPositionByDefaultValue(
			['周二', '11:00'],
			[
				{ data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] },
				{ data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'] }
			]
		);
		const output = [2, 3];
		expect(input).toStrictEqual(output);
	});

	it('When the parameter "data" is a json data, the function returns the correct result', () => {
		const input = getPositionByDefaultValue(
			['周日', '09:00'],
			[
				{ data: [{ val: 0, date: '周日' }, { val: 1, date: '周一' }, { val: 2, date: '周二' }] },
				{ data: [{ val: 8, date: '08:00' }, { val: 9, date: '09:00' }, { val: 10, date: '10:00' }] }
			],
			{
				name: 'date',
				value: 'val'
			},
			true,
			false
		);
		const output = [2, 3];
		expect(input).toStrictEqual(output);
	});

	

});