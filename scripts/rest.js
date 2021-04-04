function postOrderData(form){
    const data = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
    }

    const url = 'http://al-tay.ru/api/order.php';

    $.ajax({
        type: "POST",
        url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: (result) => {
            console.log('post result: ', result);
            alert('Ваша заявка на звонок принята');
        },
        dataType: 'json'
      });
   
}