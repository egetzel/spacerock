//specifies the template
Router.configure({
	layoutTemplate: 'layout',
	//template that loads while waiting for data
	loadingTemplate: 'loading',
	// waitOn ensures that Posts subscription is gathered before sending user through
	waitOn: function() {return Meteor.subscribe('posts');}
});

//specifies the route paths
// if {path:''} not specified, default url would be postsList
Router.map(function(){
	this.route('postsList', {path:'/'});
	this.route('postPage', {path: '/posts/:_id'});
});

Router.onBeforeAction('loading');