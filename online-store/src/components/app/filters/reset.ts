const btnReset = document.querySelector('.filter_reset');
const btnCopy = document.querySelector('.filter_copy');

btnReset?.addEventListener('click', () => {
    // const list = ['price', 'brand', 'category', 'rating'];
    const checkboxList = document.querySelectorAll('input[type=checkbox]');
    // const rangeList = catalogState.rangeSliders;
    // checkboxList.forEach((item) => {
    //     const element = <HTMLInputElement>item;
    //     element.checked = false;
    //     catalogState.resetCheckboxList();
    // });
    // rangeList.forEach((item: { value: string }[]) => {
    //     item[0].value = '0';
    //     item[1].value = '100';
    // });
    // const searchParams = new URLSearchParams(window.location.search);
    // list.forEach((a) => searchParams.delete(a));
    // pushRout(`/?${searchParams.toString()}`);
    // onPopstate();
});

btnCopy?.addEventListener('click', (e) => {
    console.log(window.location.href);
    navigator.clipboard.writeText(window.location.href);
});
