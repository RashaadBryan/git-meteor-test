// shared code
Websites = new Mongo.Collection("websites");

// client only code
if (Meteor.isClient){
    // event listeners on the addSiteForm template
    Template.addSiteForm.events({
        // this runs when they click the add button... you need to compete it
     'click .js-add-site':function(event){
         var url = $('#url_input').val();// get the form value using jquery...
         var username = "";
         var isLoggedIn = Meteor.user();
         if (isLoggedIn){
            var username = Meteor.user().username;
         }
         else {
            var username = "anon";  
         }

         var site = {"url":url,
                     "createdOn":new Date(),
                     "createdBy":username};
         Websites.insert(site);
         return false;
     }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    // this helper gets the data from the collection for the site-list Template
    Template.siteList.helpers({
        'all_websites':function(){
            return Websites.find({});
        }
    });

}
