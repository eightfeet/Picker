import puppeteer from 'puppeteer';
import '@babel/runtime/regenerator';
import {installMouseHelper} from './install-mouse-helper';

/**
 * 2、end2end， yarn start
 * 测试正常
*/
describe('Picker', () => {
	// end2end测试
	it('picker end2end test', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			args: ['--window-size=800,800']
		});
		const page = await browser.newPage();
		await installMouseHelper(page);
		await page.goto('http://localhost:9000/');

		// picker的trigger ‘div#picker’被点击时，显示值为“周日 08:00”，由回调方法onShow改变所选值
		await page.click('div#picker');
		let onShowText = await page.$eval('#picker', el => el.outerText);
		expect(onShowText).toBe('demo');
		await page.waitFor(500);
		onShowText = await page.$eval('#picker', el => el.outerText);
		expect(onShowText).toBe('周日 08:00');

		// picker的wheels 定位正常，onShow时显示在'周日 08:00'，节点transform位置应为80px
		const pickerSelectPosition = await page.$eval('.pickerSelect_selectcontainer', el => el.getAttribute('style'));
		expect(pickerSelectPosition.indexOf('80px') !== -1).toBe(true);

		// picker的id设置正常, PC下emBase默认大小16px
		const pickerSelect = await page.$eval('#pickerSelect', el => el.getAttribute('style'));
		expect(pickerSelect).toBe('font-size: 16px;');
		
		
		await page.evaluate(() => document.querySelector('.pickerSelect_headlines').children[0].children[0].classList.add('pickerSelect_cancel'));
		await page.evaluate(() => document.querySelector('.pickerSelect_headlines').children[0].children[1].classList.add('pickerSelect_title'));
		await page.evaluate(() => document.querySelector('.pickerSelect_headlines').children[0].children[2].classList.add('pickerSelect_confirm'));

		// cancelBtnText 取消按钮设置正常
		const cancelBtnText = await page.$eval('.pickerSelect_cancel', el => el.outerText);
		expect(cancelBtnText).toBe('cancel');

		// ensureBtnText 确定按钮设置正常
		const ensureBtnText = await page.$eval('.pickerSelect_confirm', el => el.outerText);
		expect(ensureBtnText).toBe('ensure');

		// title 设置正常
		const titleText = await page.$eval('.pickerSelect_title', el => el.outerText);
		expect(titleText).toBe('demo');
		await page.waitFor(1000);

		// 点击交互
		await page.evaluate(() => document.getElementsByClassName('pickerSelect_selectcontainer')[0].children[1].setAttribute('id', 'wheelsposition2'));
		
		// 点击二月检查滚动是否正常
		await page.click('#wheelsposition2');
		const wheelsPosition2 = await page.$eval('.pickerSelect_selectcontainer', el => el.getAttribute('style'));
		expect(wheelsPosition2.indexOf('40px') !== -1).toBe(true);
		await page.waitFor(1000);

		// 验证点击确定后取之正常
		await page.click('.pickerSelect_cancel');
		const closeText = await page.$eval('#picker', el => el.outerText);
		expect(closeText).toBe('normal');
		page.close();
		
	}, 5000);
});

