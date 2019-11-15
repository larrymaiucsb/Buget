
$(function() {
      chrome.storage.sync.get('limit', function(buget){
        $('#limit').val(buget.limit);
      })
      $('#newLimit').click(function(){
           var newL = $('#limit').val();
           if(newL)
           {
             chrome.storage.sync.set({'limit' : newL});
           }
      });
      $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total' : 0});
      });
});


