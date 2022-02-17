const author = async (bookDetails, args, { models }) => {
	const user = await models.User.findById(bookDetails.userId);

	return {
		id: user._id,
		username: user.username,
		email: user.email,
		avatar: user.avatar
	};
};

module.exports = {
	author
};
