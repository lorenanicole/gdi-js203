
$("#myWordButton").on('click', function(e) {
    e.preventDefault();
    $('#results').empty();
    var myWord = $("#myWord").val();
    console.log(myWord);
    var apiUrl = "http://words.bighugelabs.com/api/2/54ff63dd1b02b162870fbde55d56049f/";
    var dataFormat = "/json";

    if (myWord.length > 0) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: apiUrl + myWord + dataFormat,
            success: function(data) {
                parseJsonData(data);
            }
        });
    } else {
        alert("You must enter a word!");
    }

});

function parseJsonData(data) {
    $.each(data, function(type, words) {
        if (words.syn !== undefined) {
            var synonyms = $("<div>");
            var synonymsHeader = $('<h5>' + type + ' synonyms:</h5>');
            var synonymsList = $('<ul>');
            for (var i = 0; i < words.syn.length; i++) {
                synonymsList.append('<li>' + words.syn[i] + '</li>');
            }
            synonymsList.append('</ul>');
            synonyms.append(synonymsHeader);
            synonyms.append(synonymsList);
            synonyms.append("</div>");
            $('#results').append(synonyms);
        }
        if (words.ant !== undefined) {
            var antonyms = $("<div>");
            var antonymsHeader = $('<h5>' + type + ' antonyms:</h5>');
            var antonymsList = $('<ul>');
            for (var idx = 0; idx < words.ant.length; idx++) {
                antonymsList.append('<li>' + words.ant[idx] + '</li>');
            }
            antonymsList.append('</ul>');
            antonyms.append(antonymsHeader);
            antonyms.append(antonymsList);
            antonyms.append("</div>");
            $('#results').append(antonyms);
        }
    });
}