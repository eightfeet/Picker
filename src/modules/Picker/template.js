import s from './Picker.scss';
import { inlineStyle } from '~/utils/tools';


function creatDataDom(config, jsonType) {
	const { wheelsData } = config;
	let tempHTML = '';
	for (let i = 0; i < wheelsData.length; i++) {
		//列
		tempHTML += `<div class="${s.wheel} ${config.id}_wheel"><ul class="${s.selectContainer} ${config.id}_selectcontainer">`;
		if (jsonType) {
			for (let j = 0; j < wheelsData[i].data.length; j++) {
				//行
				tempHTML += `<li data-id="${wheelsData[i].data[j][config.keyMap.name]}">${
					wheelsData[i].data[j][config.keyMap.value]
				}</li>`;
			}
		} else {
			for (let j = 0; j < wheelsData[i].data.length; j++) {
				//行
				tempHTML += `<li>${wheelsData[i].data[j]}</li>`;
			}
		}
		tempHTML += '</ul></div>';
	}
	return tempHTML;
}

export default function (config, jsonType) {
	const { id, cancelText, confirmText, titleText, style } = config;
	const { overlay, wrap, headlines, title, cancel, confirm, panel, selectline, mask, wheels } = style || {};

	const overlayStyle = inlineStyle(overlay);
	const wrapStyle = inlineStyle(wrap);
	const headlinesStyle = inlineStyle(headlines);
	const titleStyle = inlineStyle(title);
	const cancelStyle = inlineStyle(cancel);
	const confirmStyle = inlineStyle(confirm);
	const panelStyle = inlineStyle(panel);
	const selectlineStyle = inlineStyle(selectline);
	const maskStyle = inlineStyle(mask);
	const wheelsStyle = inlineStyle(wheels);

	return `<div class="${s.mobileSelect}">
            <div class="${s.grayLayer} ${s.overlay}" ${overlayStyle ? `style="${overlayStyle}"` : ''}>
            </div> 
            <div class="${s.content} ${id}_wrap" ${wrapStyle ? `style="${wrapStyle}"` : ''}>
                <div class="${s.btnBar} ${id}_headlines" ${headlinesStyle ? `style="${headlinesStyle}"` : ''}> 
                    <div class="${s.fixWidth} ${id}_content">
                        <div class="${s.cancel}" ${cancelStyle ? `style="${cancelStyle}"` : ''}>
                            ${cancelText}
                        </div>
						<div class="${s.title}" ${titleStyle ? `style="${titleStyle}"` : ''}>
							${titleText || ''}
                        </div>
                        <div class="${s.confirm}" ${confirmStyle ? `style="${confirmStyle}"` : ''}>
                            ${confirmText}
                        </div>
                    </div>
                </div>
                <div class="${s.panel}" ${panelStyle ? `style="${panelStyle}"` : ''}>
                    <div class="${s.fixWidth} ${id}_content">
                        <div class="${s.wheels}" ${wheelsStyle ? `style="${wheelsStyle}"` : ''}>
                            ${creatDataDom(config, jsonType)}
                        </div>
                        <div class="${s.selectLine}" ${selectlineStyle ? `style="${selectlineStyle}"` : ''}></div>
                        <div class="${s.shadowMask}" ${maskStyle ? `style="${maskStyle}"` : ''}></div>
                    </div>
                </div>
        </div>
    </div>`;
}
