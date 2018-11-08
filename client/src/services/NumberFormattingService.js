
const formatter = new Intl.NumberFormat({
    style: 'currency',
})
export default {
    formatToCurrency(value){
        value = (value == '' || value == '$') ? '0' : value;
        value = value.replace(/\$/g,'');
        value = value.replace(/\,/g,'');
        return formatter.format(parseInt(value));
    },
}