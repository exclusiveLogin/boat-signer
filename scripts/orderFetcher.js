$().ready(() => {
    const pass = location.search && location.search.split('=')[1];
    global.pass = pass;
    if(pass) fetchPhones();
    
});

const global = {
    lastReaded: 0,
}

function setReaded(){
    const data = {
        id: global.lastReaded,
        pass: null,
    }

    const url = 'http://al-tay.ru/api/order.php';

    $.ajax({
        type: "POST",
        url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: (result) => {
            console.log('post result: ', result);
            alert('Ваши заявки отмечены как прочтенные');
            fetchPhones();
        },
        dataType: 'json'
      });
}
function fetchPhones(){
    const url = `http://al-tay.ru/api/order.php?pass=${global.pass}`;

    $.ajax({
        type: "GET",
        url,
        contentType: 'application/json',
        success: (result) => {
            console.log('get result: ', result);
            if(result){
                $('#phones').empty();
                if(result.error) {
                    console.warn('Пароль для доступа к разделу не верный');
                    return;
                }
                result.forEach(user => {
                    $('#phones').append(
                        `<tr ${!user.readed ? 'class="bolder"' : ''}>
                            <td>${user.name || '-'}</td>
                            <td>${user.phone || '-'}</td>
                            <td>${user.email || '-'}</td>
                            <td> --- </td>
                            <td> --- </td>
                        </tr>`
                        )
                });
                $('#phones').append('<tr><td><button class="uk-button uk-button-default" onclick="setReaded(this);">Отметить все прочитанными</button></td></tr>')
                global.lastReaded = Math.max(...result.map(u => +u.id), 0);
        
            }
        },
        dataType: 'json'
      });
}