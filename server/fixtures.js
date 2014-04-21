if (Posts.find().count()===0){
	var now = new Date().getTime();
	
	var edaanId = Meteor.users.insert({
		profile: {name: 'Edaan Getzel'}
	});
	var edaan = Meteor.users.findOne(edaanId);
	
	var leorId = Meteor.users.insert({
		profile: {name: 'Leor Getzel'}
	});
	var leor = Meteor.users.findOne(leorId);
	
	var adeevId = Meteor.users.insert({
		profile: {name: 'Adeev Getzel'}
	});
	var adeev = Meteor.users.findOne(adeevId);
	
	

	var whenToJump = Posts.insert({
		title: 'Am I jumping in at the wrong time',
		userId: edaan._id,
		author: edaan.profile.name,
		url: 'http://edaangetzel.wordpress.com/2014/04/02/am-i-jumping-in-at-the-wrong-time/',
		submitted: now - 7 *3600*1000,
		commentsCount: 2
	});

	Comments.insert({
		postId: whenToJump,
		userId: edaan._id,
		author: edaan.profile.name,
		submitted: now - 5 * 3600* 1000,
		body: "I would like to add that I am quite certain that I am correct.",
	});

	Comments.insert({
		postId: whenToJump,
		userId: leor._id,
		author: leor.profile.name,
		submitted: now - 3 *3600*1000,
		body: "Spectacularly written... A masterpiece"
	});
	Posts.insert({
		title: 'What is Productivity?',
		userId: edaan._id,
		author: edaan.profile.name,
		url: 'http://edaangetzel.wordpress.com/2014/04/04/what-is-productivity/',
		submitted: now - 10 *3600*1000,
		commentsCount: 0,
		upvoters: [], votes:0
	});
	Posts.insert({
		title: 'Welcome to Meteor... and other ramblings',
		userId: edaan._id,
		author: edaan.profile.name,
		url: 'http://edaangetzel.wordpress.com/2014/04/16/welcome-to-meteor-and-other-ramblings/',
		submitted: now -12 *3600*1000,
		commentsCount: 0,
		upvoters: [], votes: 0
	});

	// for (var i=0; i<10; i++) {
	// 	Posts.insert({
	// 		title: 'test post '+i,
	// 		author: edaan.profile.name,
	// 		userId: edaan._id,
	// 		url: 'http://google.com/?q=test-'+i,
	// 		submitted: now-i*3600*1000,
	// 		commentsCount: 0,
	// 		upvoters: [], votes: 0
	// 	});
	// }
}