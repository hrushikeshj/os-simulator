let counter = 1;
$(document).ready(function () {
    
    var rows = $('#tableId tbody tr').length
    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td>P'+rows+'</td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo0"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo1"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo2"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max0"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max1"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max2"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai0" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai1" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai2" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need0" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need1" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need2" disabled/></td>';

        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
        rows++;
    });

    $("table.order-list").on("click", ".ibtnDel", function (event) {
        if(rows >1){
            document.getElementById("tBody").deleteRow(-1)
            counter -= 1
            rows-=1
        }     
        
    });

});

let allocation = new Array(2)
let max = new Array(2)
let availiable = new Array()
let oldAvailiable = new Array(2)
let need = new Array(2)
let result = new Array()

function addArray(){    
    
    let rows = $('#tableId tbody tr').length
    for(let i = 0; i<rows;i++){
        allocation[i] = new Array(2)
        max[i] = new Array(2)        
        need[i] = new Array(2)
        oldAvailiable[i] = new Array(2)
        
    }

    for(let i = 0; i<rows;i++){
        for(let j = 0; j <3;j++){
            allocation[i][j] = parseInt(document.getElementById(i+'Allo'+j).value)
            max[i][j] = parseInt(document.getElementById(i+'Max'+j).value)
            availiable[j] = parseInt(document.getElementById('0Avai'+j).value)
            
        }
    }
}
function deleterow(){
    document.getElementById("tBody").deleteRow(-1)
    counter-=1
}

function calculate(){
    addArray()
    let rows = $('#tableId tbody tr').length
    let check = []
    for(let i = 0; i<rows;i++){
        check[i] = false
        for(let j = 0; j <3;j++){            
            need[i][j] = max[i][j]-allocation[i][j]
            document.getElementById(i+'Need'+j).value = need[i][j]            
        }
    }
    
    let k = 0
    let m = 0
    while(k<rows){
        let checkWhile = false
        for(let i = 0; i<rows;i++){
            if(check[i]==false){
                if(need[i][0]<=availiable[0] && need[i][1]<=availiable[1] && need[i][2]<=availiable[2]){
                    check[i] = true
                    result[k] = i
                    k++
                    checkWhile = true

                    oldAvailiable[m][0] = availiable[0]
                    oldAvailiable[m][1] = availiable[1]
                    oldAvailiable[m][2] = availiable[2]

                    availiable[0] = availiable[0]+allocation[i][0]
                    availiable[1] = availiable[1]+allocation[i][1]
                    availiable[2] = availiable[2]+allocation[i][2]
                    
                    document.getElementById('Avai0').value = availiable[0]
                    document.getElementById('Avai1').value = availiable[1]
                    document.getElementById('Avai2').value = availiable[2]
                    
                    document.getElementById(m+'Avai0').value = oldAvailiable[m][0]
                    document.getElementById(m+'Avai1').value = oldAvailiable[m][1]
                    document.getElementById(m+'Avai2').value = oldAvailiable[m][2]
                    m++
                
                }
               
            }
        }
        if(checkWhile==false){
            break
        }
    }
    if(k<rows){
        document.getElementById('result').value = 'Fail'
    }
    else{
        let str = ""
        for(let i = 0; i< rows; i++){
            str += "P"+result[i]
            if(i != rows-1){
                str+="-->"
            } 
        }
        document.getElementById('result').value = str
    }    

}
