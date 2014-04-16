if (Posts.find().count()===0){
	Posts.insert({
		title: 'Am I jumping in at the wrong time',
		author: 'Edaan Getzel',
		url: 'http://edaangetzel.wordpress.com/2014/04/02/am-i-jumping-in-at-the-wrong-time/'
	});
	Posts.insert({
		title: 'What is Productivity?',
		author: 'Edaan Getzel',
		url: 'http://edaangetzel.wordpress.com/2014/04/04/what-is-productivity/'
	});
	Posts.insert({
		title: 'Welcome to Meteor... and other ramblings',
		author: 'Edaan Getzel',
		url: 'http://edaangetzel.wordpress.com/2014/04/16/welcome-to-meteor-and-other-ramblings/'
	});
}