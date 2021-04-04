$().ready(() => {
    const pass = location.search && location.search.split('=')[1];
    if(pass) fetchPhones(pass);
});

function fetchPhones(pass){
    const url = `http://al-tay.ru/api/order.php?password=${pass}`;

    $.ajax({
        type: "GET",
        url,
        contentType: 'application/json',
        success: (result) => {
            console.log('get result: ', result);
            $('#phones').empty();
            if(result){
                result.forEach(user => {
                    $('#phones').append(
                        `<tr>
                            <td>${user.name || '-'}</td>
                            <td>${user.phone || '-'}</td>
                            <td>${user.email || '-'}</td>
                            <td> --- </td>
                            <td> --- </td>
                        </tr>`
                        )
                });
            }
        },
        dataType: 'json'
      });
}