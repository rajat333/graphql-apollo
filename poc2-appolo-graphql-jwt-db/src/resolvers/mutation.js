const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const gravatar = require('../utils/gravatar');
const { getUser } = require('../utils/getUser');

const addBook = async (parent, args, { models, req }) => {
	const user = await getUser(req.headers.authorization);
	return await models.Book.create({
		title: args.title,
		description: args.description,
		author: user.id
	});
};

const updateBook = async (parent, { id, title, author }, { models }) => {
	return await models.Book.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				title,
				author
			}
		},
		{ new: true }
	);
};

const deleteBook = async (parent, { id }, { models }) => {
	try {
		await models.Book.findOneAndRemove({ _id: id });
		return true;
	} catch (err) {
		return false;
	}
};

const signUp = async (parent, { username, email, password }, { models }) => {
	// normalize email address
	email = email.trim().toLowerCase();

    // hash the password
	const hashed = await bcrypt.hash(password, 10);

    const avatar = gravatar(email);
	try {
		const user = await models.User.create({
			username,
			email,
			avatar,
			password: hashed
		});
		return 'Success';
	} catch (err) {
		console.log(err);
		throw new Error('Error creating account');
	}
};

const signIn = async (parent, { username, email, password }, { models }) => {
	if (email) {
		email = email.trim().toLowerCase();
	}

    const user = await models.User.findOne({
		$or: [ { email }, { username } ]
	});

	if (!user) {
		throw new AuthenticationError('Error signing in');
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		throw new AuthenticationError('Error signing in');
	}

	return  jwt.sign(
        { "https://awesomeapi.com/graphql": { email, username } },
        "f1BtnWgD3VKY",
        { algorithm: "HS256", subject: id, expiresIn: "1d" }
      );
};

module.exports = {
	addBook,
	updateBook,
	deleteBook,
	signUp,
	signIn
};
