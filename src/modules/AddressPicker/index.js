import MobileSelect from './../MobileSelect';
import { inlineStyle } from '~/utils/tools';
import m from './../MobileSelect/MobileSelect.scss';

class AddressPicker extends MobileSelect {
	constructor(data) {
		const stamp = new Date().getTime();
		const {
			style,
			popularCities,
			id
		} = data || {};
		const operatedData = {
			triggerDisplayData: false,
			...data,
			id: id || `AddressPicker${stamp}-${window.Math.floor(window.Math.random() * 100)}`
		};
		super(operatedData);
		this.popularCities = popularCities;
		this.initAddressPicker(style);
	}

	initAddressPicker = style => {
		const addressPicker = document.getElementById(this.id);
		const contentElement = addressPicker.querySelector(`.${this.id}_wrap`);
		const btnBarElement = addressPicker.querySelector(`.${this.id}_headlines`);

		const {
			popularCities,
			popularCitiesTitle,
			popularCitiesItem
		} = style || {};

		if (this.popularCities && Array.isArray(this.popularCities)) {
			let popularCityDom = document.createElement('div');
			popularCityDom.innerHTML = `<h3 class="${m.hottitle} ${this.id}_popular">热门城市</h3>`;
			popularCityDom.classList.add(m.popularcities);
			popularCityDom.classList.add(m.clearfix);

			this.popularCities.forEach(item => {
				const div = document.createElement('div');
				div.innerHTML = item.name;
				div.className = m.hotitem;
				div.setAttribute('data-id', item.id);
				div.addEventListener('click', e => {
					let positionData = e.target.getAttribute('data-id');
					if (positionData) {
						positionData = positionData.split(',');
						this.updatePicker(positionData);
					}
				});
				popularCityDom.appendChild(div);
			});
			contentElement.insertBefore(popularCityDom, btnBarElement);

			const popularCitiesElement = addressPicker.querySelector(
				`.${m.popularcities}`
			);
			const hottitleElement = addressPicker.querySelector(`.${m.hottitle}`);
			const hotitemElement = popularCitiesElement.getElementsByTagName('div');

			if (popularCities) {
				const inLinePopularCities = inlineStyle(popularCities);
				inLinePopularCities &&
			popularCitiesElement.setAttribute('style', inLinePopularCities);
			}

			if (popularCitiesTitle) {
				const inLinePopularCitiesTitle = inlineStyle(popularCitiesTitle);
				inLinePopularCitiesTitle &&
			hottitleElement.setAttribute('style', inLinePopularCitiesTitle);
			}

			if (popularCitiesItem && inlineStyle(popularCitiesItem)) {
				for (let index = 0; index < hotitemElement.length; index++) {
					const element = hotitemElement[index];
					element.setAttribute('style', inlineStyle(popularCitiesItem));
				}
			}
		}
	};
}

export default AddressPicker;
