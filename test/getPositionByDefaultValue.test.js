import { getPositionByDefaultValue } from '~/utils/tools';

describe('getPositionByDefaultValue', () => {
	it('Without parameters, the result should be an empty array', () => {
		const input = getPositionByDefaultValue();
		const output = [];
		expect(input).toStrictEqual(output);
	});

	it('非法', () => {
		const input = getPositionByDefaultValue(
			['周二', '11:00'],
			[
				// { data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] },
				// { data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'] }
			]
		);
		const output = [2, 3];
		expect(input).toStrictEqual(output);
	});

	it('When the parameter is a normal data, the function returns the correct result', () => {
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

});