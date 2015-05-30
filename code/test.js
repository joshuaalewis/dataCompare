/**
 * Created by jolewis on 5/29/2015.
 */

var result1 = [];
var result2 = [];
var table1;
var table2;

function handleFileSelect1(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    readFile(files[0], 0, files[0].size - 1, 1);
}

function handleFileSelect2(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    readFile(files[0], 0, files[0].size - 1, 2);
}

function handleDragOver1(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleDragOver2(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function readFile(file, opt_startByte, opt_stopByte, tableNumber) {

    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2

            populateTable(evt.target.result, tableNumber, file.name);
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsText(blob);
}

// Setup the dnd listeners.
    var dropZone1 = document.getElementById('drop_zone1');
    dropZone1.addEventListener('dragover', handleDragOver1, false);
    dropZone1.addEventListener('drop', handleFileSelect1, false);

    var dropZone2 = document.getElementById('drop_zone2');
    dropZone2.addEventListener('dragover', handleDragOver2, false);
    dropZone2.addEventListener('drop', handleFileSelect2, false);

function populateTable(parameters, tableNumber, fileName) {

    // Two tables can be populated

    if(tableNumber == 1){
        if(fileName != undefined) {
            $('#drop_zone1').html("File: " + fileName);
            $('#drop_zone1').removeClass("inactive");
            $('#drop_zone1').removeClass("active");
        }

        result1 = JSON.parse(parameters)["LEDGER"];

        // Have to destroy a table before altering its data. No known workaround
        if(table1 != null){
            table1.fnDestroy();
        }

        table1 = $('#juicy1').dataTable( {
            data: result1,
            "scrollY": "2000px",
            "paging": false,
            // Must explicitly define which cells are being read
            "columns": [
                { data: "ILLUSYR"},
                { data: "ILLUSAGE"},
                { data: "ASMRATE"},
                { data: "YRPREMIUM"},
                { data: "CURSUR"},
                { data: "CURCV"},
                { data: "CURACCUM"},
                { data: "CURDB"},
                { data: "GUARCV"},
                { data: "GUARACCUM"},
                { data: "GUARDB"},
                { data: "ACCUMPREM"}
            ]
        } );
    }
    else if(tableNumber == 2){
        if(fileName != undefined) {
            $('#drop_zone2').html("File: " + fileName);
            $('#drop_zone2').removeClass("inactive");
            $('#drop_zone2').removeClass("active");
        }
        result2 = JSON.parse(parameters)["LEDGER"];

        // Have to destroy a table before altering its data. No known workaround
        if(table2 != null){
            table2.fnDestroy();
        }

        table2 = $('#juicy2').dataTable( {
            data: result2,
            "scrollY": "2000px",
            "paging": false,
            // Must explicitly define which cells are being read
            "columns": [
                { data: "ILLUSYR"},
                { data: "ILLUSAGE"},
                { data: "ASMRATE"},
                { data: "YRPREMIUM"},
                { data: "CURSUR"},
                { data: "CURCV"},
                { data: "CURACCUM"},
                { data: "CURDB"},
                { data: "GUARCV"},
                { data: "GUARACCUM"},
                { data: "GUARDB"},
                { data: "ACCUMPREM"}
            ]
        } );
    }

}

function startup(parameters) {

    populateTable(parameters, 1);
    populateTable(parameters, 2);
    setupDropZoneText();
}

function setupDropZoneText() {
    $('#drop_zone1').html("Drop file here");
    $('#drop_zone2').html("Drop file here");
}

$(document).ready(
    function() {

        //populateTableFromLocation('data/_92059074ledger.json');
        $.ajax({
            url: 'data/_92059074ledger.json',
            dataType: 'text',
            success: startup
        })

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //alert('FILE API is supported, please use drag and drop.');
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
});

