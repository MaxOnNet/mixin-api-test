
class Formatting extends (Object) {
    static numberFormat(number, decimals, decimalPoint, thousandsSep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        const n = !isFinite(+number) ? 0 : +number;
        const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
        const dec = (typeof decimalPoint === 'undefined') ? '.' : decimalPoint;
        let s = '',
            toFixedFix = function (n, prec) {
                let k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    static walletFormat(wallet) {
        const walletStart = wallet.substring(0, 6);
        const walletEnd = wallet.substring(wallet.length - 16);

        return `${walletStart}...${walletEnd}`;
    }
    
    static durationFormat(unixTimestamp) {
        const dateCurrent = new Date().getTime();
        const dateDuration = dateCurrent / 1000 - unixTimestamp;
        const dateDurationHours = Math.floor(dateDuration / (60 * 60));
        const dateDurationMinutes = Math.floor((dateDuration - dateDurationHours * 60 * 60) / 60);
        const dateDurationSeconds = Math.floor((dateDuration - dateDurationHours * 60 * 60 - dateDurationMinutes * 60));
        
        const strDurationHours = Formatting.zeroPad(dateDurationHours, 2);
        const strDurationMinutes = Formatting.zeroPad(dateDurationMinutes, 2);
        const strDurationSeconds = Formatting.zeroPad(dateDurationSeconds, 2);
        
        return `${strDurationHours} : ${strDurationMinutes} : ${strDurationSeconds}`;
    }
    
    static zeroPad(num, numZeros) {
        const n = Math.abs(num);
        const zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
        let zeroString = Math.pow(10, zeros).toString().substr(1);
        
        if (num < 0) {
            zeroString = `-${zeroString}`;
        }
        
        return zeroString + n;
    }
}

export default Formatting;
