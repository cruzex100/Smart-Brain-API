
import React, {Component} from 'react';
import './Main.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { format } from 'url';
const pdfMake=require('pdfmake')
class ExcelInput extends Component
 {
     constructor(props)
     {
         super(props);
         this.state={
             inputURL:'',
             result:'',
             table:'',
             SKU:'',
             Publisher:''
         }
     }

    
 onInputChange=(event)=>{
    this.setState({input:event.target.value});
    
   }
    
onButtonClick=()=>{
fetch('http://localhost:3000/input',{
  method:'post',
  headers: {'Content-Type': 'application/json'},
  body:JSON.stringify({input:this.state.input})
})
  .then(response=> response.json())
  .then(result=> {
      this.setState({result: result.MasterTracking})
     })
  
}

//Update the view per Publisher from the sample data..

generateJsonTable=()=>
{
  const {result}= this.state
  fetch('http://localhost:3000/Exportdb',{
  method:'post',
  headers: {'Content-Type': 'application/json'},
 })
  .then(response=> response.json())
  .then(result=> {
      this.setState({result: result.MasterTracking})
     
})

//Add table view in the browser.

     var col=[];
          for (var i=0; i<result.length; i++){
          for(var key in result[i]){
            if (col.indexOf(key) === -1) {
                col.push(key);
             }
                }
      }

      var table= document.createElement("table");
      var tr= table.insertRow(-1);
      for ( var i=0; i<9;i++){
          var th=document.createElement("th")
          th.innerHTML=col[i];
          tr.appendChild(th);
        }
      
    for (var i = 0; i < 9; i++) {
      tr = table.insertRow(-1);
     for (var j = 0; j < col.length; j++) {
         var tabCell = tr.insertCell(-1);
         tabCell.innerHTML = result[i][col[j]]
        
     }

 }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    this.setState({table})

    let dropdown = document.getElementById('Publisher-dropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Publisher';
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    let option;
    let list=[]
      for (let i = 0; i < result.length; i++) {
        option = document.createElement('option');

          option.text = result[i].Publisher;
          option.value = result[i].Publisher;
          if(!list.includes(result[i].Publisher))
          {
               dropdown.add(option);  
               console.log(result[i].Publisher)
               list.push(result[i].Publisher)
          }
                   
      }  
 
}


exportFile=()=>{
// export file to PDF based on the selection
//If the PDFs need to be generated per Publisher.

const {Publisher,result}=this.state
console.log('clicked')
let publisherArr=[]
for(let i=0; i< result.length;i++)
{
     if(result[i].Publisher===Publisher){
        publisherArr.push(result[i])
        this.setState({Publisher:result[i].Publisher})
     }     
    
  }

  // create a new table for  the subset

const {table}=this.state
var col=[];
for (var i=0; i<publisherArr.length; i++){
for(var key in publisherArr[i]){
  if (col.indexOf(key) === -1) {
      col.push(key);

    }
      }
}

var table1= document.createElement("table");
var tr= table1.insertRow(-1);
for (var i=0; i<9;i++){
var th=document.createElement("th")
th.innerHTML=col[i];
tr.appendChild(th);
}

for (var i = 0; i < publisherArr.length; i++) {
    tr = table1.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = publisherArr[i][col[j]]
        }  
    }

    var divContainer= document.getElementById("table-id");
    divContainer.innerHTML = "";
    divContainer.appendChild(table1);
    var doc = new jsPDF('l','pt','letter');
    var text=doc.text(`Details for ${publisherArr[0]. Publisher}`, 400,50, 'center')

 // Create PDF using AutoTable
    doc.autoTable(
         {text: text,
          html:table1, 
        startY: 80,
        margin: 10,
        styles: {Overflow :'ellipsize', cellPadding: 1, fontSize: 5,halign:'left' },
       
    })

  //doc.output("dataurlnewwindow"); If do not need to download... you this instead
        
  }



onSKUChange=(event)=>
{
this.setState({SKU:event.target.value})
}

onPublisherChange=(event)=>
{
this.setState({Publisher:event.target.value})
}

onClick=()=>{
    const {result}=this.state
    let dropdownpub = document.getElementById('SKU-dropdown');
    dropdownpub.length = 0;
    let defaultOptionpub = document.createElement('option');
    defaultOptionpub.text = 'Choose SKU';
    dropdownpub.add(defaultOptionpub);
    dropdownpub.selectedIndex = 0;
    let optionpub;
    let listpub=[]
      for (let i = 0; i < result.length; i++) {
        if(result[i].Publisher===this.state.Publisher){
            optionpub = document.createElement('option');
            optionpub.text = result[i].SKU;
            optionpub.value = result[i].SKU;
          if(!listpub.includes(result[i].SKU))
          {
               dropdownpub.add(optionpub);  
               console.log(result[i].SKU)
               listpub.push(result[i].SKU)
          }
        }
                           
      }
}

render ()
{

return( 
    <div id="container1">
        <h1> This is a excel to json converter.. Please provide a excel sheet. </h1>
        <input type='text' onChange ={this.onInputChange} /> 
        <input className='button' onClick={this.onButtonClick} value='Submit' id='submit' type='submit'/>
        {/* <input className='SKU' onClick='ksksks' value='Select SKU' id='View' list="SKU" onchange={this.onSKUChange} /> */}
        <input className='button' onClick={this.generateJsonTable} value='View Publisher Details' id='View' type='submit'/>
        <input className='button' onClick={this.exportFile} value='Export To PDF' id='View' type='submit'/>
        <select id="Publisher-dropdown" onClick={this.onClick}  onChange={this.onPublisherChange}/>
        <select id="SKU-dropdown" onChange={this.onSKUChange}/>
        {/* <iframe id="iframeContainer"></iframe> */}
        <table id="table-id"></table>
        <div id="container">
        <p id="showData"></p>
        </div>
    </div>
    )
    }
}

 export default ExcelInput;