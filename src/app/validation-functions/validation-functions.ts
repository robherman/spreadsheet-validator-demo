import { CustomValidationRuleResult } from 'xlsx-lib';

export class ValidationFunctions {
    constructor() { }

    public validateCuitCuil(cuit: string): CustomValidationRuleResult {
        const cod = '6789456789';
        const aMult = cod.split('');
        const sCUIT = String(cuit);
        let iResult = 0;
        const aCUIT = sCUIT.split('');

        if (aCUIT.length === 11) {
            // La suma de los productos
            for (let i = 0; i <= 9; i++) {
                iResult += (+aCUIT[i]) * (+aMult[i]);
            }
            // El módulo de 11
            iResult = (iResult % 11);

            // Se compara el resultado con el dígito verificador
            return new CustomValidationRuleResult(iResult === +aCUIT[10]);
        }
        return new CustomValidationRuleResult(false);
    }

    public emailValid(email: string): CustomValidationRuleResult {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return new CustomValidationRuleResult(re.test(String(email).toLowerCase()), email.toLowerCase());
    }
}
