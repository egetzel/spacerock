//checks that userId specified own the doc
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}