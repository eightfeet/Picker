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
			[0, 9],
			[
				{ data: [{ val: 0, date: '周日' }, { val: 1, date: '周一' }, { val: 2, date: '周二' }] },
				{ data: [{ val: 8, date: '08:00' }, { val: 9, date: '09:00' }, { val: 10, date: '10:00' }] }
			],
			{
				display: 'date',
				value: 'val'
			},
			true,
			false
		);
		const output = [0, 1];
		expect(input).toStrictEqual(output);
	});

	it('When the parameter "data" is a cascade data, the function returns the correct result', () => {
		const input = getPositionByDefaultValue(
			[10, 2],
			[
				{
					data: [
						{
							val: 10,
							date: '周日',
							children: [{ val: 1, date: '01:00' }, { val: 2, date: '02:00' }, { val: 3, date: '03:00' }]
						},
						{
							val: 11,
							date: '周一',
							children: [{ val: 4, date: '04:00' }, { val: 5, date: '05:00' }, { val: 6, date: '06:00' }]
						},
						{
							val: 12,
							date: '周二',
							children: [{ val: 7, date: '07:00' }, { val: 8, date: '08:00' }, { val: 9, date: '09:00' }]
						}
					]
				}
			],
			{
				display: 'date',
				value: 'val',
				childs: 'children'
			},
			true,
			true
		);
		const output = [0, 1];
		expect(input).toStrictEqual(output);
	});

});