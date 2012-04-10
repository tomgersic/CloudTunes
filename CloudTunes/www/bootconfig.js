     
     
//-----------------------------------------------------------------
// Replace the values below with your own app configuration values.
//-----------------------------------------------------------------

// When debugMode is true, logToConsole() messages will be written to a
// "debug console" section of the page.
var debugMode = true;

// The client ID value specified for your remote access object that defines
// your application in Salesforce.
var remoteAccessConsumerKey = "3MVG9rFJvQRVOvk5eFQEwN9RO2aYtZg1lCMZuesA7mLAno.g_Kj4z_As_oAPc4gOYhpQkHoJ8AGnIOEHBwEzj";

// The redirect URI value specified for your remote access object that defines
// your application in Salesforce.
var oauthRedirectURI = "testsfdc:///mobilesdk/detect/oauth/done";

// The authorization/access scope(s) you wish to define for your application.
var oauthScopes = ["visualforce","api"];

// The start data associated with the application.  Use SFHybridApp.LocalAppStartData for a "local"
// PhoneGap-based application, and SFHybridApp.RemoteAppStartData for a Visualforce-based
// application.  The default representations are below, or you can look at the data
// classes in SFHybridApp.js to see how you can further customize your options.
//var startData = new SFHybridApp.LocalAppStartData();  // Used for local REST-based "index.html" PhoneGap apps.
var startData = new SFHybridApp.RemoteAppStartData("/apex/cloudtunes?context=container"); // Used for Visualforce-based apps.

// Whether the container app should automatically refresh our oauth session on app foreground:
// generally a good idea.
var autoRefreshOnForeground = true;

//-----------------------------------------------------------------
// End configuration block
//-----------------------------------------------------------------
        
            

