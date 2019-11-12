/* eslint-disable no-undef */

export const isPC = !(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));

// isFinite Polyfill
Number.isFinite = Number.isFinite || function(value) {
	return typeof value === 'number' && isFinite(value);
};

/**
 * 设置dom的font-size，用于控制子元素的em基准单位，pc端时 font-size = 16px，
 * 如果有emBase传入直接使用emBase为基准字体大小
 * 其他按规则计算字体值（屏幕宽度:UI宽度 = 屏幕字体大小:UI字体大小）
 * @param {HTMLElement} dom
 * @param {String} parentId
 * @param {Number} emBase
 * @returns
 */
function setEmBase (dom, parentId, emBase) {
	const emBaseValidate = Number.isFinite(emBase);
	if (emBaseValidate) {
		dom.style.fontSize = `${emBase}px`;
		return;
	}
	let docEl = window.document.documentElement;
	let parEl = window.document.getElementById(parentId);
	let clientWidth = docEl.clientWidth;
	let parentWidth = parEl ? parEl.clientWidth : null;
	const baseFont = parseFloat(__BASEFONT__);
	const uiWidth = parseFloat(__UIWIDTH__);
	if (parEl) {
		if (parentWidth >= uiWidth) {
			dom.style.fontSize = baseFont + 'px';
		} else {
			dom.style.fontSize = baseFont * (parentWidth / uiWidth) + 'px';
		}
		return;
	}
	if (!clientWidth) return;
	if (isPC) {
		dom.style.fontSize = '16px';
		return;
	}

	if (clientWidth >= uiWidth) {
		dom.style.fontSize = baseFont + 'px';
	} else {
		dom.style.fontSize = baseFont * (clientWidth / uiWidth) + 'px';
	}
}

/**
 * dom Hooks 挂载模板到document的指定目标节点，当目标节点不存在时创建一个并设置基准fontSize
 *
 * @export
 * @param {HTMLElement} dom (Required) html模板
 * @param {String} target (Required) element id
 * @param {String} parentId 父级 id
 * @returns
 */
export function createDom(dom, target, parentId, emBase) {
	return new Promise((resolve, reject) => {
		if (!target || !dom) {
			reject('function createDom: params "dom" or "target" not found.');
			return;
		}
		const hasTarget = document.getElementById(target);
		if (hasTarget) {
			hasTarget.innerHTML = dom;
			return;
		}
		const div = document.createElement('div');
		div.setAttribute('id', target);
		setEmBase(div, parentId, emBase);
		const parentIdDom = document.getElementById(parentId);
		if (parentIdDom) {
			parentIdDom.appendChild(div);
			const targetDom = document.getElementById(target);
			targetDom.innerHTML = dom;
			resolve();
			return;
		}
		document
			.body
			.appendChild(div);
		const targetDom = document.getElementById(target);
		targetDom.innerHTML = dom;
		resolve();
	});
}


/**
 * 移除指定id的dom及其子节点
 *
 * @export
 * @param {String} target (Required) element id
 * @returns
 */
export function removeDom(target) {
	return new Promise((resolve, reject) => {
		if (!target) {
			reject('function removeDom: params "target" not found.');
			return;
		}
		const dom = document.getElementById(target);
		if (!dom) {
			reject(`<div id="${target}"> 不存在！`);
			return;
		}
		const parentDom = dom.parentNode;
		parentDom.removeChild(dom);
		resolve();
	});
}

/**
 *
 * html模板编与样式绑定，使用html模板时需要用到
 * @export
 * @param {*} dom
 * @param {*} classes
 * @returns
 */
export function combineDomByClass(dom, classes) {
	return new Promise((resolve, reject) => {
		if (!dom || !classes) {
			reject('function combineDomByClass: params "dom" or "classes" not found.');
			return;
		}
		const keys = Object.keys(classes);
		let result = dom;
		keys.forEach(item => {
			const reg = new RegExp(`((class|id)=.*(?=${item}["\\s>]))${item}`,'g');
		    result = result.replace(reg, `$1${classes[item]}`);
		});
		resolve(result);
	});
}
