let logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((response) => {
    console.log(response);
    if(response.success) {
        location.reload();
    } else {
        throw new Error(response.error);
    }
})
ApiConnector.current((response) => {
    console.log(response);
    if (response.success){
        ProfileWidget.showProfile(response.data);
    }
})
const ratesBoard = new RatesBoard();

async function getExchangeRates(){
    let exchangeRates = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    let result = await exchangeRates.text();
    
    if(exchangeRates.status === 200) {
        console.log(result);
        ratesBoard.clearTable();
        ratesBoard.fillTable(result);
    }
}
getExchangeRates();


  
  
       
    

    
    






