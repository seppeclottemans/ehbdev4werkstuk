fetchData();

function fetchData() {
    $.ajax({
        url: 'entries.json',
        method: 'GET'
    }).done(function (data) {
        console.log(data)
    }).fail(function (err1, err2) {
        console.log(err1);
        console.log(err2);
    })
}