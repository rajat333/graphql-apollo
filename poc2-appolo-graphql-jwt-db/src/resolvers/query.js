const { getUser } = require('../utils/getUser');

const hello = () => 'Hello Rajat!';

const books = async (parent, args, { models }) => {
	return await models.Book.find();
};

const book = async (parent, args, { req, models }) => {
    try {
        // const userObj = await getUser(req.headers.authorization);

        const book =  await models.Book.findById(args.id);

        console.log('book is ', book);
        if (! book ) {

            return {
                __typename: 'BookNotFoundError',
                message: `The Book with the id ${args.id} does not exist.`,
              };
        }

        return {
            id: book._id,
            title: book.title,
            userId: book.author
        }
        
        // return {
        //         // __typename: 'Book',
        //         ...book,
        // };
    } catch( e ) {
        return {};
    }
};

module.exports = {
	hello,
	books,
	book,
};
