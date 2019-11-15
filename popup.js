
$(function(){
  chrome.storage.sync.get(['total', 'limit'], function(buget){
      $('#total').text(buget.total);
      $('#limit').text(buget.limit);
  });
  $('#spendMones').click(function(){
    
    chrome.storage.sync.get(['total', 'limit','myChart', 'ft'], function(buget){
      
      var newT = 0;
      if(buget.total)
        newT += parseInt(buget.total);
      var amt = $('#amount').val();
      var radioValue = $("input[name='spend']:checked").val();
      updateData(radioValue, amt);
      if (amt)
        newT += parseInt(amt);
      chrome.storage.sync.set({'total' : newT}, function(){
        if (amt && newT >= buget.limit) {
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
      $('#total').text(newT);
      $('#amount').val('');
    });
  });
});

/*
window.onload = function(){
  document.getElementById('value-in').onclick = function(){
    var value = document.getElementById('value-out').value;
    chrome.storage.sync.set({'myLine': value}, function(){
    alert(Number(value));
  });

 document.getElementById('value-sup').onclick= function(){
    chrome.storage.sync.get('myLine', function(data){
      alert(Number(data.myLine));
    });
  }
    
};
}
*/