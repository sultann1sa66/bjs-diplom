
let logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((response) => {
    if(response.success) {
        location.reload();
    }
})
ApiConnector.current((response) => {
    if (response.success){
        ProfileWidget.showProfile(response.data);
    }
})
const ratesBoard = new RatesBoard();

    
 
function getExchangeRates() {
    ApiConnector.getStocks((response) => {
    if(response.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
 });
}
getExchangeRates();
setInterval(() => getExchangeRates(), 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error);
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error);
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error);
    })
}


let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    favoritesWidget.setMessage(response.success, response.error);
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response)=>{
        console.log(response);
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, );
        }
        favoritesWidget.setMessage(response.success, response.error);
    })
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response)=>{
        
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success,);
        }
        favoritesWidget.setMessage(response.success, response.error);
    })
}
  
  
       
    

    
    






