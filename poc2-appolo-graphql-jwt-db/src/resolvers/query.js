const hello = () => 'Hello Rajat!';

const books = async (parent, args, { models }) => {
	return await models.Book.find();
};

const book = async (parent, args, { req, models }) => {
    try {
        const book =  await models.Book.findById(args.id);

        if (! book ) {

            return {
                __typename: 'BookNotFoundError',
                message: `The Book with the id ${args.id} does not exist.`,
              };
        }
   
        return {
                __typename: 'Book',
                id: book._id,
                title: book.title,
                userId: book.author
        };
    } catch( e ) {
        return {
            __typename: 'Book',
            message: 'Something went wrong'
        };
    }
};

module.exports = {
	hello,
	books,
	book,
};
