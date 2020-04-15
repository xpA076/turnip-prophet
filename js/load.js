const patternId = [
    "#pattern-radio-unknown",
    "#pattern-radio-fluctuating",
    "#pattern-radio-small-spike",
    "#pattern-radio-large-spike",
    "#pattern-radio-decreasing"
]

let selectedUser = "";

function loadUserData(username){
    selectedUser = username;
    $.ajax({
        type: 'POST',
        url: 'http://server.hhcsdtc.com:9999/Echo/TurnipGet',
        contentType: 'application/json;charset=utf-8',
        data: username,
        dataType: 'text',
        success: function (result) {
            let data = JSON.parse(result);
            $(patternId[data.lastWeekType + 1]).click();
            $('#buy').val(data.buy);
            for (let i = 0; i < 12; ++i) {
                if (data.sell[i] < 0) {
                    break;
                }
                $('#sell_' + (i + 2)).val(data.sell[i]);
            }
            update();
        }
    });
    
}

function uploadUserData(){
    let sellData;
    let type = -1;
    $.ajax({
        type: 'POST',
        url: 'http://server.hhcsdtc.com:9999/Echo/TurnipSet',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
            name : selectedUser,
            buy : parseInt($('#buy').val()),
            sell : sellData,
            type : type
        }),
        dataType: 'text',
        success: function (result) {
            alert('Upload ' + result);
        }
    });
}