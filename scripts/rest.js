function postOrderData(form){
    const data = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
    }

    const url = 'http://217.25.92.140';

    $.ajax({
        type: "POST",
        url,
        data,
        contentType: 'application/json',
        success: (result) => console.log('post result: ', result),
        dataType: 'json'
      });
   
}