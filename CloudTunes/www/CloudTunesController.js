/**
 * Replacing CloudTunesController Apex functionality with JS/ForceTK
 **/

function CloudTunesController() {
    
}

CloudTunesController.prototype = {
    queryAlbums: function(callback,escape) {
    	//return [SELECT Id, Name, Price__c FROM Album__c ORDER BY Name LIMIT 20];
    	forcetkClient.query("SELECT Id, Name, Price__c FROM Album__c ORDER BY Name LIMIT 20", callback, onErrorSfdc); 
    },
    queryTracks: function(albumId,callback,escape) {
    	//return [SELECT Id, Name, Price__c, Album__c, Album__r.Name FROM Track__c WHERE Album__c = :albumId ORDER BY CREATEDDATE LIMIT 200];
    	forcetkClient.query("SELECT Id, Name, Price__c, Album__c, Album__r.Name FROM Track__c WHERE Album__c = '"+albumId+"'' ORDER BY CREATEDDATE LIMIT 200", callback, onErrorSfdc); 	
    }
};

