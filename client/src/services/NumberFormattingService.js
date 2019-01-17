
const formatter = new Intl.NumberFormat({
    style: 'currency',
})
export default {
    formatToCurrency(value){
        console.log(value)
        value = (value == '' || value == '$') ? '0' : value;
        value = value.replace(/\$/g,'');
        value = value.replace(/\,/g,'');
        return formatter.format(parseInt(value));
    },
    formatToCurrencyV2(value){
        console.log(value)
        return formatter.format(parseInt(value));
    },
}