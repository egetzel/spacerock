//specifies the template
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('posts');}
});

//specifies the route paths
// if {path:''} not specified, default url would be postsList
Router.map(function(){
	this.route('postsList', {path:'/'});
});