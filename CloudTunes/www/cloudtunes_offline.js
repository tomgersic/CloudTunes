var currentTracks = new Array();
var currentAlbums = new Array();

var $j = jQuery.noConflict(); 

/*$j(function() { 
    console.log('Adding deviceready event listener');
	// Check if we are executing within container vs web browser and then set the event accordingly.
	document.addEventListener("deviceready", init,false);

    console.log('Using API Version: '+apiVersion);
        
});*/

function checkCacheAndPrepareSession() {
    if (SFHybridApp.deviceIsOnline() && window.applicationCache) {
        switch (window.applicationCache.status) {
            case window.applicationCache.CHECKING:
            case window.applicationCache.DOWNLOADING:
                window.applicationCache.addEventListener('updateready', init, false);
                window.applicationCache.addEventListener('cached', init, false);
                window.applicationCache.addEventListener('error', init, false);
                window.applicationCache.addEventListener('noupdate', init, false);
				throw new Error('Abort the further javascript execution until cache refresh.');
                break;
            case window.applicationCache.UPDATEREADY:
                location.reload();
                break;
        }
    }
}

function init() {
    console.log('---cloudtunes_offline.init');

    $j.mobile.showPageLoadingMsg();

	checkCacheAndPrepareSession();
	resetOfflineStore();
	
    if(window.location.href.indexOf('#') > 0) {
        window.location.href = window.location.href.split("#")[0];
    }
    
    getAlbums(function(){
        $j.mobile.hidePageLoadingMsg();
    });
}

function getAlbums(callback) {
    console.log("get albums");
    $j('#albumlist').empty();
    if (SFHybridApp.deviceIsOnline()) {
        cloudtunesController.queryAlbums(function(response, e) { 
            showAlbums(response.records, callback); 
			addOfflineAlbums(response.records);
        }, {escape:true}); 
    } else {
        console.log("We are offline. Fetching from the smartstore.");
        var onQuerySuccess = function(records) {
            showAlbums(records, callback);
        }
        fetchOfflineAlbums(onQuerySuccess);
      
    }
}

function showAlbums(records, callback) {
    console.log("showing albums");

    currentAlbums.length = 0;
   
    for(var i = 0; i < records.length; i++) { currentAlbums[records[i].Id] = records[i]; }

    console.log("albums records length: "+currentAlbums.length)

    $j.each(records,
        function() {
        $j('<li></li>')
        .attr('id',this.Id)
        .hide()
        .append('<h2>' + this.Name + '</h2>')
        .click(function(e) {
            e.preventDefault();
            $j.mobile.showPageLoadingMsg();
            $j('#AlbumName').html(currentAlbums[this.id].Name);
            $j('#AlbumPrice').html('$'+currentAlbums[this.id].Price__c);
            if($j('#AlbumPrice').html().indexOf(".") > 0 && $j('#AlbumPrice').html().split(".")[1].length == 1) {
                                $j('#AlbumPrice').html($j('#AlbumPrice').html()+"0"); //add trailing zero
                            }
            $j('#AlbumId').val(currentAlbums[this.id].Id);
            var onTracksLoaded = function() {
                $j.mobile.hidePageLoadingMsg();
                $j.mobile.changePage('#detailpage', {changeHash: true});
            }
            getTracks(currentAlbums[this.id].Id, onTracksLoaded);
            })
        .appendTo('#albumlist')
        .show();
        });
    
    $j('#albumlist').listview('refresh');
    if(callback != null) { callback(); }
}


function getTracks(albumid, callback) {
    $j('#tracklist').empty();
    if (SFHybridApp.deviceIsOnline()) {
        cloudtunesController.queryTracks(albumid,
            function(response, e) { 
                showTracks(response.records,callback);
              addOfflineTracks(response.records);
            }, {escape:true} );
    } else {

        console.log("We are offline. Fetching from the smartstore.");
        var onQuerySuccess = function(records) {
            showTracks(records, callback);
        }
        fetchOfflineTracks(albumid, onQuerySuccess);

    }
    
    return true;
}

function showTracks(records, callback) {
    currentTracks.length = 0;
    for(var i = 0; i < records.length; i++) { currentTracks[records[i].Id] = records[i]; }

    $j.each(records, function() {
        $j('<li></li>')
        .hide()
        .attr('id',this.Id)
        .append(this.Name)
        .appendTo('#tracklist')
        .click(function(e) {
            e.preventDefault();
            $j.mobile.showPageLoadingMsg();
            $j('#TrackName').html(currentTracks[this.id].Name);
            $j('#TrackAlbum').html(currentTracks[this.id].Album__r.Name);
            $j('#TrackPrice').html('$'+currentTracks[this.id].Price__c);
            if($j('#TrackPrice').html().indexOf(".") > 0 && $j('#TrackPrice').html().split(".")[1].length == 1) {
                                $j('#TrackPrice').html($j('#TrackPrice').html()+"0"); //add trailing zero
                            }
            var onLoadComplete = function() {
                $j.mobile.hidePageLoadingMsg();
                $j.mobile.changePage('#trackpage', {changeHash: true});
            }
            setTimeout(onLoadComplete, 10);
        })
        .show();
    });
    
    console.log('Done ');
    if(callback != null) { console.log('Callback '); callback(); $j('#tracklist').listview('refresh'); }
}