/**
 * Replacing CloudTunesController Apex functionality with JS/ForceTK
 **/

function CloudtunesController() {
    
}

CloudtunesController.prototype.queryAlbums = function(callback,escape) {
		console.log('CloudTunesController.prototype.queryAlbums');
    	//return [SELECT Id, Name, Price__c FROM Album__c ORDER BY Name LIMIT 20];
    	window.forcetkClient.query("SELECT Id, Name, Price__c FROM Album__c ORDER BY Name LIMIT 20", callback, onErrorSfdc); 
};

CloudtunesController.prototype.queryTracks = function(albumId,callback,escape) {
		console.log('CloudTunesController.prototype.queryTracks');
    	//return [SELECT Id, Name, Price__c, Album__c, Album__r.Name FROM Track__c WHERE Album__c = :albumId ORDER BY CREATEDDATE LIMIT 200];
    	window.forcetkClient.query("SELECT Id, Name, Price__c, Album__c, Album__r.Name FROM Track__c WHERE Album__c = '"+albumId+"' ORDER BY CREATEDDATE LIMIT 200", callback, onErrorSfdc); 	
};

var cloudtunesController = new CloudtunesController();