

var regNameInput = '^[a-z0-9]+$';
var regNameText = '[šć]';


initalize();

$('.container-fluid').on('keydown', function (e) {
    checkSave();
})
//alert func for displaying errors
function addAlert(stringToDisplay) {
    document.getElementById('alert-box').innerHTML = '<div class="alert alert-danger">' + stringToDisplay + '</div>';
    setTimeout(function () {
        document.getElementById('alert-box').innerHTML = '';
    }, 3000);
}

//save name and text to local storage
function saveText() {
    var name = document.getElementById('textName').value;
    var text = document.getElementById('text').value;
    localStorage.setItem(name, text);
    document.getElementById('alert-box').innerHTML = '<div class="alert alert-success">Text saved successfully</div>';
    setTimeout(function () {
        document.getElementById('alert-box').innerHTML = '';
    }, 3000);
    checkSave();
}

//generate text lorem ipsum
function generateText() {
    $.ajax({
        type: "GET",
        url: "http://loripsum.net/api/plaintext/1",
        success: function (data) {
            document.getElementById('text').value = data;
            checkSave();
        },
        error: function () {
            // addAlert("No Text Found");
        }
    });
}
// break

//input name restrictions - only small letters and numbers
function inputKeyEvent(event) {
    if (event.key.match(regNameInput)) {
        console.log(event.key);
    } else {
        event.preventDefault();
        addAlert("Name can contain only small letters and numbers");
    }
}

function inputPasteEvent(event) {
    var e = event.clipboardData.getData('Text');
    if (e.match(regNameInput)) {
        console.log(e);
    } else {
        event.preventDefault();
        addAlert("Name can contain only small letters and numbers");
    }
}
// break

//textarea text restrictions - š and ć not allowed
function textKeyEvent(event) {
    if (event.key.toLowerCase() !== "š" && event.key.toLowerCase() !== "ć") {
    } else {
        event.preventDefault();
        addAlert("Entry of character: " + event.key + " not allowed");
    }
}

function textPasteEvent(event) {
    var e = event.clipboardData.getData('Text');
    if (e.match(regNameText)) {
        event.preventDefault();
        addAlert("Name can contain only small letters and numbers");
    } else {
        console.log(e);
    }
}
// break

//deleting more than one character restriction
$('#text').on('keydown', function (e) {
    var text = document.getElementById('text');
    var name = document.getElementById('textName');
    if (text.selectionStart + 1 < text.selectionEnd) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            e.preventDefault();
            addAlert("Cant delete more than one character");
        }
    }
    setTimeout(function () {

    }, 100)
});
// break

//getting url for queries
function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        // vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//getting name and text based on query
function initalize() {
    var params = getUrlVars();
    if (params.storeKey) {
        if (localStorage.getItem(params.storeKey)) {
            document.getElementById('textName').value = params.storeKey;
            $('#textName').attr('disabled', 'disabled');
            document.getElementById('text').value = localStorage.getItem(params.storeKey);
        } else {
            addAlert("Text doesnt exist");
        }
    }
    checkSave();
}

// break


//check if save btn should be disabled or enabled
function checkSave() {
    setTimeout(function () {
        var text = document.getElementById('text').value;
        var name = document.getElementById('textName').value;
        if (text.value === "" || name.value === "") {
            $('#saveBtn').prop('disabled', true);
        }
        else if (localStorage.getItem(name)) {
            if (localStorage.getItem(name) === text) {
                $('#saveBtn').prop('disabled', true);
            } else {
                $('#saveBtn').prop('disabled', false);
            }
        } else $('#saveBtn').prop('disabled', false);

    }, 200);
}