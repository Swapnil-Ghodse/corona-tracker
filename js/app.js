var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
let dataResult;
function assignData(data){
    return data;
}

  fetch("https://covid19.mathdro.id/api/daily/", requestOptions)
    .then(response => response.json())
    .then(result => {
        
        dataResult = assignData(result);
        
        let dateResult = [];
        let confirmCase = [];
        let confirmDeath = [];
        let recoverCase=[];
        dataResult.forEach(( item, index, array) => {
            dateResult.push( item.reportDate);
            confirmCase.push( item.totalConfirmed )
            confirmDeath.push( item.deaths.total);
            recoverCase.push( item.recovered.total);
        
        });
       
        var ctx = document.getElementById('mychart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateResult,
                datasets: [{
                    label: 'World Corona Cases',
                    data: confirmCase,
                    backgroundColor: [
                        'rgba(255,0,0,0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1},
                    {
                        label: 'World Death Cases',
                        data: confirmDeath,
                        backgroundColor: [
                            'rgba(0,255,0,0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 0, 0, 1)'
                        ],
                        borderWidth: 1
                }
            ]
            },
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

///////////////////////////////////////////////////////////////////////////////////////

  
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result =>{ 
        console.log(result);
        console.log(result.Global);

        let ActiveConfirm = result.Global.TotalConfirmed;
        let DeathConfirm = result.Global.TotalDeaths;
        let RecoveredConfirm = result.Global.TotalRecovered;
        console.log( ActiveConfirm );
        console.log( DeathConfirm );
        console.log( RecoveredConfirm );

        ActiveConfirm = ActiveConfirm - DeathConfirm - RecoveredConfirm;
        console.log( ActiveConfirm);

        var ctp = document.getElementById("mypie").getContext('2d');
        var mypie = new Chart( ctp,{
            type:'doughnut',
            data:{
                labels :['Active', 'Recovered', 'Death'],
                datasets :[{
                    label:'Life of Pie',
                    data : [ ActiveConfirm, RecoveredConfirm, DeathConfirm],
                    backgroundColor: [
                        'rgba(255,0,0,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(0,0,255,0.5)'
                    ],
                    borderColor:[
                        '#2ecc71'
                    ],
                    borderWidth: 1

                }
                ]},

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

     })
    .catch(error => console.log('error', error));