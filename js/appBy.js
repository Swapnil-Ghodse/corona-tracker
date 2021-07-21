

let fetchLink = "https://api.covid19api.com/live/country/south-africa/status/confirmed";
//https://api.covid19api.com/live/country/south-africa/status/confirmed 
//"https://api.covid19api.com/country/south-africa/status/confirmed";

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.covid19api.com/live/country/south-africa/status/confirmed", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


function fetchData(link, country){
   
   link = link.replace("south-africa",country);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      

      fetch(link, requestOptions)
        .then(responseOne => responseOne.json())
        .then(resultOne => {
            console.log(resultOne)
            
            let date = [];
            let cases = [];
            let RecoveredCases = [];
            let deathCases = [];
            let activeCases= [];
            
            resultOne .forEach( (item, index, array) => {
               date.push( item.Date.substr(0, 10) );
               cases.push( item.Confirmed);
               RecoveredCases.push(item.Recovered);
               deathCases.push( item.Deaths);
               activeCases.push( item.Active);
            });
            
            console.log("Active cases",date);
            
            document.getElementById("myChart").style.boxShadow = '5px 5px 10px white';
            document.getElementById("myChart").style.boxShadow = '-30px -5px 30px #ffffff10, 1px 1px 30px #00000066';
            document.getElementById("myChart").style.borderRadius = '10px';
            document.getElementById("myChart").style.padding = '30px 20px';


            var ct = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ct, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                    labels: date,
                    datasets: [{
                        label: 'Corona Confirmed cases',
                        backgroundColor: 'rgba(255, 99, 132,0.0)',
                        //backgroundColor: 'rgba(255, 99, 132,0.3)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: cases
                    },{
                        label: 'Corona Recovered cases',
                        backgroundColor: 'rgba(0, 99, 132, 0.0)',
                        borderColor: 'rgb(0, 99, 132)',
                        data: RecoveredCases
                    },{
                        label: 'Corona Death cases',
                        backgroundColor: 'rgba(255, 200, 132,0.0)',
                        borderColor: 'rgb(255, 200, 132)',
                        data: deathCases
                    }]
                },

                // Configuration options go here
                options: {}
            });

            
            
            let deathCasesPie = deathCases[ deathCases.length - 1];
            let activeCasesPie = activeCases[ activeCases.length - 1];
            let RecoveredCasesPie = RecoveredCases[ RecoveredCases.length - 1];

            console.log(activeCasesPie);
            console.log(deathCasesPie);
            console.log(RecoveredCasesPie);

            document.getElementById("myBar").style.boxShadow = '5px 5px 10px white';
            document.getElementById("myBar").style.boxShadow = '-30px -5px 30px #ffffff10, 1px 1px 30px #00000066';
            document.getElementById("myBar").style.borderRadius = '10px';
            document.getElementById("myBar").style.padding = '30px 20px';


            var ctp = document.getElementById('myBar').getContext('2d');
            var chartPie = new Chart(ctp, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels :['Active', 'Recovered', 'Death'],
                    datasets :[{
                        label:'Bar Graph',
                        data : [ activeCasesPie, RecoveredCasesPie, deathCasesPie],
                        backgroundColor: [
                            'rgba(255,0,0,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(0,0,255,0.5)'
                        ],
                        borderColor:[
                            '#2ecc71','#2ecc71','#2ecc71'
                        ],
                        borderWidth: 1
    
                    }
                    ]},

                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                
                }
            });




        })
        .catch(error => console.log('error', error));
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  
  let cName = ["World Cases", "United Kingdom","Germany","China","India","Taiwan","Japan"];

  
  fetch("https://api.covid19api.com/countries", requestOptions)
    .then(response => response.json())
    .then(result => {
            //console.log(result);
            let countryName = [];
            
            result.forEach( (item, index, array) =>{
                countryName.push( {country : item.Country, Slug : item.Slug} );
            });
            
            let i = 0;
            for(i = 0; i < countryName.length; i++){
                let elementOption = document.createElement("option");
                let textElement = document.createTextNode(countryName[i].country);

                elementOption.append(textElement);

                let selectElement = document.querySelector('select');
                selectElement.appendChild(elementOption);
            }

            console.log( countryName );

            let selectElement = document.querySelector("select").addEventListener("change", ()=>{
                    let valueInSelector = document.querySelector("select").value;
                    
                    let findIt = countryName.map( e => { return e.country } ).indexOf(valueInSelector);
                            console.log( findIt );
                            let temp = countryName[findIt];
                    console.log(temp.Slug);
                    fetchData(fetchLink, temp.Slug );


            })
        })
    .catch(error => console.log('error', error));





   /// fetchData(fetchLink, "Germany");
/*
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
*/
