var cmi = {
    "id": "spendMones",
    "title": "SpendMones",
    "contexts": ["selection"]
};
chrome.contextMenus.create(cmi);
chrome.contextMenus.onClicked.addListener(function(clickMone){
    if (clickMone.menuItemId == 'spendMones' && clickMone.selectionText) {
        if (isInt(clickMone.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(buget) {
                var newT = 0;
                if(buget.total) {
                    newT += parseInt(buget.total);
                }
                newT += parseInt(clickMone.selectionText);
                chrome.storage.sync.set({'total': newT}, function(){
                    if(newT >= buget.limit) {
                        var notifRich = {
                            type: 'basic',
                            iconUrl: 'images/Cartie_money_icon.png',
                            title: 'Uh oh!',
                            message: 'Woah there, partner. You spent too much dough!'
                          };
                          chrome.notifications.create('reachNotif', notifRich);
                          chrome.notifications.clear('reachNotif');
                    }
                });

            });
        }
    }
});
chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});
function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}