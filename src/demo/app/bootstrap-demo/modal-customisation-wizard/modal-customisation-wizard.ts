import {Component} from '@angular/core';
import {Modal} from '../../../../components/angular2-modal';
import {
    TwoButtonPreset,
    TwoButtonPresetBuilder
} from '../../../../components/angular2-modal/plugins/bootstrap';


@Component({
    selector: 'customize-wizard',
    templateUrl:
        'demo/app/bootstrap-demo/modal-customisation-wizard/modal-customisation-wizard.tpl.html'
})
export class ModalCustomisationWizard {
    type: 'alert' | 'prompt' | 'confirm' = 'alert';
    public preset: TwoButtonPreset = <any>{
        size: 'lg',
        isBlocking: true,
        showClose: true,
        keyboard: 27,
        dialogClass: '',
        headerClass: '',
        title: 'Hello World',
        titleHtml: '',
        body: 'A Customized Modal',
        bodyClass: '',
        footerClass: '',
        okBtn: '',
        okBtnClass: '',
    };

    constructor(public modal: Modal) {}

    createModal() {
        let p = this.preset;

        let fluent: TwoButtonPresetBuilder = <any>this.modal[this.type]();
        for (let key in p) {
            let value = p[key];
            if (value === null || value === '') continue;
            fluent[key](value);
        }

        fluent.open();
    }

    get code(): string {
        let p = this.preset,
            code = `modal.${this.type}()\n`;

        for (let key in p) {
            let value = p[key];
            if (value === null || value === '') continue;
            code += `    .${key}(${typeof value === 'string' ? `'${value}'` : value})\n`;
    }

        code += '    .open();';
        return code;
    }
}
